export default function Placeholders(input: string): string {
    const replacements: Record<string, string> = {
        '{MESSAGE}': "<message>",
        '{USERNAME}': "%player_name%",
        '{DISPLAYNAME}': "%player_display_name%",
        '{NICKNAME}': "%essentials_nickname%",
        '{PREFIX}': "%vault_prefix%",
        '{SUFFIX}': "%vault_suffix%",
        '{GROUP}': "%vault_groupprefix%",
        '{WORLDNAME}': "%player_world_name%"
    }

    let out = input;

    Object.keys(replacements).forEach(key => {
        out = out.replace(new RegExp(key, "ig"), replacements[key]);
    });

    return out;
}
