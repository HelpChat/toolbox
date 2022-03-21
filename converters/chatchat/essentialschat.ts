import Converter from "../converter";
import {EssentialsChatConfig} from "../types/essentialschat";
import {ChatChatFormat, ChatChatFormatsConfig, ChatChatSettingsConfig} from "../types/chatchat";
import MiniMessage from "../minimessage";
import Placeholders from "../placeholders";

const schema = require('../types/essentialschat.json')

const ChatChatEssentialsChatConverter = new Converter<EssentialsChatConfig, { format: ChatChatFormatsConfig, settings: ChatChatSettingsConfig }>({
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

        if (essentialschatConfig.format) {
            const format = essentialschatConfig.format;
            const ccFormat: ChatChatFormat = {
                priority: 1,
                parts: []
            }
            let parsed = MiniMessage(format);
            ccFormat.parts.push(Placeholders(parsed));
            chatchatFormatsConfig.formats['default'] = ccFormat;
        }

        let formatCount = 1;

        if (essentialschatConfig["group-formats"]) {
            const formats = essentialschatConfig["group-formats"]
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


        return {
            format: chatchatFormatsConfig,
            settings: chatchatSettingsConfig
        }
    },
    inputSchema: schema,
});

export default ChatChatEssentialsChatConverter;
