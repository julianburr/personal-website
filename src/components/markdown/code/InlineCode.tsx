type Props = {
  code: string;
};

export function InlineCode({ code }: Props) {
  return (
    <pre className="bg-[currentColor]/4 inline-block px-[.2rem] font-mono text-[.9em]">
      {code}
    </pre>
  );
}
