import type {NextPage} from "next";
import Converter from "../../../components/Converter";
import MiniMessage from "../../../converters/minimessage";
import {ConversionError} from "../../../converters/converter";
import {string} from "prop-types";

const LegacyToMiniMessage: NextPage = () => (
    <Converter
        inputConfigs={{
            legacy: {
                name: "Legacy Input",
                language: "txt",
            }
        }}
        outputConfigs={{
            formatted: {
                name: "MiniMessage Output",
            }
        }}
        title={"MiniMessage String Converter"}
        description={"Legacy to MiniMessage String Converter"}
        parser={(config) => {
            return {
                error: false,
                data: { formatted: MiniMessage(config.legacy) },
            }
        }}
    />
);

export default LegacyToMiniMessage;
