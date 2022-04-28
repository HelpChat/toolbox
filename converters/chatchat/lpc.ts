import Converter from "../converter";
import {LPCConfig} from "../types/lpc";
import {ChatChatFormat, ChatChatFormatsConfig, ChatChatSettingsConfig,} from "../types/chatchat";
import MiniMessage from "../minimessage";

const schema = require("../types/lpc.json");

const ChatChatLPCConverter = new Converter<LPCConfig,
    { format: ChatChatFormatsConfig, settings: ChatChatSettingsConfig }>({
    Convert(lpcConfig) {
        const chatchatFormatsConfig: ChatChatFormatsConfig = {
            "default-format": "default",
            formats: {},
        };
        const chatchatSettingsConfig: ChatChatSettingsConfig = {
            "sender-format": {
                parts: [],
            },
            "recipient-format": {
                parts: [],
            },
            "social-spy-format": {
                parts: [],
            },
        };

        if (lpcConfig["chat-format"]) {
            const format = lpcConfig["chat-format"];
            const ccFormat: ChatChatFormat = {
                priority: 1,
                parts: [],
            };
            let parsed = MiniMessage(format);
            ccFormat.parts.push(Placeholders(parsed));
            chatchatFormatsConfig.formats["default"] = ccFormat;
        }

        let formatCount = 1;

        if (lpcConfig["group-formats"]) {
            const formats = lpcConfig["group-formats"];
            Object.keys(formats).forEach((name) => {
                const ecFormat = formats[name];
                const ccFormat: ChatChatFormat = {
                    priority: formatCount,
                    parts: [],
                };
                let parsed = MiniMessage(ecFormat);
                ccFormat.parts.push(Placeholders(parsed));
                chatchatFormatsConfig.formats[name] = ccFormat;
                formatCount++;
            })
        }

        return {
            format: chatchatFormatsConfig,
            settings: chatchatSettingsConfig,
        };
    },
    inputSchema: schema,
});

function Placeholders(input: string): string {
    const replacements: Record<string, string> = {
        "{message}": "<message>",
        "{name}": "%player_name%",
        "{displayname}": "%player_display_name%",
        "{prefix}": "%vault_prefix%",
        "{suffix}": "%vault_suffix%",
        "{GROUP}": "%vault_groupprefix%",
        "{world}": "%player_world_name%",
    };

    let out = input;

    Object.keys(replacements).forEach((key) => {
        out = out.replace(new RegExp(key, "ig"), replacements[key]);
    });

    return out;
}

export default ChatChatLPCConverter;
