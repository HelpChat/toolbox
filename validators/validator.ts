import { parse } from "yaml";
import Ajv from "ajv";
import betterAjvErrors from "better-ajv-errors";
import type { JSONSchema7 } from "json-schema";
import type { ConversionError } from "../converters/converter";

const ajv = new Ajv();

export function validate(
    config: string,
    inputSchema: JSONSchema7,
): { error: false, data: any } | ConversionError {
    let configObject: any;

    try {
        configObject = parse(config);
        if (!configObject || !(typeof configObject === "object")) {
            return { error: true, message: "must be object" };
        }
    } catch (e: any) {
        return { error: true, message: e.message };
    }

    const validate = ajv.compile(inputSchema);
    try {
        const valid = validate(configObject);
        if (!valid) {
            const output = betterAjvErrors(inputSchema, configObject, validate.errors!!);

            return {
                message: output ?? "Error validating input",
                error: true,
            };
        }
    } catch (e) {
        return {
            message:
                validate.errors?.map((e) => e.message).join("\n") ??
                "Error validating input",
            error: true,
        };
    }

    return {
        error: false,
        data: "Looks good!",
    };
}