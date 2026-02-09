import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, message_id, answers, results, utm, bonusData, auditClicked } = body;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return NextResponse.json(
        { error: 'Telegram credentials not configured' },
        { status: 500 }
      );
    }

    const message = buildMessage({ answers, results, utm, bonusData, auditClicked });

    if (action === 'send') {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML'
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Telegram API error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        return NextResponse.json(
          { error: `Ошибка Telegram API: ${response.status}` },
          { status: response.status }
        );
      }

      const data = await response.json();
      return NextResponse.json({
        success: true,
        message_id: data.result.message_id
      });

    } else if (action === 'edit') {
      if (!message_id) {
        return NextResponse.json(
          { error: 'message_id required for edit' },
          { status: 400 }
        );
      }

      const response = await fetch(`https://api.telegram.org/bot${botToken}/editMessageText`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          message_id: message_id,
          text: message,
          parse_mode: 'HTML'
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Telegram edit error:', {
          status: response.status,
          error: errorData
        });
        return NextResponse.json(
          { error: `Ошибка редактирования: ${response.status}` },
          { status: response.status }
        );
      }

      return NextResponse.json({ success: true });

    } else {
      return NextResponse.json(
        { error: 'Invalid action. Use "send" or "edit"' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Telegram sending error:', error);
    return NextResponse.json(
      { error: error.message || 'Ошибка отправки' },
      { status: 500 }
    );
  }
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildMessage({ answers, results, utm, bonusData, auditClicked }) {
  const sections = ['Стратегия', 'Лидген', 'Продажи'];

  // Квалификация
  const qualLines = [];
  if (answers && answers['К1']) qualLines.push(`Бизнес: ${escapeHtml(answers['К1'])}`);
  if (answers && answers['К2']) {
    const probs = Array.isArray(answers['К2']) ? answers['К2'].join(', ') : answers['К2'];
    qualLines.push(`Проблемы: ${escapeHtml(probs)}`);
  }
  if (answers && answers['К3']) qualLines.push(`Оборот: ${escapeHtml(answers['К3'])}`);

  // Блоки результатов
  let blockNumber = 1;
  const blockLines = [];
  sections.forEach(section => {
    blockLines.push(`\n<b>${section}:</b>`);
    if (results && results.sections && results.sections[section]) {
      results.sections[section].blocks.forEach(block => {
        const icon = block.status === 'success' ? '✅' : '❌';
        blockLines.push(`  ${blockNumber}. ${escapeHtml(block.title)} — ${icon}`);
        blockNumber++;
      });
    }
  });

  // Секция бонусов
  let bonusSection;
  if (bonusData && bonusData.name) {
    bonusSection = `✅ <b>БОНУСЫ ПОЛУЧЕНЫ</b>\nИмя: ${escapeHtml(bonusData.name)}\nTelegram: ${escapeHtml(bonusData.telegram)}`;
  } else {
    bonusSection = `⏳ <b>БОНУСЫ</b>\nЕщё не запрошены`;
  }

  // Секция аудита
  let auditSection;
  if (auditClicked) {
    auditSection = `✅ <b>ЗАПИСАЛСЯ НА АУДИТ</b>`;
  } else {
    auditSection = `⏳ <b>АУДИТ</b>\nЕщё не записался`;
  }

  // UTM-метки
  const utmLines = [];
  if (utm) {
    if (utm.source) utmLines.push(`utm_source: ${escapeHtml(utm.source)}`);
    if (utm.medium) utmLines.push(`utm_medium: ${escapeHtml(utm.medium)}`);
    if (utm.campaign) utmLines.push(`utm_campaign: ${escapeHtml(utm.campaign)}`);
    if (utm.content) utmLines.push(`utm_content: ${escapeHtml(utm.content)}`);
    if (utm.term) utmLines.push(`utm_term: ${escapeHtml(utm.term)}`);
  }
  const utmText = utmLines.length > 0 ? utmLines.join('\n') : 'Прямой заход';

  const now = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });

  return `🎯 <b>Новый лид — Тест ZMS</b>

━━━━━━━━━━━━━━━━━━━━━━

✅ <b>ТЕСТ ПРОЙДЕН</b>

📋 <b>Квалификация:</b>
${qualLines.join('\n')}

📍 <b>Результаты по блокам:</b>
${blockLines.join('\n')}

━━━━━━━━━━━━━━━━━━━━━━

${bonusSection}

━━━━━━━━━━━━━━━━━━━━━━

${auditSection}

━━━━━━━━━━━━━━━━━━━━━━

🔎 <b>Источник трафика:</b>
${utmText}

⏰ ${now}`;
}
