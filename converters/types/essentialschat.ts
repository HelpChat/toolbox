// @ToolBox - EssentialsChatConfig

export interface EssentialsChatConfig {
    format?: string
    "group-formats"?: {
        [key: string]: string
    }
}

export interface EssentialsChatTypes {
    config: EssentialsChatConfig
    language: {
        msgFormat: string
    }
}
