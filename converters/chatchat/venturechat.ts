import Converter from "../converter";
import { VentureChatConfig } from "../types/venturechat";
import {
  ChatChatFormat,
  ChatChatFormatsConfig,
  ChatChatSettingsConfig,
} from "../types/chatchat";
import MiniMessage from "../minimessage";

const schema = require("../types/venturechat.json");

const ChatChatVentureChatConverter = new Converter<
  VentureChatConfig,
  { format: ChatChatFormatsConfig; settings: ChatChatSettingsConfig }
>({
  Convert(venturechatConfig) {
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
      "social-spy-format": {
        parts: [],
      },
    };

    if (venturechatConfig.jsonformatting) {
      const formats = venturechatConfig.jsonformatting;
      Object.keys(formats).forEach((name) => {
        const vcFormat = formats[name];
        const ccFormat: ChatChatFormat = {
          priority: vcFormat.priority ?? 1,
          parts: [],
        };

        if (vcFormat.json_attributes) {
          const innerFormat = vcFormat.json_attributes;
          Object.keys(innerFormat).forEach((key) => {
            const part = `%${key}%`;
            const section = innerFormat[key];
            let formattedSection = part;
            switch (section.click_action) {
              case "suggest_command": {
                formattedSection =
                  "<click:suggest_command:'" +
                  section.click_text +
                  "'>" +
                  formattedSection +
                  "</click>";
                break;
              }
              case "run_command": {
                formattedSection =
                  "<click:run_command:'" +
                  section.click_text +
                  "'>" +
                  formattedSection +
                  "</click>";
                break;
              }
              case "open_url": {
                formattedSection =
                  "<click:open_url:'" +
                  section.click_text +
                  "'>" +
                  formattedSection +
                  "</click>";
                break;
              }
            }
            let hover = section.hover_text.filter((s: string) => s && s !== "");
            if (hover && hover.length > 0) {
              formattedSection =
                "<hover:show_text:'" +
                hover.join("<newline>") +
                "'>" +
                formattedSection +
                "</hover>";
            }

            if (formattedSection !== "") {
              ccFormat.parts.push(MiniMessage(formattedSection));
            }
          });
          ccFormat.parts.push("<message>");
          chatchatFormatsConfig.formats[name] = ccFormat;
        }
      });
    }

    const toFormat = venturechatConfig.tellformatto;
    const fromFormat = venturechatConfig.tellformatfrom;
    const spyFormat = venturechatConfig.tellformatspy;

    let ccPartsFormat: string[] = [];

    // The sender format
    ccPartsFormat.push(MiniMessage(toFormat));
    ccPartsFormat.push("<message>");
    chatchatSettingsConfig["sender-format"].parts = ccPartsFormat;

    // Reset
    ccPartsFormat = [];

    // The recipient format
    ccPartsFormat.push(MiniMessage(fromFormat));
    ccPartsFormat.push("<message>");
    chatchatSettingsConfig["recipient-format"].parts = ccPartsFormat;

    // Reset
    ccPartsFormat = [];

    // The spy format
    ccPartsFormat.push(MiniMessage(fromFormat));
    ccPartsFormat.push("<message>");
    chatchatSettingsConfig["social-spy-format"].parts = ccPartsFormat;

    return {
      format: chatchatFormatsConfig,
      settings: chatchatSettingsConfig,
    };
  },
  inputSchema: schema,
});

export default ChatChatVentureChatConverter;
