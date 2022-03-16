import {parse, stringify} from 'yaml'
import {ChatChatFormatsConfig} from "./types/chatchat";
import Ajv from "ajv"
import {DeluxeChatConfig} from "./types/deluxechat";

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
    return stringify(chatchatFormatsConfig);
}
