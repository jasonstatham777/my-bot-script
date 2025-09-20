const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;
const gameShortName = 'cherkashidzerun'; // <-- Ваше короткое имя
const gameUrl = 'https://jasonstatham777.github.io/cherkashidze-game/'; // <-- Ваша ссылка на игру
// --------------------

const bot = new TelegramBot(token, { polling: true });

// Этот обработчик теперь ловит ОБЕ команды: /start и /game
bot.onText(/\/(start|game)/, (msg) => {
  bot.sendGame(msg.chat.id, gameShortName);
});

// Этот обработчик для нажатия на кнопку "Play"
bot.on('callback_query', function onCallbackQuery(callbackQuery) {
  bot.answerCallbackQuery(callbackQuery.id, { url: gameUrl });
});

console.log(`Бот для игры "${gameShortName}" успешно запущен!`);

// --- Часть кода, чтобы бот не "засыпал" ---
const http = require('http');
http.createServer(function (req, res) {
  res.write("I'm alive");
  res.end();
}).listen(8080);
