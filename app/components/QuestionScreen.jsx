'use client';
import { useState, useEffect } from 'react';
import { ProgressBar, MotivationalMessage, CheckpointMessage } from './ProgressBar';

export function DiagnosticQuestion({ question, questionNumber, totalQuestions, onAnswer, reachedCheckpoint }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return (
    <div style={{ 
      minHeight: 'var(--app-height, 100vh)', 
      display: 'flex', 
      flexDirection: 'column', 
      background: '#0a0a0a',
      overflow: 'auto'
    }}>
      {/* Блок 1: Прогресс-бар */}
      <div style={{ 
        padding: '16px 20px 16px', 
        maxWidth: '800px', 
        margin: '0 auto', 
        width: '100%',
        boxSizing: 'border-box',
        flexShrink: 0,
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <ProgressBar currentQuestion={questionNumber} totalQuestions={totalQuestions} />
      </div>
      
      {/* Блок 2: Мотивашки */}
      <div style={{ 
        minHeight: '70px',
        padding: '16px 20px', 
        maxWidth: '800px', 
        margin: '0 auto', 
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <div style={{ width: '100%' }}>
          {reachedCheckpoint && <CheckpointMessage checkpoint={reachedCheckpoint} />}
          {!reachedCheckpoint && <MotivationalMessage questionNumber={questionNumber} />}
        </div>
      </div>
      
      {/* Блок 3: Вопрос — занимает остаток */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        padding: '20px 20px 40px', 
        maxWidth: '800px', 
        margin: '0 auto', 
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Секция и вопрос */}
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: 'monospace',
            fontSize: '11px',
            color: '#949494',
            letterSpacing: '1px',
            marginBottom: '12px',
            textTransform: 'uppercase'
          }}>
            {question.section}
          </div>
          <h2 style={{ 
            fontSize: 'clamp(18px, 4vw, 24px)', 
            fontWeight: 700, 
            marginBottom: '24px', 
            lineHeight: 1.5, 
            color: '#fff' 
          }}>
            {question.question}
          </h2>
        </div>

        {/* Кнопки — прижаты к низу */}
        <div style={{
          display: 'flex',
          gap: isMobile ? '12px' : '16px',
          flexDirection: 'row',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={(e) => {
              e.currentTarget.blur();
              onAnswer(true);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.currentTarget.blur();
                onAnswer(true);
              }
            }}
            aria-label="Ответить Да"
            style={{
              flex: '1 1 45%',
              minWidth: isMobile ? '120px' : '140px',
              minHeight: '44px',
              padding: isMobile ? '16px 12px' : '20px 16px',
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: 600,
              background: 'rgba(34, 197, 94, 0.1)',
              border: '2px solid #22c55e',
              borderRadius: '12px',
              color: '#22c55e',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.2s ease',
              outline: 'none'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(34, 197, 94, 0.2)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(34, 197, 94, 0.1)';
            }}
            onFocus={(e) => {
              e.target.style.outline = '3px solid #22c55e';
              e.target.style.outlineOffset = '2px';
            }}
            onBlur={(e) => {
              e.target.style.outline = 'none';
            }}
          >
            ✓ Да
          </button>
          <button
            onClick={(e) => {
              e.currentTarget.blur();
              onAnswer(false);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.currentTarget.blur();
                onAnswer(false);
              }
            }}
            aria-label="Ответить Нет"
            style={{
              flex: '1 1 45%',
              minWidth: isMobile ? '120px' : '140px',
              minHeight: '44px',
              padding: isMobile ? '16px 12px' : '20px 16px',
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: 600,
              background: 'rgba(239, 68, 68, 0.1)',
              border: '2px solid #ef4444',
              borderRadius: '12px',
              color: '#ef4444',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.2s ease',
              outline: 'none'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(239, 68, 68, 0.2)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(239, 68, 68, 0.1)';
            }}
            onFocus={(e) => {
              e.target.style.outline = '3px solid #ef4444';
              e.target.style.outlineOffset = '2px';
            }}
            onBlur={(e) => {
              e.target.style.outline = 'none';
            }}
          >
            ✗ Нет
          </button>
        </div>
      </div>
    </div>
  );
}

export function QualificationQuestion({ question, questionNumber, totalQuestions, onAnswer, sectionName, reachedCheckpoint }) {
  const [textAnswer, setTextAnswer] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [customOption, setCustomOption] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubmit = () => {
    if (question.type === 'text') {
      onAnswer(textAnswer);
    } else if (question.type === 'select') {
      onAnswer(selectedOptions[0] || '');
    } else if (question.type === 'multiselect') {
      const finalAnswer = [...selectedOptions];
      if (customOption.trim()) finalAnswer.push(customOption.trim());
      onAnswer(finalAnswer);
    }
  };

  const toggleOption = (option) => {
    if (question.type === 'select') {
      setSelectedOptions([option]);
    } else {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter(o => o !== option));
      } else if (selectedOptions.length < 3) {
        setSelectedOptions([...selectedOptions, option]);
      }
    }
  };

  const canSubmit = () => {
    if (question.type === 'text') return textAnswer.trim().length > 0;
    if (question.type === 'select') return selectedOptions.length === 1;
    if (question.type === 'multiselect') return selectedOptions.length > 0 || customOption.trim().length > 0;
    return false;
  };

  return (
    <div style={{ 
      minHeight: 'var(--app-height, 100vh)', 
      display: 'flex', 
      flexDirection: 'column', 
      background: '#0a0a0a',
      overflow: 'auto'
    }}>
      {/* Блок 1: Прогресс-бар */}
      <div style={{ 
        padding: '16px 20px 16px', 
        maxWidth: '800px', 
        margin: '0 auto', 
        width: '100%',
        boxSizing: 'border-box',
        flexShrink: 0,
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <ProgressBar currentQuestion={questionNumber} totalQuestions={totalQuestions} />
      </div>

      {/* Блок 2: Мотивашки */}
      <div style={{ 
        minHeight: '70px',
        padding: '16px 20px', 
        maxWidth: '800px', 
        margin: '0 auto', 
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <div style={{ width: '100%' }}>
          {reachedCheckpoint && <CheckpointMessage checkpoint={reachedCheckpoint} />}
          {!reachedCheckpoint && <MotivationalMessage questionNumber={questionNumber} />}
        </div>
      </div>
      
      {/* Блок 3: Вопрос — занимает остаток */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        padding: '20px 20px 40px', 
        maxWidth: '800px', 
        margin: '0 auto', 
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{
          fontFamily: 'monospace',
          fontSize: '11px',
          color: '#949494',
          letterSpacing: '1px',
          marginBottom: '12px',
          textTransform: 'uppercase'
        }}>
          {sectionName}
        </div>
        <h2 style={{ 
          fontSize: 'clamp(18px, 4vw, 24px)', 
          fontWeight: 700, 
          marginBottom: '24px', 
          lineHeight: 1.5, 
          color: '#fff' 
        }}>
          {question.question}
        </h2>

        {question.type === 'text' && (
          <textarea
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            placeholder={question.placeholder}
            style={{
              width: '100%',
              minHeight: isMobile ? '100px' : '120px',
              padding: isMobile ? '14px 16px' : '16px 20px',
              fontSize: '16px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              color: '#fff',
              outline: 'none',
              fontFamily: 'inherit',
              resize: 'vertical',
              marginBottom: '24px',
              boxSizing: 'border-box'
            }}
          />
        )}

        {(question.type === 'select' || question.type === 'multiselect') && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '8px' : '10px',
            marginBottom: '24px'
          }}>
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.currentTarget.blur();
                  toggleOption(option);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.currentTarget.blur();
                    toggleOption(option);
                  }
                }}
                aria-label={`Выбрать вариант: ${option}`}
                aria-pressed={selectedOptions.includes(option)}
                style={{
                  minHeight: '44px',
                  padding: isMobile ? '12px 16px' : '14px 18px',
                  fontSize: isMobile ? '14px' : '14px',
                  background: selectedOptions.includes(option) ? 'rgba(66, 153, 225, 0.2)' : 'rgba(255,255,255,0.05)',
                  border: `2px solid ${selectedOptions.includes(option) ? '#4299e1' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '10px',
                  color: '#fff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.outline = '3px solid #4299e1';
                  e.target.style.outlineOffset = '2px';
                }}
                onBlur={(e) => {
                  e.target.style.outline = 'none';
                }}
              >
                {option}
              </button>
            ))}
            {question.allowCustom && (
              <input
                type="text"
                value={customOption}
                onChange={(e) => setCustomOption(e.target.value)}
                placeholder="Напишите свой вариант..."
                style={{
                  minHeight: '44px',
                  padding: isMobile ? '12px 16px' : '14px 18px',
                  fontSize: '14px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  color: '#fff',
                  outline: 'none',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box'
                }}
              />
            )}
            {question.type === 'multiselect' && (
              <p style={{
                fontSize: '12px',
                color: '#949494',
                margin: '4px 0 0'
              }}>
                Выбрано: {selectedOptions.length}/3
              </p>
            )}
          </div>
        )}

        <button
          onClick={(e) => {
            e.currentTarget.blur();
            handleSubmit();
          }}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && canSubmit()) {
              e.preventDefault();
              e.currentTarget.blur();
              handleSubmit();
            }
          }}
          disabled={!canSubmit()}
          aria-label="Продолжить к следующему вопросу"
          style={{
            width: '100%',
            minHeight: '44px',
            padding: isMobile ? '14px 16px' : '18px',
            fontSize: isMobile ? '15px' : '16px',
            fontWeight: 600,
            background: canSubmit() ? '#4299e1' : '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            cursor: canSubmit() ? 'pointer' : 'not-allowed',
            fontFamily: 'inherit',
            transition: 'all 0.2s ease',
            marginTop: 'auto',
            outline: 'none'
          }}
          onFocus={(e) => {
            if (canSubmit()) {
              e.target.style.outline = '3px solid #4299e1';
              e.target.style.outlineOffset = '2px';
            }
          }}
          onBlur={(e) => {
            e.target.style.outline = 'none';
          }}
        >
          Продолжить →
        </button>
      </div>
    </div>
  );
}
