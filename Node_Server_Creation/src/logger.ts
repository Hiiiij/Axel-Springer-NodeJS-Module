export const logServerMessage = (message: string): void => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
  };