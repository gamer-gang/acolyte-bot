import { MessageEmbed, MessageEmbedOptions } from 'discord.js';

export class CustomEmbed extends MessageEmbed {
  constructor(data?: MessageEmbedOptions) {
    super(data);

    this
      .setAuthor('Acolyte Bot')
      .setColor(0x7ac7f1)
      .setFooter('footer');
  }
}
