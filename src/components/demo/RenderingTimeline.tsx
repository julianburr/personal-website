/* eslint-disable max-lines */
'use client';

import { ArrowClockwiseIcon, PauseIcon, PlayIcon } from '@phosphor-icons/react';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

import { Tooltip } from '@/components/tooltip';

const STEP_DURATION = 1200;

const configs = {
  html: {
    steps: [
      {
        key: 'request',
        label: 'Request page',
        renderState: 'empty',
      },
      {
        key: 'render-static',
        label: 'Render static response',
        renderState: 'idle',
      },
    ],
  },
  jquery: {
    steps: [
      {
        key: 'request',
        label: 'Request page',
        renderState: 'empty',
      },
      {
        key: 'render-static',
        label: 'Render static response',
        renderState: 'idle',
      },
      {
        key: 'partial-hydrate',
        label: 'Execute Javascript',
        renderState: 'partially-hydrated',
      },
    ],
  },
  spa: {
    steps: [
      {
        key: 'request',
        label: 'Request page',
        renderState: 'empty',
      },
      {
        key: 'render-static',
        label: 'Request page',
        renderState: 'empty',
      },
      {
        key: 'execute-javascript',
        label: 'Execute Javascript',
        renderState: 'fully-hydrated',
      },
    ],
  },
  ssr: {
    steps: [
      {
        key: 'request',
        label: 'Request page',
        renderState: 'empty',
      },
      {
        key: 'render-static',
        label: 'Render static',
        renderState: 'idle',
      },
      {
        key: 'execute-javascript',
        label: 'Execute Javascript',
        renderState: 'fully-hydrated',
      },
    ],
  },
  serverComponents: {
    steps: [
      {
        key: 'request',
        label: 'Request page',
        renderState: 'empty',
      },
      {
        key: 'render-static',
        label: 'Render static response',
        renderState: 'idle',
      },
      {
        key: 'execute-javascript',
        label: 'Execute Javascript',
        renderState: 'partially-hydrated',
      },
    ],
  },
} as const;

type Props = {
  configKey?: keyof typeof configs;
};

