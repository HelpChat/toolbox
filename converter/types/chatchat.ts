export interface ChatChatFormatsConfig {
    "default-format": string
    formats: {
        [key: string]: ChatChatFormat
    }
}

export interface ChatChatFormat {
    priority: number
    parts: string[]
}
