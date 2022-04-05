import type { NextPage } from "next";
import Converter from "../../../components/Converter";
import ChatChatVentureChatConverter from "../../../converters/chatchat/venturechat";

const DeluxeChatConverter: NextPage = () => (
  <Converter
    inputConfigs={{
      venturechat: {
        name: "VentureChat Config",
        language: "yaml",
      },
    }}
    outputConfigs={{
      format: {
        name: "ChatChat Formats Config",
      },
      settings: {
        name: "ChatChat Settings Config",
      },
    }}
    title={"VentureChat Config Converter"}
    description={"VentureChat to ChatChat Config Converter"}
    parser={(config) => {
      return ChatChatVentureChatConverter.convert({
        venturechat: config.venturechat ?? {},
      });
    }}
  />
);

export default DeluxeChatConverter;
