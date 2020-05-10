import { guildPrefs } from '..';
import { yaml } from '../common/util';
import { CmdParams, Documentation, GuildPrefs } from '../types';

async function prefs(params: CmdParams) {
  const { msg } = params;

  const prefs = guildPrefs.get(msg.guild?.id as string) as GuildPrefs;

  msg.channel.send(`Current preferences\n${yaml(prefs)}`);
}

namespace prefs {
  export const docs: Documentation = {
    usage: 'prefs',
    description: "List this server's preferences",
    detailed: "Displays stored cofiguration for the requester's guild in JSON format.",
  };
}

export = prefs;
