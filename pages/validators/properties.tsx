import type { NextPage } from "next";
import Properties from "@js.properties/properties";
import Validator from "../../components/Validator";

const TomlValidator: NextPage = () => (
  <Validator
    language={"Toml"}
    lang={"toml"}
    parser={(config) => {
      let configObject: any = {};
      try {
        const propertiesList = Properties.parseToEntries(config, {
          all: false,
        });
        propertiesList.forEach((properties) => {
          if (!properties.key) return;
          configObject[properties.key] = properties.element;
        });
        return { error: false, data: configObject };
      } catch (e: any) {
        return {
          error: true,
          message: e?.message ?? "Error parsing properties",
        };
      }
    }}
  />
);

export default TomlValidator;
