import type { NextPage } from "next";
import { xml2json as parse } from "xml-js";
import Validator from "../../components/Validator";

const XMLValidator: NextPage = () => (
  <Validator
    language={"XML"}
    lang={"xml"}
    parser={(config) => {
      try {
        const configObject = JSON.parse(parse(config, { compact: true }));
        console.log(configObject);
        if (!configObject || !(typeof configObject === "object")) {
          return { error: true, message: "must be object" };
        } else {
          return {
            error: false,
            data: configObject,
          };
        }
      } catch (e: any) {
        console.log(e);
        return { error: true, message: e.message };
      }
    }}
  />
);

export default XMLValidator;
