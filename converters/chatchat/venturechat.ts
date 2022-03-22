import Converter from '../converter';
import {VentureChatConfig, VentureChatJsonComponent} from "../types/venturechat";
import {ChatChatFormat, ChatChatFormatsConfig, ChatChatSettingsConfig} from "../types/chatchat";
import MiniMessage from "../minimessage";

const schema = require('../types/venturechat.json');

const ChatChatVentureChatConverter = new Converter<VentureChatConfig, { format: ChatChatFormatsConfig, settings: ChatChatSettingsConfig }>({
    Convert(venturechatConfig) {
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

        if (venturechatConfig.jsonformatting) {
            const formats = venturechatConfig.jsonformatting;
            Object.keys(formats).forEach(name => {
                const vcFormat = formats[name];
                const ccFormat: ChatChatFormat = {
                    priority: vcFormat.priority ?? 1,
                    parts: []
                };

                (["venturechat_channel_prefix", "vault_prefix", "player_displayname"]).forEach(key => {
                    [vcFormat.json_attributes.venturechat_channel_prefix, vcFormat.json_attributes.vault_prefix, vcFormat.json_attributes.player_displayname]
                    const part = `%${key}%`;

                    let section: VentureChatJsonComponent;
                    switch (key) {
                        case 'venturechat_channel_prefix':
                            section = vcFormat.json_attributes.venturechat_channel_prefix
                            break;
                        case 'vault_prefix':
                            section = vcFormat.json_attributes.vault_prefix
                            break;
                        default:
                            section = vcFormat.json_attributes.player_displayname
                            break;
                    }

                    let formattedSection = part;
                    switch (section.click_action) {
                        case "suggest_command": {
                            formattedSection = "<click:suggest_command:'" + section.click_text + "'>" + formattedSection + "</click>";
                            break;
                        }
                        case "run_command": {
                            formattedSection = "<click:run_command:'" + section.click_text + "'>" + formattedSection + "</click>";
                            break;
                        }
                        case "open_url": {
                            formattedSection = "<click:open_url:'" + section.click_text + "'>" + formattedSection + "</click>";
                            break;
                        }
                    }
                    let hover = section.hover_text.filter(s => s && s !== "")
                    if (hover && hover.length > 0) {
                        formattedSection = "<hover:show_text:'" + hover.join("<newline>") + "'>" + formattedSection + "</hover>";
                    }

                    if (formattedSection !== "") {
                        ccFormat.parts.push(MiniMessage(formattedSection));
                    }
                })
                ccFormat.parts.push("<message>")
                chatchatFormatsConfig.formats[name] = ccFormat;
            })
        }


        const toFormat = venturechatConfig.tellformatto;
        const fromFormat = venturechatConfig.tellformatfrom;

        let ccPartsFormat: string[] = [];

        // The sender format
        ccPartsFormat.push(MiniMessage(toFormat));
        ccPartsFormat.push("<message>");
        chatchatSettingsConfig["sender-format"].parts = ccPartsFormat;

        // Reset
        ccPartsFormat = [];

        // The recipient format
        ccPartsFormat.push(MiniMessage(fromFormat));
        ccPartsFormat.push("<message>");
        chatchatSettingsConfig["recipient-format"].parts = ccPartsFormat;

        return {
            format: chatchatFormatsConfig,
            settings: chatchatSettingsConfig
        }
    },
    inputSchema: schema,
});

export default ChatChatVentureChatConverter;
