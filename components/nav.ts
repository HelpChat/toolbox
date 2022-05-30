import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {
    faCommentDots,
    faFileCode,
    faFileCircleCheck,
    faFilePen,
    faPaste,
    faFileCircleQuestion,
    faHouseCircleCheck,
    faComment,
    faTurnUp,
    faIdCard,
} from "@fortawesome/free-solid-svg-icons";

export const Tools: Record<string,
    ToolboxTool[] | Record<string, ToolboxTool[]>> = {
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
                icon: faHouseCircleCheck,
                description: "Convert EssentialsChat Configs to ChatChat Configs",
                link: "/converters/chatchat/essentialschat",
            },
            {
                name: "VentureChat Convert",
                short: "VentureChat",
                icon: faComment,
                description: "Convert VentureChat Configs to ChatChat Configs",
                link: "/converters/chatchat/venturechat",
            },
        ],
        Legacy: [
            {
                name: "Legacy Text Convert",
                short: "MiniMessage",
                icon: faTurnUp,
                description: "Convert Legacy Strings to MiniMessage Strings",
                link: "/converters/legacy/minimessage",
            },
        ],
        UUID: [
            {
                name: "UUID Converter",
                short: "UUID",
                icon: faIdCard,
                description: "Convert UUIDs to Names",
                link: "/converters/uuid",
            }
        ]
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
            icon: faFileCircleCheck,
            description: "Validate Properties Files",
            link: "/validators/properties",
        },
        {
            name: "Toml Validator",
            short: "Toml",
            icon: faFilePen,
            description: "Validate Toml Files",
            link: "/validators/toml",
        },
        {
            name: "Hocon Validator",
            short: "Hocon",
            icon: faPaste,
            description: "Validate Hocon Files",
            link: "/validators/hocon",
        },
        {
            name: "XML Validator",
            short: "XML",
            icon: faFileCircleQuestion,
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
