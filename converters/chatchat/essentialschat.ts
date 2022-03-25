import Converter from "../converter";
import { EssentialsChatTypes } from "../types/essentialschat";
import {
  ChatChatFormat,
  ChatChatFormatsConfig,
  ChatChatSettingsConfig,
} from "../types/chatchat";
import MiniMessage from "../minimessage";

const schema = require("../types/essentialschat.json");

const ChatChatEssentialsChatConverter = new Converter<
  EssentialsChatTypes,
  { format: ChatChatFormatsConfig; settings: ChatChatSettingsConfig }
>({
  Convert(essentialschatConfig) {
    const chatchatFormatsConfig: ChatChatFormatsConfig = {
      "default-format": "default",
      formats: {},
    };
    const chatchatSettingsConfig: ChatChatSettingsConfig = {
      "sender-format": {
        parts: [],
      },
      "recipient-format": {
        parts: [],
      },
    };

    if (
      !essentialschatConfig.essentials ||
      !essentialschatConfig.essentials.chat
    ) {
      return {
        error: true,
        message: "must be object",
      };
    }

    if (essentialschatConfig.essentials.chat.format) {
      const format = essentialschatConfig.essentials.chat.format;
      const ccFormat: ChatChatFormat = {
        priority: 1,
        parts: [],
      };
      let parsed = MiniMessage(format);
      ccFormat.parts.push(Placeholders(parsed));
      chatchatFormatsConfig.formats["default"] = ccFormat;
    }

    let formatCount = 1;

    if (essentialschatConfig.essentials.chat["group-formats"]) {
      const formats = essentialschatConfig.essentials.chat["group-formats"];
      Object.keys(formats).forEach((name) => {
        const ecFormat = formats[name];
        const ccFormat: ChatChatFormat = {
          priority: formatCount,
          parts: [],
        };
        let parsed = MiniMessage(ecFormat);
        ccFormat.parts.push(Placeholders(parsed));
        chatchatFormatsConfig.formats[name] = ccFormat;
        formatCount++;
      });
    }

    if (essentialschatConfig.language.msgFormat) {
      chatchatSettingsConfig["sender-format"].parts.push(
        MiniMessage(essentialschatConfig.language.msgFormat)
      );
    }

    return {
      format: chatchatFormatsConfig,
      settings: chatchatSettingsConfig,
    };
  },
  inputSchema: schema,
});

function Placeholders(input: string): string {
  const replacements: Record<string, string> = {
    "{MESSAGE}": "<message>",
    "{USERNAME}": "%player_name%",
    "{DISPLAYNAME}": "%player_display_name%",
    "{NICKNAME}": "%essentials_nickname%",
    "{PREFIX}": "%vault_prefix%",
    "{SUFFIX}": "%vault_suffix%",
    "{GROUP}": "%vault_groupprefix%",
    "{WORLDNAME}": "%player_world_name%",
  };

  let out = input;

  Object.keys(replacements).forEach((key) => {
    out = out.replace(new RegExp(key, "ig"), replacements[key]);
  });

  return out;
}

export default ChatChatEssentialsChatConverter;
