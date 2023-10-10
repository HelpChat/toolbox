import Validator from "../../components/Validator";
import { validate } from "../../validators/validator";
import * as deluxemenus from "../../validators/types/deluxemenus.json";
import type { JSONSchema7 } from "json-schema";

export default function DeluxeMenus() {
    return (
        <Validator
            language={"DeluxeMenus"}
            lang={"yaml"}
            parser={(config) => validate(config, deluxemenus as JSONSchema7)}
            jsonDump={false}
        />
    );
}