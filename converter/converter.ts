import {parse, stringify} from 'yaml'
import {ChatChatFormatsConfig} from "./types/chatchat";
import Ajv from "ajv"

const schema = require('./types/deluxechat.json');
const ajv = new Ajv()

export default function ConvertConfig(yamlconfig: string): string | false {
    const deluxechatConfig = parse(yamlconfig);
    const validate = ajv.compile(schema)
    const valid = validate(deluxechatConfig)
    if (!valid) console.log(validate.errors)
    const chatchatFormatsConfig: ChatChatFormatsConfig = {
        "default-format": 'default',
        formats: {}
    }
    return stringify(chatchatFormatsConfig);
}
