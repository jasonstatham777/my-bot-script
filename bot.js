const TelegramBot = require('node-telegram-bot-api');

// --- ВАШИ ДАННЫЕ ---
const token = process.env.TELEGRAM_BOT_TOKEN;
const gameShortName = 'cherkashidzerun'; // <-- Ваше короткое имя
const gameUrl = 'https://jasonstatham777.github.io/cherkashidze-game/'; // <-- Ваша ссылка на игру
// --------------------

const bot = new TelegramBot(token, { polling: true });

// Эта функция теперь будет обрабатывать команды /start и /game
const sendGame = (chatId) => {
  bot.sendGame(chatId, gameShortName);
};

// Отвечаем на команды в личных сообщениях и группах
bot.onText(/\/start/, (msg) => {
  sendGame(msg.chat.id);
});

bot.onText(/\/game/, (msg) => {
  sendGame(msg.chat.id);
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
