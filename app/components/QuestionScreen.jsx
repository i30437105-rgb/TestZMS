'use client';
import { useState } from 'react';
import { ProgressBar, MotivationalMessage, CheckpointMessage } from './ProgressBar';

export function DiagnosticQuestion({ question, questionNumber, totalQuestions, onAnswer, reachedCheckpoint }) {
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
            color: '#666', 
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
          gap: '16px',
          flexDirection: 'row',
          flexWrap: 'wrap'
        }}>
          <button 
            onClick={() => onAnswer(true)} 
            style={{ 
              flex: '1 1 45%',
              minWidth: '140px',
              padding: '20px 16px', 
              fontSize: '18px', 
              fontWeight: 600, 
              background: 'rgba(34, 197, 94, 0.1)', 
              border: '2px solid #22c55e', 
              borderRadius: '12px', 
              color: '#22c55e', 
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(34, 197, 94, 0.2)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(34, 197, 94, 0.1)';
            }}
          >
            ✓ Да
          </button>
          <button 
            onClick={() => onAnswer(false)} 
            style={{ 
              flex: '1 1 45%',
              minWidth: '140px',
              padding: '20px 16px', 
              fontSize: '18px', 
              fontWeight: 600, 
              background: 'rgba(239, 68, 68, 0.1)', 
              border: '2px solid #ef4444', 
              borderRadius: '12px', 
              color: '#ef4444', 
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(239, 68, 68, 0.2)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(239, 68, 68, 0.1)';
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
          color: '#666', 
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
              minHeight: '120px', 
              padding: '16px 20px', 
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
            gap: '10px', 
            marginBottom: '24px' 
          }}>
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => toggleOption(option)}
                style={{ 
                  padding: '14px 18px', 
                  fontSize: '14px', 
                  background: selectedOptions.includes(option) ? 'rgba(66, 153, 225, 0.2)' : 'rgba(255,255,255,0.05)', 
                  border: `2px solid ${selectedOptions.includes(option) ? '#4299e1' : 'rgba(255,255,255,0.1)'}`, 
                  borderRadius: '10px', 
                  color: '#fff', 
                  cursor: 'pointer', 
                  textAlign: 'left',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s ease'
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
                  padding: '14px 18px', 
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
                color: '#666', 
                margin: '4px 0 0' 
              }}>
                Выбрано: {selectedOptions.length}/3
              </p>
            )}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!canSubmit()}
          style={{ 
            width: '100%', 
            padding: '18px', 
            fontSize: '16px', 
            fontWeight: 600, 
            background: canSubmit() ? '#4299e1' : '#333', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '12px', 
            cursor: canSubmit() ? 'pointer' : 'not-allowed',
            fontFamily: 'inherit',
            transition: 'all 0.2s ease',
            marginTop: 'auto'
          }}
        >
          Продолжить →
        </button>
      </div>
    </div>
  );
}
