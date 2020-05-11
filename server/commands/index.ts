import { CmdParams, Documentation } from '../types';

// To add a new command:
// 1. write your command and documentation as shown in `template.ts`

// 2. Import it as a namespace
import * as about from './about';
import * as help from './help';
import * as prefix from './prefix';
import * as prefs from './prefs';
import * as spell from './spell';

// 3. Export it in this object
export default { help, prefs, prefix, spell, about } as {
  [command: string]: (params: CmdParams) => Promise<any>;
};

// 4. Add it to the docs object
export const docs: { [command: string]: Documentation } = {
  about: about.docs,
  help: help.docs,
  prefs: prefs.docs,
  prefix: prefix.docs,
  spell: spell.docs,
};
