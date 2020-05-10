import * as Discord from 'discord.js';
import { guildPrefs } from '.';
import { GuildPrefs } from './types';
import commands from './commands';

const defaultPrefs: GuildPrefs = {
  prefix: '%',
};

export default async function (msg: Discord.Message) {
  const guildId = msg.guild?.id;

  if (msg.author.bot) return; // do not respond to other bots
  if (!guildId) return; // do not respond to DMs

  // set default config
  guildPrefs.setIfUnset(guildId, defaultPrefs);

  const prefix = guildPrefs.get(guildId)?.prefix as string;

  // make sure message starts with prefix
  if (!msg.content.trim().startsWith(prefix)) return;

  const args = msg.content
    .trim() //                  trim            ("  % foo  bar " => "% foO  bAr")
    .substr(prefix.length) //   remove prefix     ("% foO  bAr"  => " foO  bAr")
    .trim() //                  trim agin           (" foO  bAr" => "foO  bAr")
    .toLowerCase() //           make lowercase       ("foO  bAr" => "foo  bar")
    .replace(/ +(?= )/g, '') // remove double spaces ("foo  bar" => "foo bar")
    .split(' '); //             separate into args    ("foo bar" => ["foo", "bar"])

  // exit if none, like "%"
  if (args.length === 0) return;

  const cmd = args.shift() as string;
  const flags = args.filter(v => v.startsWith('--'));
  flags.forEach(v => args.splice(args.indexOf(v), 1));

  msg.channel.send(
    `Got command \`${cmd != '' ? cmd : '(none)'}\`, ` +
    `arguments \`[${args.join(', ')}]\`, ` +
    `and flags \`[${flags.join(', ')}]\``,
  );

  if (Object.prototype.hasOwnProperty.call(commands, cmd)) commands[cmd]({ msg, args, prefix, flags });
  else msg.channel.send('No command executed.');
}
