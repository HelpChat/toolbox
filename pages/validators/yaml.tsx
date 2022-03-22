import type { NextPage } from "next";
import { parse } from "yaml";
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
            data: configObject,
          };
        }
      } catch (e: any) {
        return { error: true, message: e.message };
      }
    }}
  />
);

export default TomlValidator;
