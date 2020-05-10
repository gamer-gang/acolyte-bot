import * as Discord from 'discord.js';
import { acolyteApi as api } from '..';
import { CustomEmbed } from '../common/embed';
import { yaml } from '../common/util';
import { CmdParams } from '../types';
import { docs } from '.';

const spellNames: Array<string> = [];

async function spell(params: CmdParams) {
  if (spellNames.length === 0) {
    for (const key of Object.keys(api.Spells)) {
      const name = api.Spells[key].name;
      if (name) spellNames.push(name.toLowerCase());
    }
  }

  const { msg, args, prefix, flags } = params;

  if (args.length === 0)
    return msg.channel.send(`Not enough arguments. Usage: \`${prefix}${docs.usage}\``);

  if (
    !Object.prototype.hasOwnProperty.call(api.Spells, args[0]) &&
    !spellNames.some(v => v.toLowerCase() === args[0])
  )
    return msg.channel.send('Invalid spell.');

  const spell = Object.prototype.hasOwnProperty.call(api.Spells, args[0])
    ? api.Spells[args[0]]
    : Object.values(api.Spells).filter(spell => (spell.name = args[0]))[0];

  if (flags.some(v => v === '--dm')) return dm(msg, spell);

  msg.channel.send(new CustomEmbed().setTitle('Spell: ' + args[0]).setDescription(yaml(spell)));
}

async function dm(msg: Discord.Message, spell: Spell) {
  const data = yaml(spell, false);
  let messages = data
    .match(/(.|\n){1,1900}\n/g)
    ?.map(message => '```yaml\n' + message + '```') as Array<string>;

  let modified = `Data for spell \`${spell.name}\``;
  if (messages.length > 1)
    modified +=
      '\n*The data was split into two or more messages due to the 2000 character limit imposed by Discord.*';
  msg.author
    .createDM()
    .then(dm => {
      dm.send(modified);
      return dm;
    })
    .then(async dm => {
      for (const message of messages) await dm.send(message);
      msg.channel.send(`<@${msg.author.id}> ok`);
    })
    .catch(err => {
      console.error(err);
      msg.channel.send(`<@${msg.author.id}> error`);
    });
}

namespace spell {
  export const docs = {
    usage: 'spell <id|name>',
    args: {
      '<id|name>': 'ID/Name of the spell to display.'
    },
    description: 'Show the stats of a spell',
    detailed:
      'Displays detailed data from the default Acolyte Fight configuration file. A spell name (e.g. `gravity`) or  spell ID (e.g. `ensnare`) can be provided; both will show the same result.',
  };
}

export = spell;
