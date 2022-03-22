import Converter from "../converter";
import {EssentialsChatTypes} from "../types/essentialschat";
import {ChatChatFormat, ChatChatFormatsConfig, ChatChatSettingsConfig} from "../types/chatchat";
import MiniMessage from "../minimessage";
import Placeholders from "../placeholders";

const schema = require('../types/essentialschat.json')

const ChatChatEssentialsChatConverter = new Converter<EssentialsChatTypes, { format: ChatChatFormatsConfig, settings: ChatChatSettingsConfig }>({
    Convert(essentialschatConfig) {
        const chatchatFormatsConfig: ChatChatFormatsConfig = {
            "default-format": 'default',
            formats: {}
        }
        const chatchatSettingsConfig: ChatChatSettingsConfig = {
            "sender-format": {
                parts: []
            },
            "recipient-format": {
                parts: []
            },
        }

        if (!essentialschatConfig.config) {
            return {
                error: true,
                message: 'EssentialsChat config is missing'
            }
        }

        if (essentialschatConfig.config.format) {
            const format = essentialschatConfig.config.format;
            const ccFormat: ChatChatFormat = {
                priority: 1,
                parts: []
            }
            let parsed = MiniMessage(format);
            ccFormat.parts.push(Placeholders(parsed));
            chatchatFormatsConfig.formats['default'] = ccFormat;
        }

        let formatCount = 1;

        if (essentialschatConfig.config["group-formats"]) {
            const formats = essentialschatConfig.config["group-formats"]
            Object.keys(formats).forEach(name => {
                const ecFormat = formats[name]
                const ccFormat: ChatChatFormat = {
                    priority: formatCount,
                    parts: []
                }
                let parsed = MiniMessage(ecFormat);
                ccFormat.parts.push(Placeholders(parsed));
                chatchatFormatsConfig.formats[name] = ccFormat;
                formatCount++;
            });
        }

        if (essentialschatConfig.language.msgFormat) {
            chatchatSettingsConfig["sender-format"].parts.push(
                essentialschatConfig.language.msgFormat
            );
        }

        return {
            format: chatchatFormatsConfig,
            settings: chatchatSettingsConfig
        }
    },
    inputSchema: schema,
});

export default ChatChatEssentialsChatConverter;
