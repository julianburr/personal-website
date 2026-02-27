'use client';

import * as Icons from '@phosphor-icons/react';
import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';

import { Tooltip } from '@/components/tooltip';

type Props = {
  className?: string;
  externalUrl?: string;
  talkUrl?: string;
  title?: string;
};

export function PageActions({ title, talkUrl, externalUrl, className }: Props) {
  const [copied, setCopied] = useState(false);

  const shareData = {
    title: `Blog: ${title} — Julian Burr`,
    url: typeof window !== 'undefined' ? window.location.href : undefined,
  };

  const canShare =
    typeof navigator !== 'undefined' ? navigator.canShare(shareData) : false;

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2_000);
  };

  if (!talkUrl && !externalUrl && !canShare) {
    return null;
  }

  return (
    <div
      className={classNames(
        className,
        'flex flex-row items-center gap-[.2rem]',
      )}
    >
      {talkUrl && (
        <Tooltip content="Open related talk page">
          <Link
            href={talkUrl}
            target="_blank"
            className="text-inherit w-[2.4rem] h-[2.4rem] flex items-center justify-center transition-all bg-grey-medium/50 sm:bg-grey-medium/30 shadow-none hover:bg-grey-medium"
          >
            <span className="flex text-[1.4rem]">
              <Icons.MicrophoneStageIcon />
            </span>
          </Link>
        </Tooltip>
      )}
      {canShare ? (
        <Tooltip key="share" content="Share blog post">
          <button
            onClick={() => navigator.share(shareData)}
            className="text-inherit w-[2.4rem] h-[2.4rem] flex items-center justify-center transition-all bg-grey-medium/50 sm:bg-grey-medium/30 shadow-none hover:bg-grey-medium"
          >
            <span className="flex text-[1.4rem]">
              <Icons.ShareIcon />
            </span>
          </button>
        </Tooltip>
      ) : (
        <Tooltip key="share" content="Copy url to share">
          <button
            onClick={handleCopy}
            data-copied={copied}
            className='text-inherit w-[2.4rem] h-[2.4rem] flex items-center justify-center transition-all bg-grey-medium/50 sm:bg-grey-medium/30 shadow-none hover:bg-grey-medium data-[copied="true"]:bg-green'
          >
            <span className="flex text-[1.4rem]">
              {copied ? <Icons.CheckIcon /> : <Icons.ShareIcon />}
            </span>
          </button>
        </Tooltip>
      )}
      {externalUrl && (
        <Tooltip content="Open external blog">
          <Link
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-inherit w-[2.4rem] h-[2.4rem] flex items-center justify-center transition-all bg-grey-medium/50 sm:bg-grey-medium/30 shadow-none hover:bg-grey-medium"
          >
            <span className="flex text-[1.4rem]">
              <Icons.ArrowSquareOutIcon />
            </span>
          </Link>
        </Tooltip>
      )}{' '}
    </div>
  );
}
