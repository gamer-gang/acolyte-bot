import { guildPrefs } from "..";
import { CmdParams, GuildPrefs } from "../types";

export async function prefs(params: CmdParams) {
  const { msg } = params;

  const prefs = guildPrefs.get(msg.guild?.id as string) as GuildPrefs;

  msg.channel.send(`Current preferences\n\`\`\`json\n${JSON.stringify(prefs, null, 2)}\`\`\``);
}