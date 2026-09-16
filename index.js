require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const chatHistory = new Map();

const systemPrompt = {
    role: 'system',
    content: 'Kamu adalah asisten AI yang gaul, asik, humoris, dan pintar bernama Qwen. Jawablah menggunakan bahasa Indonesia sehari-hari yang santai, luwes, dan ramah seperti ngobrol sama teman nongkrong. Jangan kaku!'
};

let botUsername = '';
bot.getMe().then((me) => {
    botUsername = me.username;
    console.log(`Bot successfully connected as @${botUsername}`);
});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const chatType = msg.chat.type;

    console.log(`[DEBUG] Incoming message from ${chatType}: ${text}`);

    if (!text) return;

    if (chatType === 'group' || chatType === 'supergroup') {
        const isReplyToBot = msg.reply_to_message && msg.reply_to_message.from.username === botUsername;
        const isTagged = botUsername && text.toLowerCase().includes(`@${botUsername.toLowerCase()}`);
        const isCalledByName = text.toLowerCase().includes('mashu');

        if (!isReplyToBot && !isTagged && !isCalledByName) {
            return;
        }
    }

    if (!chatHistory.has(chatId)) {
        chatHistory.set(chatId, [systemPrompt]);
    }

    const history = chatHistory.get(chatId);
    history.push({ role: 'user', content: text });

    if (history.length > 11) {
        history.splice(1, 2);
    }

    try {
        bot.sendChatAction(chatId, 'typing');

        const response = await fetch('http://localhost:11434/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'qwen2.5:3b',
                messages: history,
                stream: false
            })
        });

        const data = await response.json();
        const aiReply = data.message.content;

        history.push({ role: 'assistant', content: aiReply });

        const sendOptions = (chatType === 'group' || chatType === 'supergroup')
            ? { reply_to_message_id: msg.message_id }
            : {};

        bot.sendMessage(chatId, aiReply, sendOptions);

    } catch (error) {
        console.error("AI Error:", error.message);
        bot.sendMessage(chatId, "Waduh, AI-nya lagi pusing atau Ollama belum nyala nih mas.");
    }
});

console.log("Local AI Bot is running and ready to receive messages!");