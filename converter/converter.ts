import {parse, stringify} from 'yaml'
import {ChatChatFormat, ChatChatFormatsConfig, ChatChatSettingsConfig} from "./types/chatchat";
import Ajv from "ajv"
import {DeluxeChatConfig, DeluxeChatFormat, DeluxeChatPrivateMessageFormat} from "./types/deluxechat";

const schema = require('./types/deluxechat.json');
const ajv = new Ajv()

export default function ConvertConfig(yamlconfig: string): {settings: string, format: string} | false {
    let deluxechatConfig: DeluxeChatConfig;
    try {
        deluxechatConfig = parse(yamlconfig);
    } catch (e) {
        console.log(e);
        return false;
    }
    const validate = ajv.compile(schema)
    try {
        const valid = validate(deluxechatConfig)
        if (!valid) {
            console.log(validate.errors)
            return false;
        }
    } catch (e) {
        console.log(validate.errors)
        return false;
    }
    if (!deluxechatConfig) return false;
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
    if (deluxechatConfig.formats) {
        const formats = deluxechatConfig.formats;
        Object.keys(formats).forEach(name => {
            const dcFormat = formats[name];
            const ccFormat: ChatChatFormat = {
                priority: dcFormat.priority ?? 1,
                parts: []
            };

            (["channel", "prefix", "name", "suffix"] as const).forEach(segment => {
                let formattedSegment = dcFormat[segment];

                // Add in the click command if it exists
                let segmentClick = dcFormat[segment + "_click_command" as keyof DeluxeChatFormat];
                if (segmentClick && segmentClick !== "") {
                    formattedSegment = "<click:run_command:'" + segmentClick + "'>" + formattedSegment + "</click>";
                }

                // Add in the hover if it exists
                let segmentHover: string[] = (<string[]>dcFormat[segment + "_tooltip" as keyof DeluxeChatFormat]).filter(s => s && s !== "")
                if (segmentHover && segmentHover.length > 0) {
                    formattedSegment = "<hover:show_text:'" + segmentHover.join("<newline>") + "'>" + formattedSegment + "</hover>";
                }
                if (formattedSegment !== "") {
                    ccFormat.parts.push(minimessage(formattedSegment));
                }
            })
            ccFormat.parts.push("<message>");
            chatchatFormatsConfig.formats[name] = ccFormat;
        })
    }
    if (deluxechatConfig.private_message_formats) {
        const formats = deluxechatConfig.private_message_formats;
        (["to_sender", "to_recipient"]).forEach(section => {
            const dcFormat: DeluxeChatPrivateMessageFormat = formats[section as keyof DeluxeChatConfig["private_message_formats"]];
            const ccPartsFormat: string[] = []
            let formattedSegment = dcFormat.format ?? "";

            // Add in the click command if it exists
            let segmentClick = dcFormat.click_command;
            if (segmentClick && segmentClick !== "") {
                formattedSegment = "<click:run_command:'" + segmentClick + "'>" + formattedSegment + "</click>";
            }

            // Add in the hover if it exists
            let segmentHover: string[] = (<string[]>dcFormat.tooltip).filter(s => s && s !== "")
            if (segmentHover && segmentHover.length > 0) {
                formattedSegment = "<hover:show_text:'" + segmentHover.join("<newline>") + "'>" + formattedSegment + "</hover>";
            }
            ccPartsFormat.push(minimessage(formattedSegment));
            ccPartsFormat.push("<message>");

            switch (section) {
                case "to_sender":
                    chatchatSettingsConfig["sender-format"].parts = ccPartsFormat;
                    break;
                case "to_recipient":
                    chatchatSettingsConfig["recipient-format"].parts = ccPartsFormat;
                    break;
            }
        })
    }
    return {format: stringify(chatchatFormatsConfig, {lineWidth: 0}), settings: stringify(chatchatSettingsConfig, {lineWidth: 0})}
}

function minimessage(input: string): string {
    const characters = ["&", "§"];
    const legacyReplacements: Record<string, string> = {
        '0': "<black>",
        '1': "<dark_blue>",
        '2': "<dark_green>",
        '3': "<dark_aqua>",
        '4': "<dark_red>",
        '5': "<dark_purple>",
        '6': "<gold>",
        '7': "<gray>",
        '8': "<dark_gray>",
        '9': "<blue>",
        a: "<green>",
        b: "<aqua>",
        c: "<red>",
        d: "<light_purple>",
        e: "<yellow>",
        f: "<white>",
        k: "<obfuscated>",
        l: "<b>",
        m: "<st>",
        n: "<u>",
        o: "<i>",
        r: "<reset>",
        "/&?#((?:[a-f0-9]{3}){1,2})": "<#$1>"
    }

    let out = input;

    characters.forEach(character => {
        Object.keys(legacyReplacements).forEach(key => {
            if (key.startsWith("/")) {
                out = out.replace(new RegExp(key.slice(1), "ig"), legacyReplacements[key]);
            } else {
                out = out.replace(new RegExp(character + key, "ig"), legacyReplacements[key]);
            }
            console.log(character + key);
        })
    });

    return out;
}
