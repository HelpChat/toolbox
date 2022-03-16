import {parse, stringify} from 'yaml'
import {ChatChatFormatsConfig} from "./types/chatchat";

export default function ConvertConfig(yamlconfig: string): string | false {
    const deluxechatConfig = parse(yamlconfig);
    const chatchatFormatsConfig: ChatChatFormatsConfig = {
        "default-format": 'default',
        formats: {}
    }
    return stringify(chatchatFormatsConfig);
}
