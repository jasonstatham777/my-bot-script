const { Telegraf } = require('telegraf');

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
    console.error("КРИТИЧЕСКАЯ ОШИБКА: TELEGRAM_BOT_TOKEN не найден в Secrets!");
    process.exit(1);
}

const gameShortName = 'cherkashidzerun';
const gameUrl = 'https://jasonstatham777.github.io/cherkashidze-game/';

const bot = new Telegraf(token);

bot.command(['start', 'game'], (ctx) => {
    return ctx.replyWithGame(gameShortName);
});

bot.on('callback_query', (ctx) => {
    return ctx.answerCbQuery('', { url: gameUrl });
});

bot.launch();

console.log(`Бот для игры "${gameShortName}" на Telegraf успешно запущен!`);

const http = require('http');
http.createServer((req, res) => {
    res.write("I'm alive");
    res.end();
}).listen(8080);
