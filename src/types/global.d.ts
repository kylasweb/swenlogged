// Global type declarations for Puter.js
declare global {
  interface Window {
    puter: {
      ai: {
        chat: (prompt: string, testMode?: boolean, options?: any) => Promise<any>;
      };
    };
  }
}

export {};