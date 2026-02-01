'use client';
import { checkpoints, preCheckpointMessages, motivationalMessages } from '../data/gamification';

// Маппинг иконок на PNG
const iconPaths = {
  'Предприниматель': '/icons/flag.png',
  'Стойкий основатель': '/icons/bicep.png',
  'Железная воля': '/icons/shield.png',
  'Целеустремлённый лидер': '/icons/trophy.png'
};

export function ProgressBar({ currentQuestion, totalQuestions }) {
  // Прогресс от 4% (вопрос 1) до 100% (вопрос 25)
  const progress = (currentQuestion / totalQuestions) * 100;

  // Позиции чекпоинтов на линии (в процентах)
  const checkpointPositions = [
    { pos: 0, question: 1, title: 'Предприниматель', icon: '/icons/flag.png' },
    { pos: 44, question: 11, title: 'Стойкий основатель', icon: '/icons/bicep.png' },
    { pos: 76, question: 19, title: 'Железная воля', icon: '/icons/shield.png' },
    { pos: 100, question: 25, title: 'Целеустремлённый лидер', icon: '/icons/trophy.png' }
  ];

  // Границы сегментов для трёхцветной схемы
  const segment1End = 44; // Зелёный: 0-44%
  const segment2End = 76; // Жёлтый: 44-76%
  // Красный: 76-100%

  // Текущий и следующий чекпоинт
  const currentCheckpoint = checkpoints.filter(c => currentQuestion >= c.question).pop();
  const nextCheckpoint = checkpoints.find(c => c.question > currentQuestion);
  const questionsToNext = nextCheckpoint ? nextCheckpoint.question - currentQuestion : 0;

  // Проверка активности иконки (рубеж достигнут на вопросе чекпоинта)
  const isIconActive = (checkpointQuestion) => {
    if (checkpointQuestion === 1) return true; // Флаг всегда активен
    return currentQuestion >= checkpointQuestion;
  };

  return (
    <div style={{ paddingTop: '16px' }} role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin="0" aria-valuemax="100" aria-label={`Прогресс теста: ${Math.round(progress)} процентов`}>
      {/* Иконки и прогресс-бар */}
      <div style={{ position: 'relative', height: '70px', marginBottom: '12px' }}>

        {/* Иконки над линией */}
        {checkpointPositions.map((cp, idx) => {
          const active = isIconActive(cp.question);
          return (
            <div key={idx} style={{
              position: 'absolute',
              left: `${cp.pos}%`,
              top: 0,
              transform: 'translateX(-50%)',
              zIndex: 3
            }}>
              <img
                src={cp.icon}
                alt={cp.title}
                style={{
                  width: '32px',
                  height: '32px',
                  filter: active ? 'none' : 'grayscale(100%) opacity(0.5)',
                  transition: 'filter 0.3s ease'
                }}
              />
            </div>
          );
        })}

        {/* Линия прогресса */}
        <div style={{
          position: 'absolute',
          top: '50px',
          left: '0',
          right: '0',
          height: '8px',
          background: '#d1d5db',
          borderRadius: '4px',
          overflow: 'visible'
        }}>
          {/* Зелёный сегмент (0-44%) */}
          {progress > 0 && (
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${Math.min(progress, segment1End)}%`,
              background: '#22c55e',
              borderRadius: '4px 0 0 4px',
              transition: 'width 0.3s ease'
            }} />
          )}

          {/* Жёлтый сегмент (44-76%) */}
          {progress > segment1End && (
            <div style={{
              position: 'absolute',
              left: `${segment1End}%`,
              top: 0,
              height: '100%',
              width: `${Math.min(progress - segment1End, segment2End - segment1End)}%`,
              background: '#eab308',
              transition: 'width 0.3s ease'
            }} />
          )}

          {/* Красный сегмент (76-100%) */}
          {progress > segment2End && (
            <div style={{
              position: 'absolute',
              left: `${segment2End}%`,
              top: 0,
              height: '100%',
              width: `${Math.min(progress - segment2End, 100 - segment2End)}%`,
              background: '#ef4444',
              borderRadius: '0 4px 4px 0',
              transition: 'width 0.3s ease'
            }} />
          )}

          {/* Круглые маркеры под иконками */}
          {checkpointPositions.map((cp, idx) => {
            // Определяем цвет маркера по позиции и прогрессу
            let markerColor = '#d1d5db';
            if (progress >= cp.pos) {
              if (cp.pos <= segment1End) markerColor = '#22c55e';
              else if (cp.pos <= segment2End) markerColor = '#eab308';
              else markerColor = '#ef4444';
            }

            return (
              <div key={idx} style={{
                position: 'absolute',
                left: `${cp.pos}%`,
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: markerColor,
                border: '3px solid #f5f5f7',
                zIndex: 2,
                transition: 'background 0.3s ease'
              }} />
            );
          })}
        </div>
      </div>

      {/* Строка 1: процент и номер вопроса */}
      <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: '13px', color: '#7a7f8a', textAlign: 'left', marginBottom: '4px' }}>
        <span style={{ color: '#1a1a2e', fontWeight: 600 }}>{Math.round(progress)}%</span> пройдено • Вопрос {currentQuestion} из {totalQuestions}
      </div>

      {/* Строка 2: текущий уровень и до следующего рубежа */}
      {currentCheckpoint && nextCheckpoint && (
        <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: '13px', color: '#7a7f8a', textAlign: 'left' }}>
          <span style={{ color: '#22c55e' }}>{currentCheckpoint.title}</span>
          <span> • До рубежа </span>
          <span style={{ color: '#1a1a2e' }}>{nextCheckpoint.title}</span>
          <span>: {questionsToNext} {questionsToNext === 1 ? 'вопрос' : questionsToNext < 5 ? 'вопроса' : 'вопросов'}</span>
        </div>
      )}
      {currentCheckpoint && !nextCheckpoint && (
        <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: '13px', color: '#22c55e', textAlign: 'left' }}>
          Последний рубеж: {currentCheckpoint.title}
        </div>
      )}
    </div>
  );
}

export function MotivationalMessage({ questionNumber }) {
  const preCheckpoint = preCheckpointMessages[questionNumber];
  const motivational = motivationalMessages[questionNumber];
  const message = preCheckpoint || motivational;

  if (!message) return null;

  const isPreCheckpoint = !!preCheckpoint;

  return (
    <div style={{
      padding: '12px 16px',
      fontFamily: "'Manrope', sans-serif",
      background: isPreCheckpoint ? 'rgba(234, 179, 8, 0.08)' : 'rgba(66, 153, 225, 0.08)',
      border: `1px solid ${isPreCheckpoint ? 'rgba(234, 179, 8, 0.2)' : 'rgba(66, 153, 225, 0.2)'}`,
      borderRadius: '10px',
      fontSize: '13px',
      lineHeight: 1.5,
      color: isPreCheckpoint ? '#b8960a' : '#2b6cb0'
    }}>
      {message}
    </div>
  );
}

export function CheckpointMessage({ checkpoint }) {
  return (
    <div style={{
      padding: '12px 16px',
      fontFamily: "'Manrope', sans-serif",
      background: 'rgba(34, 197, 94, 0.08)',
      border: '1px solid rgba(34, 197, 94, 0.2)',
      borderRadius: '10px',
      fontSize: '13px',
      lineHeight: 1.5,
      color: '#16a34a',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}>
      <img src={iconPaths[checkpoint.title]} alt="" style={{ width: '20px', height: '20px' }} />
      <span>Рубеж достигнут: <strong>{checkpoint.title}</strong>!</span>
    </div>
  );
}
