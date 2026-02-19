declare module '*.svg' {
  export const ReactComponent: any;
  export default ReactComponent;
}

declare module '*.png' {
  const fileMeta: {
    src: string;
    width: number;
    height: number;
  };
  export default fileMeta;
}

declare interface Window {
  twttr: any;
}
