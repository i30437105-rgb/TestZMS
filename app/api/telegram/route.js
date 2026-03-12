import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, message_id, group_message_id, answers, results, utm, bonusData, auditClicked, hostname } = body;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const groupChatId = process.env.TELEGRAM_GROUP_CHAT_ID;

    if (!botToken || !chatId) {
      return NextResponse.json(
        { error: 'Telegram credentials not configured' },
        { status: 500 }
      );
    }

    const message = buildMessage({ answers, results, utm, bonusData, auditClicked, hostname });

    // Отправка/редактирование в группе (ошибки не ломают основной поток)
    const groupRequest = async (text, editMsgId) => {
      if (!groupChatId) return null;
      try {
        const isEdit = !!editMsgId;
        const endpoint = isEdit ? 'editMessageText' : 'sendMessage';
        const payload = isEdit
          ? { chat_id: groupChatId, message_id: editMsgId, text, parse_mode: 'HTML' }
          : { chat_id: groupChatId, text, parse_mode: 'HTML' };
        const res = await fetch(`https://api.telegram.org/bot${botToken}/${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          console.error(`Telegram group ${endpoint} failed:`, { status: res.status, error: errData });
          return null;
        }
        const data = await res.json();
        return data.result?.message_id || null;
      } catch (err) {
        console.error('Telegram group fetch error:', err);
        return null;
      }
    };

    if (action === 'send') {
      // Отправляем в личку и группу параллельно
      const [response, groupMsgId] = await Promise.all([
        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML'
          })
        }),
        groupRequest(message, null)
      ]);

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
        message_id: data.result.message_id,
        group_message_id: groupMsgId
      });

    } else if (action === 'edit') {
      if (!message_id) {
        return NextResponse.json(
          { error: 'message_id required for edit' },
          { status: 400 }
        );
      }

      // Редактируем в личке и в группе параллельно
      const [response] = await Promise.all([
        fetch(`https://api.telegram.org/bot${botToken}/editMessageText`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            message_id: message_id,
            text: message,
            parse_mode: 'HTML'
          })
        }),
        groupRequest(message, group_message_id)
      ]);

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

function buildMessage({ answers, results, utm, bonusData, auditClicked, hostname }) {
  const sections = ['Стратегия', 'Лидген', 'Продажи'];

  // Квалификация
  const qualLines = [];
  if (answers && answers['К1']) qualLines.push(`Бизнес: ${escapeHtml(answers['К1'])}`);
  if (answers && answers['К2']) {
    const probs = Array.isArray(answers['К2']) ? answers['К2'].join(', ') : answers['К2'];
    qualLines.push(`Проблемы: ${escapeHtml(probs)}`);
  }
  if (answers && answers['К3']) qualLines.push(`Оборот: ${escapeHtml(answers['К3'])}`);

  // Зелёная и красная зоны
  const greenBlocks = [];
  const redBlocks = [];
  sections.forEach(section => {
    if (results && results.sections && results.sections[section]) {
      results.sections[section].blocks.forEach(block => {
        if (block.status === 'success') {
          greenBlocks.push(escapeHtml(block.title));
        } else {
          redBlocks.push(escapeHtml(block.title));
        }
      });
    }
  });

  const greenLine = greenBlocks.length > 0 ? greenBlocks.join(', ') : '—';
  const redLine = redBlocks.length > 0 ? redBlocks.join(', ') : '—';

  // Секция бонусов
  let bonusSection;
  if (bonusData && bonusData.name) {
    bonusSection = `✅ Бонусы получены\nИмя: ${escapeHtml(bonusData.name)}\nТелефон: ${escapeHtml(bonusData.phone)}`;
  } else {
    bonusSection = `⏳ Бонусы — ещё не запрошены`;
  }

  // Секция аудита
  let auditSection;
  if (auditClicked) {
    auditSection = `✅ Перешёл на сайт аудита`;
  } else {
    auditSection = `⏳ Аудит — не переходил`;
  }

  // UTM — компактная строка
  const utmParts = [];
  if (utm) {
    if (utm.source) utmParts.push(escapeHtml(utm.source));
    if (utm.medium) utmParts.push(escapeHtml(utm.medium));
    if (utm.campaign) utmParts.push(escapeHtml(utm.campaign));
  }
  const utmText = utmParts.length > 0 ? utmParts.join(' / ') : 'Прямой заход';

  const siteText = hostname ? escapeHtml(hostname) : '—';
  const now = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });

  return `🎯 <b>Новый лид — Тест ZMS</b>

${qualLines.join('\n')}

<b>Зелёная зона:</b>
${greenLine}

<b>Красная зона:</b>
${redLine}

* * *

${bonusSection}

${auditSection}

* * *

🔎 Источник: ${utmText}
🌐 Сайт: ${siteText}
⏰ ${now}`;
}
