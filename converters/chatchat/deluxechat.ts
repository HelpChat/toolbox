import Converter from "../converter";
import {
  DeluxeChatConfig,
  DeluxeChatFormat,
  DeluxeChatPrivateMessageFormat,
} from "../types/deluxechat";
import {
  ChatChatFormat,
  ChatChatFormatsConfig,
  ChatChatSettingsConfig,
} from "../types/chatchat";
import MiniMessage from "../minimessage";

const schema = require("../types/deluxechat.json");

const ChatChatDeluxeChatConverter = new Converter<
  DeluxeChatConfig,
  { format: ChatChatFormatsConfig; settings: ChatChatSettingsConfig }
>({
  Convert(deluxechatConfig) {
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
    if (deluxechatConfig.formats) {
      const formats = deluxechatConfig.formats;
      Object.keys(formats).forEach((name) => {
        const dcFormat = formats[name];
        const ccFormat: ChatChatFormat = {
          priority: dcFormat.priority ?? 1,
          parts: [],
        };

        (["channel", "prefix", "name", "suffix"] as const).forEach(
          (segment) => {
            let formattedSegment = dcFormat[segment];

            // Add in the click command if it exists
            let segmentClick =
              dcFormat[(segment + "_click_command") as keyof DeluxeChatFormat];
            if (segmentClick && segmentClick !== "") {
              formattedSegment =
                "<click:run_command:'" +
                segmentClick +
                "'>" +
                formattedSegment +
                "</click>";
            }

            // Add in the hover if it exists
            let segmentHover: string[] = (<string[]>(
              dcFormat[(segment + "_tooltip") as keyof DeluxeChatFormat]
            )).filter((s) => s && s !== "");
            if (segmentHover && segmentHover.length > 0) {
              formattedSegment =
                "<hover:show_text:'" +
                segmentHover.join("<newline>") +
                "'>" +
                formattedSegment +
                "</hover>";
            }
            if (formattedSegment !== "") {
              ccFormat.parts.push(MiniMessage(formattedSegment));
            }
          }
        );
        ccFormat.parts.push("<message>");
        chatchatFormatsConfig.formats[name] = ccFormat;
      });
    }
    if (deluxechatConfig.private_message_formats) {
      const formats = deluxechatConfig.private_message_formats;
      ["to_sender", "to_recipient"].forEach((section) => {
        const dcFormat: DeluxeChatPrivateMessageFormat =
          formats[section as keyof DeluxeChatConfig["private_message_formats"]];
        const ccPartsFormat: string[] = [];
        let formattedSegment = dcFormat.format ?? "";

        // Add in the click command if it exists
        let segmentClick = dcFormat.click_command;
        if (segmentClick && segmentClick !== "") {
          formattedSegment =
            "<click:run_command:'" +
            segmentClick +
            "'>" +
            formattedSegment +
            "</click>";
        }

        // Add in the hover if it exists
        let segmentHover: string[] = (<string[]>dcFormat.tooltip).filter(
          (s) => s && s !== ""
        );
        if (segmentHover && segmentHover.length > 0) {
          formattedSegment =
            "<hover:show_text:'" +
            segmentHover.join("<newline>") +
            "'>" +
            formattedSegment +
            "</hover>";
        }
        ccPartsFormat.push(MiniMessage(formattedSegment));
        ccPartsFormat.push("<message>");

        switch (section) {
          case "to_sender":
            chatchatSettingsConfig["sender-format"].parts = ccPartsFormat;
            break;
          case "to_recipient":
            chatchatSettingsConfig["recipient-format"].parts = ccPartsFormat;
            break;
        }
      });

      if (formats.social_spy) {
        const socialSpyFormat = formats.social_spy;
        const ccSocialSpyPartsFormat: string[] = [];

        ccSocialSpyPartsFormat.push(MiniMessage(socialSpyFormat));
        ccSocialSpyPartsFormat.push("<message>");

        chatchatSettingsConfig["social-spy-format"].parts =
          ccSocialSpyPartsFormat;
      }
    }

    return {
      format: chatchatFormatsConfig,
      settings: chatchatSettingsConfig,
    };
  },
  inputSchema: schema,
});

export default ChatChatDeluxeChatConverter;
