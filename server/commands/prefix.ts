import { docs } from '.';
import { guildPrefs } from '..';
import { CmdParams, GuildPrefs } from '../types';

async function prefix(params: CmdParams) {
  const { msg, args, prefix } = params;

  const prefs = guildPrefs.get(msg.guild?.id as string) as GuildPrefs;

  if (args.length == 0)
    return msg.channel.send(`Prefix: \`${prefix}\`
Type \`${prefix}help\` for help.`);

  const guildMember = await msg.guild?.members.fetch(msg.author.id);
  if (!guildMember?.hasPermission('ADMINISTRATOR'))
    return msg.channel.send(
      'Only users with the `ADMINISTRATOR` permission can execute this command.',
    );

  if (args.length > 1) return msg.channel.send('Too many arguments. Usage: ' + docs.prefix.usage);

  guildPrefs.set(msg.guild?.id as string, {
    ...prefs,
    prefix: args[0],
  });

  return msg.channel.send(`Prefix upadated: \`${prefix} --> ${args[0]}\``);
}

namespace prefix {
  export const docs = {
    usage: 'prefix [newprefix]',
    args: {
      '[newprefix]': 'Set a new prefix. Requires administrator permissions.'
    },
    description: "Show this guild's prefix, or modify it (requires admin perms)",
    detailed:
      'Displays current prefix, or modifies the set prefix. Requester must have the `ADMINISTRATOR` permission to modify the prefix.',
  };
}

export = prefix;
