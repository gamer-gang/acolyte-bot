import * as Discord from 'discord.js';

export interface GuildPrefs {
  prefix: string;
}

/** All availble paramaters passed to a command handler. */
export interface CmdParams {
  /**
   * Request message
   * Use this to send a message back (`msg.channel.send()`).
   */
  msg: Discord.Message;
  /**
   * An array of all the provided arguments, in the order provided.
   */
  args: Array<string>;
  /**
   * Prefix; specific to a guild.
   */
  prefix: string;
  /**
   * An array of all provided flags (start with `--`), in the order provided.
   */
  flags: Array<string>;
}

// export interface Spell {
//   action: string;
// }

/**
 * Command information to show in Discord, by calling the `help` command.
 */
export interface Documentation {
  /**
   * Full command usage, including required and optional arguments.
   *
   * Required arguments are marked with `<angle brackets>`;
   * optional ones are marked with `[square brackets]`.
   * Flags are allowed anywhere, always optional, and will be filtered out of the argument list.
   *
   * An ellipsis (`...`) marks that multiple arguments are allowed.
   *
   * Examples:
   * ```js
   * // valid usage: 'command --flag1 arg1 --flag2'
   * usage: 'command <required arg> [optional arg]'
   *
   * // valid usage: 'command arg1 --flag2 arg2 arg3 arg4 arg5'
   * usage: 'command <required arg> [optional arg] [optional arg]...'
   * ```
   */
  usage: string;
  /**
   * A short description of the command.
   *
   * Verbs should be in the base form (no prefix/suffix).
   *
   * Example:
   * ```js
   * description: 'Show the stats of a player'
   * ```
   */
  description: any;
  /**
   * A longer description of the command.
   *
   * Verbs should be in the present form (usually 'base + s').
   *
   * Example:
   * ```js
   * detailed: 'Shows stats of a player, given the ID of the player. IDs can be found on the website, under the leaderboards.'
   * ```
   */
  detailed: string;
  /**
   * An object of the allowed arguments of the command.
   *
   * Required args are surrounded by `<angle brackets>`;
   * optional ones are surrounded by `[square brackets]`.
   *
   * Example:
   * ```js
   * '<file>': 'File to create.'
   * '[content]': 'Content to write to the file.'
   * ```
   */
  args?: {
    [arg: string]: string;
  };
  /**
   * An object of the allowed flags of the command. All flags are optional.
   *
   * Flags are denoted by the starting double dash (e.g. `--force`).
   *
   * Example:
   * ```js
   * '--color': 'Output with color.`
   * ```
   */
  flags?: {
    [flag: string]: string;
  };
}
