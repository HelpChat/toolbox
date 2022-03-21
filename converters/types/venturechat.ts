// @ToolBox - VentureChatConfig

export interface VentureChatConfig {
  tellformatto: string
  tellformatfrom: string
  jsonformatting?: {
    [key: string]: VentureChatFormat;
  }
}

export interface VentureChatFormat {
  priority: number;
  json_attributes: {
    player_displayname: VentureChatJsonComponent
    vault_prefix: VentureChatJsonComponent
    venturechat_channel_prefix: VentureChatJsonComponent
  }
}

export interface VentureChatJsonComponent {
  hover_text: string[]
  click_action: string
  click_text: string
}
