import { TextEncoder } from "util";

export const encodeObjectToUint8Array = (data: { [key: string]: any }) => {
  const uint8ArrayData = new TextEncoder().encode(JSON.stringify(data));

  return uint8ArrayData;
};
