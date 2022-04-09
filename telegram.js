import creds from './creds';
import config from './config';
import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot(creds.telegramToken, {polling: true});

function sendMessage(message) {
    bot.sendMessage(config.channelId, message, {disable_web_page_preview: true});
}

module.exports = { sendMessage }