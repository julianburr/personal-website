/* eslint-disable max-lines */
'use client';

import {
  ArrowClockwiseIcon,
  CpuIcon,
  PauseIcon,
  PlayIcon,
} from '@phosphor-icons/react';
import * as tf from '@tensorflow/tfjs';
import { useCallback, useRef, useState } from 'react';
import { LineChart, Line } from 'recharts';

import { Tooltip } from '@/components/tooltip';

import type { Dispatch, SetStateAction } from 'react';

import '@tensorflow/tfjs-backend-webgpu';

type DataPoint = {
  step: number;
  testError: number;
  trainingError: number;
};

let currentModel: tf.LayersModel | null = null;

async function initBackend() {
  // Prefer WebGPU, fall back to WebGL.
  try {
    await tf.setBackend('webgpu');
    await tf.ready();
  } catch {
    await tf.setBackend('webgl');
    await tf.ready();
  }
}

function makeDataset(p: number, trainFrac: number, seed = 0) {
  // Tokenize as [a, '+', b, '='] where '+' and '=' are extra vocab tokens.
  const PLUS = p;
  const EQ = p + 1;
  const vocab = p + 2;

  const N = p * p;
  const xs = new Int32Array(N * 4);
  const ys = new Int32Array(N);

  let k = 0;
  for (let a = 0; a < p; a++) {
    for (let b = 0; b < p; b++) {
      xs[k * 4 + 0] = a;
      xs[k * 4 + 1] = PLUS;
      xs[k * 4 + 2] = b;
      xs[k * 4 + 3] = EQ;
      ys[k] = (a + b) % p;
      k++;
    }
  }

  // Shuffle indices deterministically-ish (simple LCG for stage demo)
  const idx = new Int32Array(N);
  for (let i = 0; i < N; i++) idx[i] = i;
  let s = seed | 0;
  for (let i = N - 1; i > 0; i--) {
    s = (1664525 * s + 1013904223) | 0;
    const j = Math.abs(s) % (i + 1);
    const tmp = idx[i];
    idx[i] = idx[j];
    idx[j] = tmp;
  }

  const nTrain = Math.floor(N * trainFrac);

  const xTrain = new Int32Array(nTrain * 4);
  const yTrain = new Int32Array(nTrain);
  const xTest = new Int32Array((N - nTrain) * 4);
  const yTest = new Int32Array(N - nTrain);

  for (let i = 0; i < N; i++) {
    const row = idx[i];
    const srcX = row * 4;
    if (i < nTrain) {
      const dstX = i * 4;
      xTrain[dstX + 0] = xs[srcX + 0];
      xTrain[dstX + 1] = xs[srcX + 1];
      xTrain[dstX + 2] = xs[srcX + 2];
      xTrain[dstX + 3] = xs[srcX + 3];
      yTrain[i] = ys[row];
    } else {
      const t = i - nTrain;
      const dstX = t * 4;
      xTest[dstX + 0] = xs[srcX + 0];
      xTest[dstX + 1] = xs[srcX + 1];
      xTest[dstX + 2] = xs[srcX + 2];
      xTest[dstX + 3] = xs[srcX + 3];
      yTest[t] = ys[row];
    }
  }

  return {
    vocab,
    PLUS,
    EQ,
    xTrain,
    yTrain,
    xTest,
    yTest,
    nTrain,
    nTest: N - nTrain,
  };
}

function buildModel(vocab: number, p: number) {
  // Note: this is NOT a full transformer (TFJS lacks MultiHeadAttention out of the box).
  // It's embedding + MLP, which still demonstrates generalization clearly.
  const input = tf.input({ shape: [4], dtype: 'int32' });

  const l2 = tf.regularizers.l2({ l2: 1e-3 }); // adds penalty term to loss

  const emb = tf.layers.embedding({
    inputDim: vocab,
    outputDim: 64,
    embeddingsRegularizer: l2,
  });

  const x = emb.apply(input) as tf.SymbolicTensor;
  const flat = tf.layers.flatten().apply(x) as tf.SymbolicTensor;
  const h = tf.layers
    .dense({ units: 256, activation: 'relu', kernelRegularizer: l2 })
    .apply(flat) as tf.SymbolicTensor;
  const out = tf.layers
    .dense({ units: p, kernelRegularizer: l2 })
    .apply(h) as tf.SymbolicTensor;

  return tf.model({ inputs: input, outputs: out });
}

