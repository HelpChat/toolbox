export default function MiniMessage(input: string): string {
  const characters = ["&", "§", "\\\\u00a7"];

  const legacyReplacements: Record<string, string> = {
    "0": "<black>",
    "1": "<dark_blue>",
    "2": "<dark_green>",
    "3": "<dark_aqua>",
    "4": "<dark_red>",
    "5": "<dark_purple>",
    "6": "<gold>",
    "7": "<gray>",
    "8": "<dark_gray>",
    "9": "<blue>",
    a: "<green>",
    b: "<aqua>",
    c: "<red>",
    d: "<light_purple>",
    e: "<yellow>",
    f: "<white>",
    k: "<obfuscated>",
    l: "<b>",
    m: "<st>",
    n: "<u>",
    o: "<i>",
    r: "<reset>",
    "/&?#((?:[a-f0-9]{3}){1,2})": "<#$1>",
  };

  let out = input;

  Object.keys(legacyReplacements).forEach((key) => {
    if (key.startsWith("/")) {
      out = out.replace(
        new RegExp(key.slice(1), "ig"),
        legacyReplacements[key]
      );
    } else {
      characters.forEach((character) => {
        out = out.replace(
          new RegExp(character + key, "ig"),
          legacyReplacements[key]
        );
      });
    }
  });

  return out;
}
