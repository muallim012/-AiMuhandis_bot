const { Telegraf } = require('telegraf');
const Groq = require('groq-sdk');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

bot.start((ctx) => ctx.reply('Assalomu alaykum! Men Ai Muhandis botiman. Qanday yordam bera olaman?'));

bot.on('text', async (ctx) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: ctx.message.text }],
      model: 'llama-3.3-70b-versatile',
    });
    ctx.reply(chatCompletion.choices[0].message.content);
  } catch (error) {
    console.error(error);
    ctx.reply('Xatolik yuz berdi, iltimos keyinroq urinib koʻring.');
  }
});

bot.launch();