async function evaluateError(
  model: tf.LayersModel,
  X: tf.Tensor2D,
  y: tf.Tensor1D,
): Promise<number> {
  return tf.tidy(() => {
    const logits = model.predict(X) as tf.Tensor2D;
    const pred = logits.argMax(-1).toInt(); // [N]
    const correct = pred.equal(y).mean(); // scalar
    const acc = correct.dataSync()[0];
    return 1 - acc;
  });
}

function resetTraining() {
  if (currentModel) {
    currentModel.dispose();
    currentModel = null;
  }
}

async function trainGrokkingDemo({
  setData,
  setBackend,
  setLoss,
}: {
  setData: Dispatch<SetStateAction<DataPoint[]>>;
  setBackend?: Dispatch<SetStateAction<string>>;
  setLoss?: Dispatch<SetStateAction<number>>;
}) {
  await initBackend();

  const p = 97;
  const trainFrac = 0.22; // lower = memorize first, grokking happens later
  const steps = 120_000; // more steps so the test-error drop occurs later in the run
  const batchSize = 512;
  const evalEvery = 200;

  const data = makeDataset(p, trainFrac, 0);

  const Xtr = tf.tensor2d(data.xTrain, [data.nTrain, 4], 'int32');
  const ytr = tf.tensor1d(data.yTrain, 'int32');
  const Xte = tf.tensor2d(data.xTest, [data.nTest, 4], 'int32');
  const yte = tf.tensor1d(data.yTest, 'int32');

  if (!currentModel) {
    // Reuse existing model or create new one
    currentModel = buildModel(data.vocab, p);
  }

  const model: tf.LayersModel = currentModel;
  const lr = 1e-3;
  const wd = 1.0;
  const opt = tf.train.adam(lr, 0.9, 0.98, 1e-8);

  setBackend?.(tf.getBackend());

  for (let step = 1; step <= steps; step++) {
    console.log('@@training', { step, steps });

    const lossVal = tf.tidy(() => {
      const idx = tf.randomUniform([batchSize], 0, data.nTrain, 'int32');
      const xb = tf.gather(Xtr, idx);
      const yb = tf.gather(ytr, idx);

      const { value: loss, grads } = tf.variableGrads(() => {
        const logits = model?.apply(xb, { training: true }) as tf.Tensor2D;

        // Compute sparse categorical crossentropy manually:
        // Convert sparse labels to one-hot, then use softmaxCrossEntropy
        const ybOneHot = tf.oneHot(yb, p);
        const ce = tf.losses.softmaxCrossEntropy(ybOneHot, logits).mean();

        // Include regularization losses from layers (L2 penalties)
        const reg =
          model.losses.length > 0
            ? tf.addN(model.losses as unknown as tf.Tensor[])
            : tf.scalar(0);
        return ce.add(reg);
      });

      // Convert NamedTensorMap to NamedTensor[] format for applyGradients
      const gradArray = model.trainableWeights.map((w) => ({
        name: w.name,
        tensor: grads[w.name],
      }));
      opt.applyGradients(gradArray);

      // Decoupled weight decay (AdamW-ish):
      //   w <- w * (1 - lr*wd)
      tf.tidy(() => {
        for (const w of model.trainableWeights) {
          const currentVal = w.read();
          w.write(currentVal.mul(1 - lr * wd));
        }
      });

      return loss.dataSync()[0];
    });

    if (step % evalEvery === 0) {
      const [trErr, teErr] = await Promise.all([
        evaluateError(currentModel, Xtr, ytr),
        evaluateError(currentModel, Xte, yte),
      ]);
      setLoss?.(lossVal);
      setData((data) => [
        ...data,
        { step, trainingError: trErr, testError: teErr },
      ]);
    }

    // Keep UI responsive during training (recommended pattern for browser training)
    if (step % 20 === 0) {
      await tf.nextFrame();
    }
  }

  //Dispose tensors when training completed
  console.log('@@disposing tensors');
  Xtr.dispose();
  ytr.dispose();
  Xte.dispose();
  yte.dispose();
  currentModel = null;
}

