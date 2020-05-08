import { CmdParams } from '../types';
import { about } from './about';
import { help } from './help';
import { prefix } from './prefix';
import { prefs } from './prefs';
import { spell } from './spell';

export default { help, prefs, prefix, spell, about } as {
  [command: string]: (params: CmdParams) => any;
};

export const docs: {
  [command: string]: { usage: string; description: any; detailed: string };
} = {
  about: {
    usage: 'about',
    description: 'Show bot info',
    detailed: 'Shows information about authors, source code, and other useful stuff.',
  },
  help: {
    usage: 'help [command]',
    description: 'Show all commands, or show detailed help for a specific command',
    detailed:
      'If called with no arguments, shows a list of all availible commands. If called with one argument, displays detailed help for that command (like this). Command prefix can be configured using the `prefix` command.',
  },
  prefs: {
    usage: 'prefs',
    description: "List this server's preferences",
    detailed: "Displays stored cofiguration for the requester's guild in JSON format.",
  },
  prefix: {
    usage: 'prefix [newprefix]',
    description: "Show this guild's prefix, or modify it (requires `ADMINISTRATOR` permission)",
    detailed:
      'If called with no arguments, displays current prefix. If called with one argument, modifies the guild configuration with the provided argument. Requester must have the `ADMINISTRATOR` permission, otherwise an errow will be thrown.',
  },
  spell: {
    usage: 'spell <id|name>',
    description: 'Show the stats of a spell',
    detailed:
      'Displays detailed data from the default Acolyte Fight configuration file. A spell name (e.g. `gravity`) or  spell ID (e.g. `ensnare`) can be provided; both will show the same result.',
  },
};
