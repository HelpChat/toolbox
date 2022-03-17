export interface DeluxeChatConfig {
    check_updates?: boolean;
    bungeecord?: {
        enabled?: boolean;
        server_name?: string;
        servername?: string; // Seems to exist in certain random configs
        server_prefix?: string;
        join_global?: boolean;
        use_server_whitelist?: boolean;
        server_whitelist?: string[]
    }
    relation_placeholders_enabled?: boolean;
    timestamp_format?: string;
    boolean?: {
        true?: string;
        false?: string;
    }
    ops_use_group_format?: boolean;
    chat_filter?: {
        enabled?: boolean;
        ignore_case?: boolean;
        list?: string[];
    }
    private_message?: {
        enabled?: boolean;
        bungeecord?: boolean;
    }
    private_message_formats?: Record<'to_sender' | 'to_recipient', DeluxeChatPrivateMessageFormat
    > & {
        social_spy?: string
    }
    formats?: {
        [key: string]: DeluxeChatFormat
    }
}

export interface DeluxeChatFormat {
    priority?: number;
    channel: string;
    prefix: string;
    name_color: string;
    name: string;
    suffix: string;
    chat_color: string;
    channel_tooltip?: string[];
    prefix_tooltip?: string[];
    name_tooltip?: string[];
    suffix_tooltip?: string[];
    channel_click_command?: string;
    prefix_click_command?: string;
    name_click_command?: string;
    suffix_click_command?: string;
}

export interface DeluxeChatPrivateMessageFormat {
    format?: string,
    tooltip?: string[],
    click_command?: string
    chat_color?: string
}
