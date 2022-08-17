export interface ChatChatFormatsConfig {
    "default-format": string;
    formats: {
        [key: string]: ChatChatFormat;
    };
}

export type ChatChatFormat = {
    priority: number;
} & ChatChatParts;

export interface ChatChatSettingsConfig {
    "sender-format": ChatChatParts;
    "recipient-format": ChatChatParts;
    "social-spy-format": ChatChatParts;
}

export interface ChatChatParts {
    parts: {
        [key: string]: string[];
    };
}
