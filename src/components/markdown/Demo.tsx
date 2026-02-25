import { StochasticGrandientDescentDemo } from '@/components/demo/StochasticGrandientDescent';

const demos = {
  stochasticGradientDescent: StochasticGrandientDescentDemo,
};

type Props = {
  node: any;
};

export function Demo({ node }: Props) {
  console.log('@@demo', node);
  const Demo = demos[node.properties?.id as keyof typeof demos];

  if (!Demo) {
    console.warn(`Demo not found: ${node.properties?.id}`);
    return null;
  }

  return (
    <div className="relative w-full bg-grey-light my-[2.4rem]">
      <Demo />
    </div>
  );
}
