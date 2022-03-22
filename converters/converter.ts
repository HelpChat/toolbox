import {parse, stringify} from 'yaml'
import Ajv, {Schema} from "ajv"

export default class Converter<InputConfig extends object, OutputConfigs extends Record<string, object>> {
    conversion: Conversion<InputConfig, OutputConfigs>
    ajv = new Ajv()

    constructor(conversion: Conversion<InputConfig, OutputConfigs>) {
        this.conversion = conversion
    }

    convert(input: any): Record<keyof OutputConfigs, string> | ConversionError {

        let untypedInputConfig: any;

        try {
            if (typeof input === 'string') {
                untypedInputConfig = parse(input)
            } else {
                untypedInputConfig = {};
                for (const key of Object.keys(input)) {
                    if (typeof input[key] === 'string') {
                        untypedInputConfig[key] = parse(input[key])
                    } else {
                        untypedInputConfig[key] = input[key]
                    }
                }
            }
        } catch (e: any) {
            return {
                message: e.message ?? "Error parsing input",
                error: true
            }
        }
        const validate = this.ajv.compile(this.conversion.inputSchema)
        try {
            const valid = validate(untypedInputConfig)
            if (!valid) {
                return {
                    message: validate.errors?.map(e => e.message).join("\n") ?? "Error validating input",
                    error: true
                }
            }
        } catch (e) {
            return {
                message: validate.errors?.map(e => e.message).join("\n") ?? "Error validating input",
                error: true
            }
        }
        const inputConfig = untypedInputConfig as InputConfig

        const outputConfigs = this.conversion.Convert(inputConfig);

        if (outputConfigs.error) {
            return (outputConfigs as ConversionError)
        }

        const returnValue: Record<string, string> = {}

        Object.keys(outputConfigs).forEach(key => {
            returnValue[key] = stringify((outputConfigs as OutputConfigs)[key], {lineWidth: 0})
        })

        return returnValue as Record<keyof OutputConfigs, string>
    }
}

export interface Conversion<InputConfig extends object, OutputConfigs extends Record<string, object>> {
    Convert(input: InputConfig): OutputConfigs | ConversionError

    inputSchema: Schema
}

export interface ConversionError {
    error: true,
    message: string
}
