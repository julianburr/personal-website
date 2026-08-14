import { RenderingTimelineDemo } from '@/components/demo/RenderingTimeline';
import { StochasticGrandientDescentDemo } from '@/components/demo/StochasticGrandientDescent';

const demos = {
  stochasticGradientDescent: StochasticGrandientDescentDemo,
  renderingTimeline: RenderingTimelineDemo,
};

type Props = {
  node: any;
};

export function Demo({ node }: Props) {
  const { id, ...props } = node.properties;
  const Demo = demos[id as keyof typeof demos];

  if (!Demo) {
    console.warn(`Demo not found: ${id}`);
    return null;
  }

  return (
    <div className="relative w-full bg-grey-light my-[2.4rem]">
      <Demo {...props} />
    </div>
  );
}
