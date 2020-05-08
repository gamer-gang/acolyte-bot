import { docs } from '.';
import { acolyteApi as api } from '..';
import { CustomEmbed } from '../common/embed';
import { CmdParams } from '../types';

const spellName: Array<string> = [];

export async function spell(params: CmdParams) {
  if (spellName.length === 0) {
    for (const key of Object.keys(api.Spells)) {
      const name = api.Spells[key].name;
      if (name) spellName.push(name.toLowerCase());
    }
  }

  const { msg, args, prefix } = params;
  const embed = new CustomEmbed();

  if (args.length === 0)
    return msg.channel.send('Not enough arguments. Usage: ' + prefix + docs.spell.usage);

  if (
    !Object.prototype.hasOwnProperty.call(api.Spells, args[0]) &&
    !spellName.some(v => v.toLowerCase() === args[0])
  )
    return msg.channel.send('Invalid spell.');

  embed.setTitle(args).setDescription('Hello, this is a slick embed!');

  msg.channel.send(embed);
}
