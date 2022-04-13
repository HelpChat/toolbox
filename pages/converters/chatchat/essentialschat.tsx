import type { NextPage } from "next";
import ChatChatEssentialsChatConverter from "../../../converters/chatchat/essentialschat";
import Properties from "@js.properties/properties";
import Converter from "../../../components/Converter";

const Home: NextPage = () => (
  <Converter
    inputConfigs={{
      essentials: {
        name: "EssentialsX Config",
        language: "yaml",
      },
      language: {
        name: "EssentialsX Language File",
        language: "properties",
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
    title={"EssentialsChat Config Converter"}
    description={"EssentialsChat to ChatChat Config Converter"}
    parser={(config) => {
      let propertiesConfig: any = {};
      try {
        const propertiesList = Properties.parseToEntries(
          config.language ?? "",
          {
            all: false,
          }
        );
        propertiesList.forEach((properties) => {
          if (!properties.key) return;
          propertiesConfig[properties.key] = properties.element ?? "";
        });
      } catch (e: any) {
        return {
          error: true,
          message: e.message ?? e,
        };
      }
      return ChatChatEssentialsChatConverter.convert({
        essentials: config.essentials ?? {},
        language: propertiesConfig ?? {},
      });
    }}
  />
);

export default Home;
