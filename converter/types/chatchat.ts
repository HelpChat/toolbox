export interface ChatChatFormatsConfig {
    "default-format": string
    formats: {
        [key: string]: {
            priority: number
            format: string[]
        }
    }
}
