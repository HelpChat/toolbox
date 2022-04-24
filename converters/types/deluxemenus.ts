// @Toolbox - DeluxeMenus

export interface DeluxeMenus {
    deluxemenu: DeluxeMenusMenu;
}

export interface DeluxeMenusMenu {
    menu_title: string | string[];
    inventory_type?: string;
    size?: number;
    update_interval?: number;

    open_command?: string | string[];
    register_command?: boolean;
    args?: string[];
    args_usage_message?: string;

    open_requirement?: DeluxeMenusRequirements
    open_commands?: string[];
    close_commands?: string[];

    items: {
        [key: String]: DeluxeMenusItem;
    };
}

export interface DeluxeMenusItem {
    material: string;
    data?: number | string;
    amount?: number;
    dynamic_amount?: string;
    display_name?: string;
    lore?: string[];

    update?: boolean;

    unbreakable?: boolean;
    hide_attributes?: boolean;
    hide_unbreakable?: boolean;
    hide_enchantments?: boolean;
    hide_effects?: boolean;
    item_flags?: string | string[];

    rgb?: string;
    potion_effects?: string[];
    banner_meta?: string[];
    enchantments?: string[];

    nbt_string?: string;
    nbt_strings?: string[];
    nbt_int?: string;
    nbt_ints?: string[];

    slot?: number;
    // elements of list can either be numbers or range of numbers e.g. 3-15
    slots?: string[];

    priority?: number;
    view_requirement?: DeluxeMenusRequirements;

    click_commands?: string[];
    click_requirement?: DeluxeMenusRequirements;

    left_click_commands?: string[];
    left_click_requirement?: DeluxeMenusRequirements;

    right_click_commands?: string[];
    right_click_requirement?: DeluxeMenusRequirements;

    shift_left_click_commands?: string[];
    shift_left_click_requirement?: DeluxeMenusRequirements;

    shift_right_click_commands?: string[];
    shift_right_click_requirement?: DeluxeMenusRequirements;

    middle_click_commands?: string[];
    middle_click_requirement?: DeluxeMenusRequirements;
}

export interface DeluxeMenusRequirements {
    minimum_requirements?: number;
    stop_at_success?: boolean;
    deny_commands?: string[];
    requirements?: {
        [key: String]: DeluxeMenusRequirement;
    };
}

export interface DeluxeMenusRequirement {
    type: string;

    success_commands?: string[];
    deny_commands?: string[];
    optional?: boolean;
}

export interface HasItemRequirement extends DeluxeMenusRequirement {
    material: string;
    amount?: number;
    data?: number;
    name?: string;
    lore?: string | string[];
    strict?: boolean;
    armor?: boolean;
    offhand?: boolean;
    modeldata?: number;
    "name-contains?": boolean;
    "name-ignorecase?": boolean;
    "lore-contains?": boolean;
    "lore-ignorecase?": boolean;
}

export interface HasPermissionRequirement extends DeluxeMenusRequirement {
    permission: string;
}

export interface JavaScriptRequirement extends DeluxeMenusRequirement {
    expression: string;
}

export interface ComparisonRequirement extends DeluxeMenusRequirement {
    input: string;
    output: string;
}

export interface HasMoneyRequirement extends DeluxeMenusRequirement {
    amount: string | number;
}

export interface HasExpRequirement extends DeluxeMenusRequirement {
    amount: string | number;
    level?: boolean;
}

export interface RegexRequirement extends DeluxeMenusRequirement {
    regex: string;
    input: string;
}

export interface IsNearRequirement extends DeluxeMenusRequirement {
    location: string;
    distance: number;
}

export interface HasMetaRequirement extends DeluxeMenusRequirement {
    key: string;
    // can be STRING, BOOLEAN, INTEGER. LONG, DOUBLE (case insensitive)
    meta_type: string;
    // can be true or false when type is BOOLEAN
    // can be Java Long when type is INTEGER or LONG
    // can be Java Double when type is DOUBLE
    // can be any string when type is STRING
    value: string;
}