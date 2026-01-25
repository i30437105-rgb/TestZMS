'use client';
import { checkpoints, preCheckpointMessages, motivationalMessages } from '../data/gamification';

// Маппинг иконок
const iconPaths = {
  'Предприниматель': '/icons/flag.png',
  'Стойкий основатель': '/icons/bicep.png',
  'Железная воля': '/icons/shield.png',
  'Целеустремлённый лидер': '/icons/trophy.png'
};

export function ProgressBar({ currentQuestion, totalQuestions }) {
  // Прогресс 0% на первом вопросе
  const progress = ((currentQuestion - 1) / totalQuestions) * 100;
  
  // Позиции чекпоинтов на линии (в процентах)
  const checkpointPositions = [
    { pos: 0, question: 1, title: 'Предприниматель', icon: '/icons/flag.png' },
    { pos: 44, question: 11, title: 'Стойкий основатель', icon: '/icons/bicep.png' },
    { pos: 76, question: 19, title: 'Железная воля', icon: '/icons/shield.png' },
    { pos: 100, question: 25, title: 'Целеустремлённый лидер', icon: '/icons/trophy.png' }
  ];

  // Границы сегментов
  const segment1End = 44; // Зелёный: 0-44%
  const segment2End = 76; // Жёлтый: 44-76%
  // Красный: 76-100%

  // Текущий и следующий чекпоинт
  const currentCheckpoint = checkpoints.filter(c => currentQuestion >= c.question).pop();
  const nextCheckpoint = checkpoints.find(c => c.question > currentQuestion);
  const questionsToNext = nextCheckpoint ? nextCheckpoint.question - currentQuestion : 0;

  // Проверка активности иконки (рубеж достигнут ПОСЛЕ ответа на вопрос)
  const isIconActive = (checkpointQuestion) => {
    if (checkpointQuestion === 1) return true; // Флаг всегда активен
    return currentQuestion > checkpointQuestion;
  };

  return (
    <div style={{ paddingTop: '16px' }}>
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
          background: '#333',
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
            const active = isIconActive(cp.question);
            // Определяем цвет маркера по позиции
            let markerColor = '#333';
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
                border: '3px solid #0a0a0a',
                zIndex: 2,
                transition: 'background 0.3s ease'
              }} />
            );
          })}
        </div>
      </div>

      {/* Строка 1: процент и номер вопроса */}
      <div style={{ fontSize: '13px', color: '#888', textAlign: 'left', marginBottom: '4px' }}>
        <span style={{ color: '#fff', fontWeight: 600 }}>{Math.round(progress)}%</span> пройдено • Вопрос {currentQuestion} из {totalQuestions}
      </div>

      {/* Строка 2: текущий уровень и до следующего рубежа */}
      {currentQuestion === 25 ? (
        <div style={{ fontSize: '13px', color: '#eab308', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <img src="/icons/trophy.png" alt="" style={{ width: '16px', height: '16px' }} />
          Последний ответ до ранга Целеустремленный лидер
        </div>
      ) : currentQuestion === 19 ? (
        <div style={{ fontSize: '13px', color: '#eab308', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <img src="/icons/shield.png" alt="" style={{ width: '16px', height: '16px' }} />
          Один ответ до рубежа Железная воля
        </div>
      ) : currentQuestion === 11 ? (
        <div style={{ fontSize: '13px', color: '#eab308', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <img src="/icons/bicep.png" alt="" style={{ width: '16px', height: '16px' }} />
          Ещё ответ до рубежа Стойкий основатель
        </div>
      ) : currentCheckpoint && (
        <div style={{ fontSize: '13px', color: '#888', textAlign: 'left', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
          <span>Текущий уровень:</span>
          <img src={iconPaths[currentCheckpoint.title]} alt="" style={{ width: '16px', height: '16px', verticalAlign: 'middle' }} />
          <span style={{ color: '#22c55e' }}>{currentCheckpoint.title}</span>
          {nextCheckpoint && (
            <>
              <span>, до рубежа</span>
              <img src={iconPaths[nextCheckpoint.title]} alt="" style={{ width: '16px', height: '16px', verticalAlign: 'middle' }} />
              <span style={{ color: '#fff' }}>{nextCheckpoint.title}</span>
              <span>: {questionsToNext} {questionsToNext === 1 ? 'вопрос' : questionsToNext < 5 ? 'вопроса' : 'вопросов'}</span>
            </>
          )}
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
      background: isPreCheckpoint ? 'rgba(234, 179, 8, 0.1)' : 'rgba(66, 153, 225, 0.1)',
      border: `1px solid ${isPreCheckpoint ? 'rgba(234, 179, 8, 0.3)' : 'rgba(66, 153, 225, 0.3)'}`,
      borderRadius: '10px',
      fontSize: '13px',
      lineHeight: 1.5,
      color: isPreCheckpoint ? '#eab308' : '#4299e1'
    }}>
      {message}
    </div>
  );
}

export function CheckpointMessage({ checkpoint }) {
  return (
    <div style={{
      padding: '12px 16px',
      background: 'rgba(34, 197, 94, 0.1)',
      border: '1px solid rgba(34, 197, 94, 0.3)',
      borderRadius: '10px',
      fontSize: '13px',
      lineHeight: 1.5,
      color: '#22c55e',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}>
      <img src={iconPaths[checkpoint.title]} alt="" style={{ width: '20px', height: '20px' }} />
      <span>Рубеж достигнут: <strong>{checkpoint.title}</strong>!</span>
    </div>
  );
}
