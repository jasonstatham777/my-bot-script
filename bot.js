const TelegramBot = require('node-telegram-bot-api');

// --- ВАШИ ДАННЫЕ ---
const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
    console.error("КРИТИЧЕСКАЯ ОШИБКА: TELEGRAM_BOT_TOKEN не найден в Secrets!");
    process.exit(1);
}

const gameShortName = 'cherkashidzerun'; // <-- Ваше короткое имя игры
const gameUrl = 'https://jasonstatham777.github.io/cherkashidze-game/'; // <-- Ваша ссылка на игру
// --------------------

const bot = new TelegramBot(token, { polling: true });

// --- УНИВЕРСАЛЬНЫЙ ОБРАБОТЧИК КОМАНД ---
// Этот код теперь ловит ЛЮБОЕ сообщение, которое начинается с /start ИЛИ /game
bot.onText(/^\/(start|game)/, (msg) => {
    // msg.chat.id - это ID чата, откуда пришла команда (личного или группового)
    bot.sendGame(msg.chat.id, gameShortName);
});

// Этот обработчик для нажатия на кнопку "Play"
bot.on('callback_query', function onCallbackQuery(callbackQuery) {
    bot.answerCallbackQuery(callbackQuery.id, { url: gameUrl });
});

console.log(`Бот для игры "${gameShortName}" успешно запущен и готов к работе!`);

// --- Часть кода, чтобы бот не "засыпал" ---
const http = require('http');
http.createServer(function (req, res) {
    res.write("I'm alive");
    res.end();
}).listen(8080);
