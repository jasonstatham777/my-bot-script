const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');

// === ДАННЫЕ ===
const token = process.env.TELEGRAM_BOT_TOKEN;
const gameShortName = 'cherkashidzerun';
const gameUrl = 'https://jasonstatham777.github.io/cherkashidze-game/';
// ==============

const bot = new TelegramBot(token, { polling: true });
const app = express();
app.use(bodyParser.json());

// В этом объекте будем хранить message_id для каждого чата
const gameMessages = {};

// Обработка /start и /game
bot.onText(/^\/(start|game)/, (msg) => {
    bot.sendGame(msg.chat.id, gameShortName).then(sent => {
        // Сохраняем сообщение, чтобы потом обновлять очки
        gameMessages[msg.chat.id] = sent.message_id;
    });
});

// Когда пользователь жмёт "Играть"
bot.on('callback_query', (callbackQuery) => {
    bot.answerCallbackQuery(callbackQuery.id, { url: gameUrl });
});

// === Роут для сохранения очков ===
app.post('/setscore', (req, res) => {
    const { user_id, score, chat_id } = req.body;

    const messageId = gameMessages[chat_id];
    if (!messageId) {
        return res.status(400).send({ ok: false, error: "Message not found" });
    }

    bot.setGameScore(user_id, score, { chat_id, message_id: messageId, force: true })
        .then(() => res.send({ ok: true }))
        .catch(err => {
            console.error(err);
            res.status(500).send({ ok: false, error: err.toString() });
        });
});

// --- Часть, чтобы Replit не засыпал ---
app.get('/', (req, res) => res.send("I'm alive"));
app.listen(8080, () => console.log("Server running on port 8080"));
