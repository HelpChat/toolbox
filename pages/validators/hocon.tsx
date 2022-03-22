import type { NextPage } from "next";
import { parseHocon as parse } from "@tkint/hocon-parser";
import Validator from "../../components/Validator";

const HoconValidator: NextPage = () => (
  <Validator
    language={"Hocon"}
    lang={"yaml"}
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

export default HoconValidator;
