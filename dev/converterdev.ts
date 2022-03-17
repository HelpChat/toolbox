// Uses Input File "in.yaml" and Output File "out.yaml"

import * as fs from "fs";
import ConvertConfig from "../converter/converter";

const input = fs.readFileSync("./dev/input.yml", "utf8");
const output = ConvertConfig(input);
fs.writeFileSync("./dev/output-format.yml", !output ? "" : output.format);
fs.writeFileSync("./dev/output-settings.yml", !output ? "" : output.settings);
console.log("Conversion complete");
