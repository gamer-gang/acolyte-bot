import axios from 'axios';
import * as ch from 'chalk';
import * as Discord from 'discord.js';
import * as dotenv from 'dotenv';
import * as path from 'path';
import messageHandler from './bot';
import { Store } from './store';
import { GuildPrefs } from './types';

dotenv.config();

export const client = new Discord.Client();

export const guildPrefs = new Store<GuildPrefs>({
  path: path.join(process.cwd(), 'data/guildprefs.json'),
  readImmediately: true,
  writeOnSet: true,
});

export let acolyteApi: AcolyteFightSettings;

// immediately invoked async function expression (iiafe)
(async function init() {
  client
    .on('ready', () => {
      console.log(ch`{green ${client.user?.tag} connected!}`);
      client.user?.setPresence({
        activity: {
          name: 'your mom',
          type: 'PLAYING',
        },
        status: 'online',
      });
    })
    .on('disconnect', () => {
      console.log(ch`Bot disconnected.`);
    })
    .on('debug', console.debug);

  client.on('message', messageHandler);
  client.login(process.env.TOKEN);

  acolyteApi = (await axios.get('https://acolytefight.io/api/default.acolytefight.json')).data;
})();
