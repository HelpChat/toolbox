// @ToolBox - EssentialsChatConfig

export interface EssentialsChatConfig {
    chat: {
        format?: string
        "group-formats"?: {
            [key: string]: string
        }
    }
}

export interface EssentialsChatTypes {
    config: EssentialsChatConfig
    language: {
        msgFormat: string
    }
}
