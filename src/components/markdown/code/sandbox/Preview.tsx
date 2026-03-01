import {
  SandpackPreview,
  UnstyledOpenInCodeSandboxButton,
  useSandpack,
} from '@codesandbox/sandpack-react';
import { ArrowClockwiseIcon } from '@phosphor-icons/react';
import classNames from 'classnames';
import { useCallback, type Dispatch, type SetStateAction } from 'react';

type Props = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};

export function CodeSandboxPreview({ show, setShow }: Props) {
  const sandpack = useSandpack();

  const handleRefresh = useCallback(() => {
    sandpack.dispatch({ type: 'refresh' });
  }, []);

  return (
    <div
      className={classNames(
        'absolute z-1 top-0 bottom-0 left-[2rem] right-0 transition-all duration-200',
        {
          'translate-x-[calc(100%-.3rem)]': !show,
        },
      )}
    >
      <div className="absolute top-0 bottom-0 left-[.3rem] right-0 bg-[white]">
        <SandpackPreview
          showOpenInCodeSandbox={false}
          showRefreshButton={false}
        />
      </div>

      <div className="absolute bg-(--page-color) left-0 top-0 bottom-0 w-[.3rem]" />
      <button
        onClick={() => setShow((state) => !state)}
        className={classNames(
          'absolute bottom-0 right-[calc(100%-.1rem)] bg-(--page-color) text-white text-[.9rem] p-[.6rem] cursor-pointer font-heading whitespace-nowrap transition-all duration-200',
          {
            'translate-x-full': show,
          },
        )}
      >
        {show ? 'Close preview' : 'Show preview'}
      </button>

      <div className="absolute bottom-0 right-0 flex flex-row gap-[.2rem]">
        <UnstyledOpenInCodeSandboxButton className="bg-grey-light hover:bg-grey-medium focus:bg-grey-medium text-black text-[.9rem] p-[.6rem] cursor-pointer font-heading whitespace-nowrap transition-all duration-200">
          Open in CodeSandbox
        </UnstyledOpenInCodeSandboxButton>
        <button
          onClick={handleRefresh}
          className="bg-grey-light hover:bg-grey-medium focus:bg-grey-medium text-black text-[.9rem] p-[.6rem] cursor-pointer font-heading whitespace-nowrap transition-all duration-200"
        >
          <ArrowClockwiseIcon weight="bold" />
        </button>
      </div>
    </div>
  );
}
