import { docs } from '.';
import { guildPrefs } from '..';
import { CmdParams, GuildPrefs } from '../types';

export async function prefix(params: CmdParams) {
  const { msg, args, prefix } = params;

  const prefs = guildPrefs.get(msg.guild?.id as string) as GuildPrefs;

  if (args.length == 0)
    return msg.channel.send(`Prefix: \`${prefix}\`
Type \`${prefix}help\` for help.`);

  const guildMember = await msg.guild?.members.fetch(msg.author.id);
  if (!guildMember?.hasPermission('ADMINISTRATOR'))
    return msg.channel.send('Only users with the `ADMINISTRATOR` permission can execute this command.');

  if (args.length > 1) return msg.channel.send('Too many arguments. Usage: ' + docs.prefix.usage);

  guildPrefs.set(msg.guild?.id as string, {
    ...prefs,
    prefix: args[0],
  });

  return msg.channel.send(`Prefix upadated: \`${prefix} --> ${args[0]}\``)
}
