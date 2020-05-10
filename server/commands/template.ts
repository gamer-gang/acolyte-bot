import { CmdParams, Documentation } from '../types';

// function that handles that command
async function command(params: CmdParams) {
  // you can pull out the message from `params`
  const { msg, args, flags, prefix } = params;
  // your logic here
}

// name must match above function
namespace command {
  // write docs here (see `types.ts` for more info)
  // export this
  export const docs: Documentation = {
    usage: 'command [FLAGS] <required arg> [optional arg]',
    args: {
      '<required arg>': 'Argument description',
      '[optional arg]': 'Argument description',
    },
    flags: {
      '--booleanFlag': 'Flag description',
      '--otherFlag=value': 'Flag description',
    },
    description: 'A short description (use verbs in their base form, e.g. show, display)',
    detailed: 'A longer explanaition, (use verbs in their present form shows, displays)',
  };
}

// don't forget to export the merged declaration
export = command;
