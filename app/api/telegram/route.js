import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { contactData, answers, results } = await request.json();

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return NextResponse.json(
        { error: 'Telegram credentials not configured' },
        { status: 500 }
      );
    }

    const { name, phone, email } = contactData;
    const sections = ['Стратегия', 'Лидген', 'Продажи'];

    // Квалификация
    const qualAnswers = [];
    if (answers['К1']) qualAnswers.push(`Бизнес: ${answers['К1']}`);
    if (answers['К2']) {
      const probs = Array.isArray(answers['К2']) ? answers['К2'].join(', ') : answers['К2'];
      qualAnswers.push(`Проблемы: ${probs}`);
    }
    if (answers['К3']) qualAnswers.push(`Оборот: ${answers['К3']}`);

    // Собираем все блоки с результатами
    const allBlocks = [];
    let blockNumber = 1;
    sections.forEach(section => {
      results.sections[section].blocks.forEach(block => {
        const status = block.status === 'success' ? 'ДА' : 'НЕТ';
        allBlocks.push(`${blockNumber}. ${block.title} - ${status}`);
        blockNumber++;
      });
    });

    const message = `🎯 *Новый результат аудита!*

👤 *Контакт:*
Имя: ${name || 'Не указано'}
Телефон: ${phone || 'Не указан'}
Email: ${email || 'Не указан'}

📋 *Квалификация:*
${qualAnswers.join('\n')}

📍 *Результаты:*
${allBlocks.join('\n')}

🔎 *Источник трафика:*
Не отслеживается

⏰ ${new Date().toLocaleString('ru-RU')}`;

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Telegram API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });

      if (response.status === 401) {
        return NextResponse.json(
          { error: 'Неверный токен Telegram бота' },
          { status: 401 }
        );
      } else if (response.status === 400) {
        return NextResponse.json(
          { error: 'Неверный формат сообщения' },
          { status: 400 }
        );
      } else if (response.status === 429) {
        return NextResponse.json(
          { error: 'Превышен лимит запросов. Попробуйте позже' },
          { status: 429 }
        );
      } else {
        return NextResponse.json(
          { error: `Ошибка Telegram API: ${response.status}` },
          { status: response.status }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Telegram sending error:', error);
    return NextResponse.json(
      { error: error.message || 'Ошибка отправки' },
      { status: 500 }
    );
  }
}
