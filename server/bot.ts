import * as ch from 'chalk';
import * as Discord from 'discord.js';
import { guildPrefs } from '.';
import commands from './commands';
import { GuildPrefs } from './types';
import { Timer } from './common/util';

const defaultPrefs: GuildPrefs = {
  prefix: '%',
};

let previousDuration = 0;

export default async function (msg: Discord.Message) {
  const timerId = ch`{green Processing message ${msg.id} took}`;

  const timer = new Timer();

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

  if (Object.prototype.hasOwnProperty.call(commands, cmd))
    await commands[cmd]({ msg, args, prefix, flags });
  else if (cmd === 'duration')
    msg.channel.send(`Previous command took ${previousDuration.toFixed(3)}ms.`);
  else msg.channel.send('No command executed.');

  timer.end();

  previousDuration = timer.duration as number;

  console.log(
    ch`{green Processing for message ${msg.id} (${cmd}, [${args.join(', ')}], [${flags.join(
      ', ',
    )}]) completed in ${timer.duration}ms.}`,
  );
}