export function RenderingTimelineDemo({ configKey = 'html' }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [currenTime, setCurrenTime] = useState(0);

  const config = configs[configKey];
  const totalDuration = config.steps.length * STEP_DURATION;

  const [step, setStep] = useState(0);
  const currentStep = config.steps[step];

  const time = useRef(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const updateProgressBars = (currentTime: number) => {
    timelineRef.current
      ?.querySelectorAll<HTMLElement>('[data-progress-step]')
      .forEach(($step, stepIndex) => {
        const stepStart = stepIndex * STEP_DURATION;
        const progress = Math.min(
          1,
          Math.max(0, (currentTime - stepStart) / STEP_DURATION),
        );
        $step.style.width = `${progress * 100}%`;
      });
  };

  const seekTo = (nextTime: number, nextStep: number) => {
    time.current = nextTime;
    setStep(nextStep);
    setCurrenTime(nextTime);
    setIsFinished(false);
    updateProgressBars(nextTime);
  };

  useEffect(() => {
    if (!isPlaying) return;

    if (time.current === 0) {
      setIsFinished(false);
      setStep(0);
      updateProgressBars(0);
    }

    timer.current = setInterval(() => {
      const newTime = time.current + 10;

      if (newTime >= totalDuration) {
        updateProgressBars(totalDuration);
        setStep(config.steps.length - 1);
        setIsFinished(true);
        setIsPlaying(false);
        setCurrenTime(0);
        time.current = 0;
        return;
      }

      time.current = newTime;
      setStep(Math.floor(newTime / STEP_DURATION));
      updateProgressBars(newTime);
    }, 10);

    return () => clearInterval(timer.current!);
  }, [isPlaying, totalDuration, config.steps.length]);

  return (
    <div className="w-full">
      <div className="w-full flex flex-row items-center bg-grey-medium/50">
        {isPlaying ? (
          <button
            className="bg-(--page-color) text-white p-[.8rem] w-[6.4rem] text-center flex flex-row items-center justify-center gap-[.4rem] text-[.9em] cursor-pointer"
            onClick={() => {
              setIsPlaying(false);
              setCurrenTime(time.current);
            }}
          >
            <PauseIcon weight="bold" />
            <span>Pause</span>
          </button>
        ) : (
          <button
            className="bg-(--page-color) text-white p-[.8rem] w-[6.4rem] text-center flex flex-row items-center justify-center gap-[.4rem] text-[.9em] cursor-pointer"
            onClick={() => setIsPlaying(true)}
          >
            {isFinished ? (
              <>
                <ArrowClockwiseIcon weight="bold" />
                <span>Replay</span>
              </>
            ) : (
              <>
                <PlayIcon weight="bold" />
                {currenTime > 0 ? <span>Resume</span> : <span>Start</span>}
              </>
            )}
          </button>
        )}
      </div>

      <div className="w-full p-[2rem] pb-0 relative flex flex-col items-center justify-center gap-[.4rem]">
        <span className="text-grey-dark uppercase text-[.6rem] leading-[1.2]">
          Browser rendering timeline
        </span>

        <div
          ref={timelineRef}
          className="relative w-full flex flex-row justify-between gap-[.2rem]"
        >
          {config.steps.map((item, index) => (
            <div
              key={item.key}
              className="flex flex-1 flex-col items-center justify-center gap-[.2rem]"
            >
              <button
                className="w-full h-[1.2rem] bg-grey-medium/50 flex"
                onClick={() => {
                  seekTo(index * STEP_DURATION + STEP_DURATION / 2, index);
                }}
              >
                <div
                  data-progress-step={index}
                  className="w-0 h-full bg-grey-dark"
                />
              </button>
              <div
                className={classNames(
                  'text-center text-[.6rem] leading-[1.2]',
                  {
                    'text-grey-medium': step < index,
                    'text-black/60': step >= index,
                  },
                )}
              >
                <span>{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full p-[1.2rem] sm:p-[2.8rem] relative flex items-center justify-center">
        <div className="w-full min-h-[24rem] aspect-video border-[.15rem] border-solid border-grey-dark bg-white">
          <div className="flex flex-row gap-[.2rem] w-full p-[.5rem] border-b-[.15rem] border-solid border-grey-dark">
            <div className="flex w-[.8rem] h-[.8rem] rounded-full border-[.15rem] border-solid border-grey-dark" />
            <div className="flex w-[.8rem] h-[.8rem] rounded-full border-[.15rem] border-solid border-grey-dark" />
            <div className="flex w-[.8rem] h-[.8rem] rounded-full border-[.15rem] border-solid border-grey-dark" />
          </div>

          {!currentStep?.renderState ||
          currentStep.renderState === 'empty' ? null : (
            <div
              className={classNames('[&_.element]:bg-grey-medium', {
                '[&_.element]:bg-red-300':
                  currentStep.renderState === 'fully-hydrated',
                '[&_button.element]:bg-red-300 [&_button.element]:hover:bg-red-400':
                  currentStep.renderState === 'partially-hydrated',
              })}
            >
              <div className="element w-full h-[6rem]" />
              <div className="w-full max-w-[30rem] p-[1.2rem] mx-auto">
                <div className="flex flex-row items-center gap-[1.2rem]">
                  <div className="element flex flex-1 h-[8rem]" />
                  <div className="flex flex-1 flex-col gap-[.2rem]">
                    <div className="element flex w-[60%] h-[.8rem]" />
                    <div className="element flex w-full h-[.4rem] mt-[.2rem]" />
                    <div className="element flex w-full h-[.4rem]" />
                    <div className="element flex w-[30%] h-[.4rem]" />
                    {currentStep.renderState === 'idle' ? (
                      <Tooltip content="Javascript has not been injected yet">
                        <button className="element flex w-[25%] h-[.8rem] mt-[.8rem] cursor-not-allowed" />
                      </Tooltip>
                    ) : (
                      <button className="element flex w-[25%] h-[.8rem] mt-[.8rem] cursor-pointer" />
                    )}
                  </div>
                </div>
                <div
                  className={classNames(
                    'flex flex-row items-center gap-[.4rem] mt-[1.2rem] w-full',
                    { 'justify-center': configKey !== 'html' },
                  )}
                >
                  {configKey !== 'html' ? (
                    currentStep.renderState === 'idle' ? (
                      <Tooltip content="Javascript has not been injected yet">
                        <button className="element flex w-[1rem] h-[1rem] shrink-0 rounded-full ml-[.2rem] cursor-not-allowed" />
                      </Tooltip>
                    ) : (
                      <button className="element flex w-[1rem] h-[1rem] shrink-0 rounded-full ml-[.2rem] cursor-pointer" />
                    )
                  ) : null}
                  <div className="element flex flex-1 h-[4rem]" />
                  <div className="element flex flex-1 h-[4rem]" />
                  <div className="element flex flex-1 h-[4rem]" />
                  {configKey !== 'html' ? (
                    currentStep.renderState === 'idle' ? (
                      <Tooltip content="Javascript has not been injected yet">
                        <button className="element flex w-[1rem] h-[1rem] shrink-0 rounded-full ml-[.2rem] cursor-not-allowed" />
                      </Tooltip>
                    ) : (
                      <button className="element flex w-[1rem] h-[1rem] shrink-0 rounded-full ml-[.2rem] cursor-pointer" />
                    )
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
