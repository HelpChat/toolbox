import {parse, stringify} from 'yaml'
import {ChatChatFormat, ChatChatFormatsConfig} from "./types/chatchat";
import Ajv from "ajv"
import {DeluxeChatConfig, DeluxeChatFormat} from "./types/deluxechat";

const schema = require('./types/deluxechat.json');
const ajv = new Ajv()

export default function ConvertConfig(yamlconfig: string): string | false {
    const deluxechatConfig: DeluxeChatConfig = parse(yamlconfig);
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
                    formattedSegment = "<hover:show_text:'" + segmentHover.join("\\n") + "'>" + formattedSegment + "</hover>";
                }
                ccFormat.parts.push(minimessage(formattedSegment));
            })
            chatchatFormatsConfig.formats[name] = ccFormat;
            console.log(dcFormat);
        })
    }
    return stringify(chatchatFormatsConfig);
}

function minimessage(input: string): string {
    const char = "&";

    return input.replaceAll(char + "0", "<black>")
        .replaceAll(char + "1", "<dark_blue>")
        .replaceAll(char + "2", "<dark_green>")
        .replaceAll(char + "3", "<dark_aqua>")
        .replaceAll(char + "4", "<dark_red>")
        .replaceAll(char + "5", "<dark_purple>")
        .replaceAll(char + "6", "<gold>")
        .replaceAll(char + "7", "<gray>")
        .replaceAll(char + "8", "<dark_gray>")
        .replaceAll(char + "9", "<blue>")
        .replaceAll(char + "a", "<green>")
        .replaceAll(char + "b", "<aqua>")
        .replaceAll(char + "c", "<red>")
        .replaceAll(char + "d", "<light_purple>")
        .replaceAll(char + "e", "<yellow>")
        .replaceAll(char + "f", "<white>")
}
