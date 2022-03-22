import type { NextPage } from "next";
import { parse } from "toml";
import Validator from "../../components/Validator";

const TomlValidator: NextPage = () => (
  <Validator
    language={"Toml"}
    lang={"toml"}
    parser={(config) => {
      let configObject;
      try {
        configObject = parse(config);
        if (!configObject || !(typeof configObject === "object")) {
          return { error: true, message: "must be object" };
        } else {
          return {
            error: false,
            data: JSON.parse(JSON.stringify(configObject)),
          };
        }
      } catch (e: any) {
        if (e.line && e.column) {
          return {
            error: true,
            message: `Parsing error on line ${e.line}, column ${e.column}: ${e.message}`,
          };
        } else {
          return { error: true, message: `Parsing error: ${e.message}` };
        }
      }
    }}
  />
);

export default TomlValidator;
