// Global type declarations for Puter.js
declare global {
  interface Window {
    puter: {
      ai: {
        chat: (message: string, options?: {
          testMode?: boolean;
          model?: string;
          stream?: boolean;
          temperature?: number;
          maxTokens?: number;
        }) => Promise<{
          message?: {
            content: string | Array<{ type: string; text: string }>;
          };
          content?: string;
          text?: string;
          choices?: Array<{
            message: {
              content: string;
            };
          }>;
        }>;
      };
      auth?: {
        getUser?: () => Promise<unknown>;
        login?: (params: { email: string; password: string }) => Promise<{ token?: string }>;
        useToken?: (token: string) => Promise<void> | void;
        logout?: () => Promise<void>;
        currentSession?: () => Promise<{ token?: string } | null>;
      };
    };
  }
}

// Type declarations for missing packages
declare module "cmdk" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const Command: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const CommandInput: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const CommandList: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const CommandEmpty: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const CommandGroup: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const CommandItem: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const CommandSeparator: any;
}

declare module "vaul" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const Drawer: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const DrawerPortal: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const DrawerOverlay: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const DrawerTrigger: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const DrawerClose: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const DrawerContent: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const DrawerHeader: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const DrawerFooter: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const DrawerTitle: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const DrawerDescription: any;
}

declare module "input-otp" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const InputOTP: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const InputOTPGroup: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const InputOTPSlot: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const InputOTPSeparator: any;
}

declare module "react-resizable-panels" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const Panel: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const PanelGroup: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const PanelResizeHandle: any;
}

export { };