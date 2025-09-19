const TelegramBot = require('node-telegram-bot-api');

// --- ВАШИ ДАННЫЕ ---
// Токен теперь берется из безопасного хранилища на сервере, а не из кода
const token = process.env.TELEGRAM_BOT_TOKEN;
const gameShortName = 'bananarun'; // <-- ВАШЕ КОРОТКОЕ ИМЯ ИГРЫ ИЗ ШАГА 2
const gameUrl = 'https://ВАШ_НИКНЕЙМ.github.io/banana-runner-game/'; // <-- ВАША ССЫЛКА НА ИГРУ ИЗ ШАГА 1
// --------------------

// Проверка, что токен был предоставлен
if (!token) {
  console.error('Ошибка: TELEGRAM_BOT_TOKEN не найден! Убедитесь, что вы добавили его в Environment Variables на Render.');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendGame(msg.chat.id, gameShortName);
});

bot.on('callback_query', function onCallbackQuery(callbackQuery) {
  bot.answerCallbackQuery(callbackQuery.id, { url: gameUrl });
});

console.log(`Бот для игры "${gameShortName}" успешно запущен!`);