// @Toolbox - EssentialsChatTypes

export interface EssentialsChatConfig {
  chat: {
    format?: string | null;
    "group-formats"?: {
      [key: string]: string;
    } | null;
  };
}

export interface EssentialsChatTypes {
  essentials: EssentialsChatConfig;
  language: {
    msgFormat?: string;
    socialSpyMsgFormat?: string;
  };
}
