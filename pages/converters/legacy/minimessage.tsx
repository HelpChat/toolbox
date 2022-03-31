import type {NextPage} from "next";
import Converter from "../../../components/Converter";
import MiniMessage from "../../../converters/minimessage";
import {ConversionError} from "../../../converters/converter";
import {string} from "prop-types";

const LegacyToMiniMessage: NextPage = () => (
    <Converter
        inputConfigs={{
            legacy: {
                name: "Legacy Strings",
                language: "txt",
            }
        }}
        outputConfigs={{
            formatted: {
                name: "MiniMessage Formatted Strings",
            }
        }}
        title={"MiniMessage String Converter"}
        description={"Legacy to MiniMessage String Converter"}
        parser={(config) => {
            return {
                error: false,
                data: MiniMessage(config.legacy),
            }
        }}
    />
);

export default LegacyToMiniMessage;
