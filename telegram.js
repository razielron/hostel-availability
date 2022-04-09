import creds from './creds';
import config from './config';
import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot(creds.telegramToken, {polling: true});

function send(messageObj) {
    console.log({messageObj});
    let message = '';

    for(let [key, value] of Object.entries(messageObj)) {
        message += `${key}: ${value}\n`;
    }
    console.log({message})
    bot.sendMessage(config.channelId, message, {disable_web_page_preview: true});
}

module.exports = { send }