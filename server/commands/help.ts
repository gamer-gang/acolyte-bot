import commands, { docs } from '.';
import { CustomEmbed } from '../common/embed';
import { CmdParams } from '../types';

export async function help(params: CmdParams) {
  const { msg, prefix, args } = params;
  const embed = new CustomEmbed();

  if (args.length === 0) {
    embed.setTitle('Help').setColor(0xff0000).setDescription(`Prefix: \`${prefix}\``);

    for (const command of Object.keys(commands)) {
      embed.addField(
        `\`${prefix}${docs[command].usage}\``,
        docs[command].description,
        false,
      );
    }
  } else if (args.length === 1) {
    const doc = docs[args[0]];
    if (!doc) return msg.channel.send(`No help found for command \`${args[0]}\`.`);

    embed
      .setTitle(`Help: \`${args[0]}\``)
      .setDescription(`Usage: \`${prefix}${doc.usage}\`\n\n${doc.detailed}`);
  }

  return msg.channel.send(embed);
}
