type Props = {
  w?: string;
  h?: string;
};

export function Spacer({ w = "1px", h = "1px" }: Props) {
  return <div style={{ display: "flex", width: w, height: h }} />;
}
