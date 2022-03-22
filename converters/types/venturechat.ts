// @ToolBox - VentureChatConfig

export interface VentureChatConfig {
  tellformatto: string;
  tellformatfrom: string;
  jsonformatting?: {
    [key: string]: VentureChatFormat;
  };
}

export interface VentureChatFormat {
  priority: number;
  json_attributes?: {
    [key: string]: VentureChatJsonComponent;
  };
}

export interface VentureChatJsonComponent {
  hover_text: string[];
  click_action: string;
  click_text: string;
}
