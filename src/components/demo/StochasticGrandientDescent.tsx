/* eslint-disable max-lines */
'use client';

import {
  ArrowClockwiseIcon,
  CpuIcon,
  PauseIcon,
  PlayIcon,
} from '@phosphor-icons/react';
import * as tf from '@tensorflow/tfjs';
import { useEffect, useRef, useState } from 'react';
import { LineChart, Line } from 'recharts';

import { Tooltip } from '@/components/tooltip';

import '@tensorflow/tfjs-backend-webgpu';

type DataPoint = {
  step: number;
  testError: number;
  trainingError: number;
};

let currentModel: tf.LayersModel | null = null;

export function StochasticGrandientDescentDemo() {
  const [isTraining, setIsTraining] = useState(false);
  const [backend, setBackend] = useState('');
  const [data, setData] = useState<DataPoint[]>([]);

  const isPaused = useRef(false);

  async function initBackend() {
    try {
      await tf.setBackend('webgpu');
      await tf.ready();
    } catch {
      await tf.setBackend('webgl');
      await tf.ready();
    }
  }

  function makeDataset(p: number, trainFrac: number, seed = 0) {
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
    const input = tf.input({ shape: [4], dtype: 'int32' });

    const l2 = tf.regularizers.l2({ l2: 1e-3 });

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
      const pred = logits.argMax(-1).toInt();
      const correct = pred.equal(y).mean();
      const acc = correct.dataSync()[0];
      return 1 - acc;
    });
  }

  async function startTraining() {
    isPaused.current = false;
    setIsTraining(true);

    await initBackend();

    const p = 97;
    const trainFrac = 0.22;
    const steps = 120_000;
    const batchSize = 512;
    const evalEvery = 200;

    const dataset = makeDataset(p, trainFrac, 0);

    const Xtr = tf.tensor2d(dataset.xTrain, [dataset.nTrain, 4], 'int32');
    const ytr = tf.tensor1d(dataset.yTrain, 'int32');
    const Xte = tf.tensor2d(dataset.xTest, [dataset.nTest, 4], 'int32');
    const yte = tf.tensor1d(dataset.yTest, 'int32');

    if (!currentModel) {
      currentModel = buildModel(dataset.vocab, p);
    }

    const model: tf.LayersModel = currentModel;
    const lr = 1e-3;
    const wd = 1.0;
    const opt = tf.train.adam(lr, 0.9, 0.98, 1e-8);
    const startStep = data.at(-1)?.step ?? 1;

    setBackend(tf.getBackend());

    for (let step = startStep; step <= steps; step++) {
      if (isPaused.current) {
        setIsTraining(false);
        break;
      }

      tf.tidy(() => {
        const idx = tf.randomUniform([batchSize], 0, dataset.nTrain, 'int32');
        const xb = tf.gather(Xtr, idx);
        const yb = tf.gather(ytr, idx);

        const { value: loss, grads } = tf.variableGrads(() => {
          const logits = model?.apply(xb, { training: true }) as tf.Tensor2D;

          const ybOneHot = tf.oneHot(yb, p);
          const ce = tf.losses.softmaxCrossEntropy(ybOneHot, logits).mean();

          const reg =
            model.losses.length > 0
              ? tf.addN(model.losses as unknown as tf.Tensor[])
              : tf.scalar(0);
          return ce.add(reg);
        });

        const gradArray = model.trainableWeights.map((w) => ({
          name: w.name,
          tensor: grads[w.name],
        }));
        opt.applyGradients(gradArray);

        tf.tidy(() => {
          for (const w of model.trainableWeights) {
            const currentVal = w.read();
            w.write(currentVal.mul(1 - lr * wd));
          }
        });

        void loss.dataSync()[0];
      });

      if (step % evalEvery === 0) {
        const [trErr, teErr] = await Promise.all([
          evaluateError(currentModel, Xtr, ytr),
          evaluateError(currentModel, Xte, yte),
        ]);
        setData((prev) => [
          ...prev,
          { step, trainingError: trErr, testError: teErr },
        ]);
      }

      if (step % 20 === 0) {
        await tf.nextFrame();
      }
    }

    if (!isPaused.current) {
      Xtr.dispose();
      ytr.dispose();
      Xte.dispose();
      yte.dispose();
      currentModel = null;
    }
  }

  function pauseTraining() {
    setIsTraining(false);
    isPaused.current = true;
  }

  function resetTraining() {
    setIsTraining(false);
    setData([]);
    currentModel?.dispose();
    currentModel = null;
  }

  useEffect(() => {
    return () => {
      // Clean up the model when the component unmounts
      isPaused.current = true;
      resetTraining();
    };
  }, []);

  return (
    <div className="w-full">
      <div className="w-full flex flex-row items-center bg-grey-medium/50">
        {isTraining ? (
          <button
            onClick={pauseTraining}
            className="bg-(--page-color) text-white p-[.8rem] w-[6.4rem] text-center flex flex-row items-center justify-center gap-[.4rem] text-[.9em] cursor-pointer"
          >
            <PauseIcon weight="bold" />
            <span>Pause</span>
          </button>
        ) : (
          <button
            onClick={startTraining}
            className="bg-(--page-color) text-white p-[.8rem] w-[6.4rem] text-center flex flex-row items-center justify-center gap-[.4rem] text-[.9em] cursor-pointer"
          >
            <PlayIcon weight="bold" />
            <span>{data.length > 0 ? 'Resume' : 'Start'}</span>
          </button>
        )}

        {!!data.length && (
          <>
            <button
              onClick={resetTraining}
              className="bg-grey-medium/0 text-black p-[.8rem] w-[6.4rem] text-center flex flex-row items-center justify-center gap-[.4rem] text-[.9em] cursor-pointer hover:bg-grey-medium focus:bg-grey-medium"
            >
              <ArrowClockwiseIcon weight="bold" />
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
        <LineChart
          style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
          responsive
          data={data.length > 2 ? data : []}
        >
          <Line
            type="monotone"
            dataKey="testError"
            stroke="var(--color-red)"
            strokeWidth=".2rem"
            dot={false}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="trainingError"
            stroke="var(--page-color)"
            strokeWidth=".2rem"
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>

        {!!data.length ? (
          <>
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
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-black-subtle text-[.8rem] font-mono text-center">
              Press “start” to begin the model training.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
