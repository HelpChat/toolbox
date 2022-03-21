import Converter from '../converter';
import {VentureChatConfig, VentureChatFormat, VentureChatJsonComponent} from "../types/venturechat";
import {ChatChatFormat, ChatChatFormatsConfig, ChatChatSettingsConfig} from "../types/chatchat";
import MiniMessage from "../minimessage";

const schema = require('../types/venturechat.json');

const ChatChatVentureChatConverter = new Converter<VentureChatConfig, {format: ChatChatFormatsConfig, settings: ChatChatSettingsConfig}>({
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

                let key = 0;

                // todo get the possible key from the object?
                ([vcFormat.json_attributes.venturechat_channel_prefix, vcFormat.json_attributes.vault_prefix, vcFormat.json_attributes.player_displayname]).forEach(section => {
                    let part = "";
                    switch(key) {
                        case 0:
                            part = "%venturechat_channel_prefix%";
                            break;
                        case 1:
                            part = "%vault_prefix%";
                            break;
                        case 2:
                            part = "%player_displayname%";
                            break;
                    }
                    console.log(key);
                    key++;
                    let formattedSection = part;
                    switch(section.click_action) {
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
                    let hover: string[] = (<string[]>section.hover_text).filter(s => s && s !== "")
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
