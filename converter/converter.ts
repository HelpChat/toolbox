import {parse, stringify} from 'yaml'
import {ChatChatFormat, ChatChatFormatsConfig} from "./types/chatchat";
import Ajv from "ajv"
import {DeluxeChatConfig, DeluxeChatFormat} from "./types/deluxechat";

const schema = require('./types/deluxechat.json');
const ajv = new Ajv()

export default function ConvertConfig(yamlconfig: string): string | false {
    let deluxechatConfig: DeluxeChatConfig;
    try {
        deluxechatConfig = parse(yamlconfig);
    } catch (e) {
        console.error(e);
        return false;
    }
    const validate = ajv.compile(schema)
    const valid = validate(deluxechatConfig)
    if (!valid) {
        console.error(validate.errors)
        return false;
    }
    const chatchatFormatsConfig: ChatChatFormatsConfig = {
        "default-format": 'default',
        formats: {}
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
                ccFormat.parts.push(minimessage(formattedSegment));
            })
            chatchatFormatsConfig.formats[name] = ccFormat;
        })
    }
    return stringify(chatchatFormatsConfig);
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
                out = out.replace(new RegExp(key.slice(1), "gi"), legacyReplacements[key]);
            } else {
                out = out.replace(character + key, legacyReplacements[key]);
            }
        })
    });

    return out;
}
