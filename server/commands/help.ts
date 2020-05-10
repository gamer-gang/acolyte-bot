import commands, { docs } from '.';
import { CustomEmbed } from '../common/embed';
import { CmdParams, Documentation } from '../types';

async function help(params: CmdParams) {
  const { msg, prefix, args } = params;
  const embed = new CustomEmbed();

  if (args.length === 0) {
    embed.setTitle('Help').setColor(0xff0000).setDescription(`Prefix: \`${prefix}\``);

    for (const command of Object.keys(commands)) {
      embed.addField(`\`${prefix}${docs[command].usage}\``, docs[command].description, false);
    }
  } else if (args.length === 1) {
    const doc = docs[args[0]];
    if (!doc) return msg.channel.send(`No help found for command \`${args[0]}\`.`);

    embed
      .setTitle(`Help: \`${args[0]}\``)
      .setDescription(
        `Usage: \`${prefix}${doc.usage}\`\n\n${doc.detailed}\n${
          (doc.args || doc.flags) ? '\u200b\n**Options**' : ''
        }`,
      );

    Object.keys(doc.args ?? {}).forEach(arg => {
      embed.addField(`\`${arg}\``, doc.args ? doc.args[arg] : '');
    });

    Object.keys(doc.flags ?? {}).forEach(flag => {
      embed.addField(`\`${flag}\``, doc.flags ? doc.flags[flag] : '');
    });
  }

  return msg.channel.send(embed);
}

namespace help {
  export const docs: Documentation = {
    usage: 'help [command]',
    args: {
      '[command]': 'See help for a specific command.',
    },
    description: 'Show all commands, or show detailed help for a specific command',
    detailed: `Shows a list of all availible commands, or displays detailed help for a command (like this).
Command prefix can be configured using the \`prefix\` command.`,
  };
}

export = help;