export function StochasticGrandientDescentDemo() {
  const running = useRef(false);

  const [isTraining, setIsTraining] = useState(false);
  const [backend, setBackend] = useState('');
  const [data, setData] = useState<DataPoint[]>([]);

  const handleStart = useCallback(() => {
    running.current = true;
    setIsTraining(true);
    trainGrokkingDemo({ setData, setBackend });
  }, []);

  const handlePause = useCallback(() => {
    running.current = false;
    setIsTraining(false);
    // TODO
  }, []);

  const handleReset = useCallback(() => {
    running.current = false;
    setIsTraining(false);
    setData([]);
    resetTraining();
  }, []);

  return (
    <div className="w-full">
      <div className="w-full flex flex-row items-center bg-grey-medium/50">
        {isTraining ? (
          <button
            onClick={handlePause}
            className="bg-(--page-color) text-white p-[.8rem] w-[6.4rem] text-center flex flex-row items-center justify-center gap-[.4rem] text-[.9em] cursor-pointer"
          >
            <PauseIcon weight="bold" />
            <span>Pause</span>
          </button>
        ) : (
          <button
            onClick={handleStart}
            className="bg-(--page-color) text-white p-[.8rem] w-[6.4rem] text-center flex flex-row items-center justify-center gap-[.4rem] text-[.9em] cursor-pointer"
          >
            <PlayIcon weight="bold" />
            <span>Start</span>
          </button>
        )}

        {!!data.length && (
          <>
            <button
              onClick={handleReset}
              className="bg-grey-medium/0 text-black p-[.8rem] w-[6.4rem] text-center flex flex-row items-center justify-center gap-[.4rem] text-[.9em] cursor-pointer hover:bg-grey-medium focus:bg-grey-medium"
            >
              <ArrowClockwiseIcon />
              <span>Reset</span>
            </button>
            <span className="flex-1" />

            <span className="flex flex-row items-center gap-[1.2rem] mx-[1.2rem] text-[.8rem] font-mono text-black-subtle">
              <span>{data.length * 200} steps</span>
              {backend && (
                <Tooltip content={`Using "${backend}" backend`}>
                  <CpuIcon weight="bold" />
                </Tooltip>
              )}
            </span>
          </>
        )}
      </div>

      <div className="w-full h-[10rem] p-[1.2rem] relative flex items-center justify-center">
        {data.length > 1 ? (
          <>
            <LineChart
              style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
              responsive
              data={data}
            >
              <Line
                type="monotone"
                dataKey="testError"
                stroke="var(--color-red)"
                strokeWidth=".2rem"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="trainingError"
                stroke="var(--page-color)"
                strokeWidth=".2rem"
                dot={false}
              />
            </LineChart>

            <div className="absolute bottom-[.4rem] left-[.4rem] flex flex-row gap-[.2rem]">
              <span className="flex px-[.4rem] py-[.2rem] bg-(--page-color) text-white text-[.6rem] font-mono">
                Training error:{' '}
                {Math.ceil((data.at(-1)?.trainingError ?? 1) * 100)}%
              </span>
              <span className="flex px-[.4rem] py-[.2rem] bg-red text-white text-[.6rem] font-mono">
                Test error: {Math.ceil((data.at(-1)?.testError ?? 1) * 100)}%
              </span>
            </div>
          </>
        ) : (
          <p className="text-black-subtle text-[.8rem] font-mono text-center">
            Press “start” to begin the model training.
          </p>
        )}
      </div>
    </div>
  );
}
