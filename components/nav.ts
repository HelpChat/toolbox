import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCommentDots, faFile, faFileCode } from "@fortawesome/free-solid-svg-icons";

export const Tools: Record<
  string,
  ToolboxTool[] | Record<string, ToolboxTool[]>
> = {
  Converters: {
    ChatChat: [
      {
        name: "DeluxeChat Convert",
        short: "DeluxeChat",
        icon: faCommentDots,
        description: "Convert DeluxeChat Configs to ChatChat Configs",
        link: "/converters/chatchat/deluxechat",
      },
      {
        name: "Essentials Convert",
        short: "Essentials",
        icon: faCommentDots,
        description: "Convert EssentialsChat Configs to ChatChat Configs",
        link: "/converters/chatchat/essentialschat",
      },
      {
        name: "VentureChat Convert",
        short: "VentureChat",
        icon: faCommentDots,
        description: "Convert VentureChat Configs to ChatChat Configs",
        link: "/converters/chatchat/venturechat",
      },
    ],
  },
  Validators: [
    {
      name: "Yaml Validator",
      short: "Yaml",
      icon: faFileCode,
      description: "Check your config before you wreck your config",
      link: "/validators/yaml",
    },
    {
      name: "Properties Validator",
      short: "Properties",
      icon: faFileCode,
      description: "Validate Properties Files",
      link: "/validators/properties",
    },
    {
      name: "Toml Validator",
      short: "Toml",
      icon: faFileCode,
      description: "Validate Toml Files",
      link: "/validators/toml",
    },
    {
      name: "Hocon Validator",
      short: "Hocon",
      icon: faFileCode,
      description: "Validate Hocon Files",
      link: "/validators/hocon",
    },
    {
      name: "XML Validator",
      short: "XML",
      icon: faFileCode,
      description: "Validate XML Files",
      link: "/validators/xml",
    },
  ],
};

export type ToolboxTool = {
  name: string;
  short: string;
  icon: IconProp;
  description: string;
  link: string;
};
