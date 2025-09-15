interface Window {
  invokeNative: (native: string, arg: string) => void;
  GetParentResourceName: () => string;
  nuiHandoverData?: {
    [key: string]: any;
  };
}
