import { customMsg } from "./config";

export const greeting = (): string => {
  return `Hello from the helper module and ${customMsg}`
};