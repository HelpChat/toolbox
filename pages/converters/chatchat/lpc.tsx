import type { NextPage } from "next";
import ChatChatLPCConverter from "../../../converters/chatchat/lpc";
import Converter from "../../../components/Converter";

const LPCConverter: NextPage = () => (
    <Converter
        inputConfigs={{
            lpc: {
                name: "LPC Config",
                language: "yaml",
            },
        }}
        outputConfigs={{
            format: {
                name: "ChatChat Formats Config",
            },
        }}
        title={"LPC Config Converter"}
        description={"LPC to ChatChat Config Converter"}
        parser={(config) => {
            return ChatChatLPCConverter.convert({
                lpc: config ?? {},
            });
        }}
  />
);

export default LPCConverter;
