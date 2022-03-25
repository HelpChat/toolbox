import type { NextPage } from "next";
import ChatChatDeluxeChatConverter from "../../../converters/chatchat/deluxechat";
import Converter from "../../../components/Converter";

const DeluxeChatConverter: NextPage = () => (
  <Converter
    inputConfigs={{
      deluxechat: {
        name: "DeluxeChat Config",
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
    title={"DeluxeChat Config Converter"}
    description={"DeluxeChat to ChatChat Config Converter"}
    parser={(config) => {
      return ChatChatDeluxeChatConverter.convert({
        deluxechat: config.deluxechat ?? {},
      });
    }}
  />
);

export default DeluxeChatConverter;
