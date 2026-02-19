declare module '*.svg' {
  export const ReactComponent: any;
  export default ReactComponent;
}

declare module '*.png' {
  const filePath: string;
  export default filePath;
}

declare interface Window {
  twttr: any;
}
