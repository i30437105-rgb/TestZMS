'use client';
import React, { useState, useEffect, useRef } from 'react';

// ============================================
// ИКОНКИ
// ============================================

function LockIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="10" width="14" height="11" rx="2" fill="#FFD54F" stroke="#FFA000" strokeWidth="1.5"/>
      <path d="M8 10V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V10" stroke="#FFA000" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="15" r="1.5" fill="#FFA000"/>
    </svg>
  );
}

function TrophyIcon({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 8H34V20C34 25.5228 29.5228 30 24 30C18.4772 30 14 25.5228 14 20V8Z" fill="#FFD54F" stroke="#FFA000" strokeWidth="2"/>
      <path d="M14 12H10C8.89543 12 8 12.8954 8 14V16C8 18.7614 10.2386 21 13 21H14" stroke="#FFA000" strokeWidth="2"/>
      <path d="M34 12H38C39.1046 12 40 12.8954 40 14V16C40 18.7614 37.7614 21 35 21H34" stroke="#FFA000" strokeWidth="2"/>
      <rect x="20" y="30" width="8" height="6" fill="#FFD54F"/>
      <rect x="16" y="36" width="16" height="4" rx="1" fill="#FFA000"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

// ============================================
// ЦВЕТА И КОНСТАНТЫ
// ============================================

const sectionColors = {
  'Стратегия': {
    accent: '#5B9BD5',
    accentLight: 'rgba(91,155,213,0.08)'
  },
  'Лидген': {
    accent: '#ED8936',
    accentLight: 'rgba(237,137,54,0.08)'
  },
  'Продажи': {
    accent: '#48BB78',
    accentLight: 'rgba(72,187,120,0.08)'
  }
};

function PulsingDot({ color, size = 8 }) {
  return (
    <span style={{
      position: 'relative',
      width: size * 3,
      height: size * 3,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }}>
      <span style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        opacity: 0.4,
        animation: 'pulse-wave 2s ease-out infinite'
      }} />
      <span style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        opacity: 0.4,
        animation: 'pulse-wave 2s ease-out infinite 1s'
      }} />
      <span style={{
        position: 'relative',
        width: size,
        height: size,
        borderRadius: '50%',
        background: color
      }} />
    </span>
  );
}

// ============================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ============================================

function getEntrepreneursPercent(scorePercent) {
  if (scorePercent <= 30) return 93;
  if (scorePercent <= 60) return 51;
  return 3;
}

function isLevelUnlocked(level, blocks) {
  const blocksBelow = blocks.filter(b => b.level < level);
  return blocksBelow.every(b => b.status === 'success');
}

function generateLevelTooltip(level, blocks, sectionName) {
  if (level === 0) return null;
  
  const redBlocksBelow = blocks
    .filter(b => b.level < level && b.status === 'error')
    .map(b => b.title);
  
  if (redBlocksBelow.length === 0) return null;
  
  return `Для открытия уровня ${level} проработайте блоки раздела «${sectionName}»: ${redBlocksBelow.join(', ')}.`;
}

function generateTrophyTooltip(blocks, sectionName) {
  const redBlocks = blocks
    .filter(b => b.status === 'error')
    .map(b => b.title);
  
  if (redBlocks.length === 0) {
    return `🏆 Поздравляем! Раздел «${sectionName}» полностью проработан!`;
  }
  
  return `Для завершения раздела «${sectionName}» проработайте: ${redBlocks.join(', ')}.`;
}

// ============================================
// МАППИНГ ИКОНОК
// ============================================

const blockIconMap = {
  'Интервью': 'interview.png',
  'Портрет': 'target-audience.png',
  'JTBD': 'jtbd.png',
  'Сегментация': 'abcdx.png',
  'CJM': 'cjm.png',
  'Конкуренты': 'competitors.png',
  'Рынок': 'market.png',
  'SWOT': 'swot.png',
  'CVP': 'cvp.png',
  'Стратегия': 'strategy.png',
  'Юнит-эк.': 'unit-economics.png',
  '4P': '4p.png',
  'HADI': 'hadi.png',
  'Каналы': 'ad-channels.png',
  'Подрядчик': 'contractor.png',
  'Маркетолог': 'marketer.png',
  'Масштаб.': 'scaling.png',
  'Продукт': 'product.png',
  'Менеджер': 'funnel.png',
  'CRM': 'crm.png',
  'Доп. продажи': 'cross-sale.png',
  'ОП': 'rop.png'
};

// ============================================
// TELEGRAM HELPERS
// ============================================

function getUtmData() {
  if (typeof window === 'undefined') return {};
  return {
    source: sessionStorage.getItem('utm_source') || '',
    medium: sessionStorage.getItem('utm_medium') || '',
    campaign: sessionStorage.getItem('utm_campaign') || '',
    content: sessionStorage.getItem('utm_content') || '',
    term: sessionStorage.getItem('utm_term') || '',
  };
}

async function sendTelegramEvent({ action, message_id, answers, results, utm, bonusData, auditClicked, hostname }) {
  const response = await fetch('/api/telegram', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, message_id, answers, results, utm, bonusData, auditClicked, hostname })
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Ошибка отправки');
  }
  return response.json();
}

// ============================================
// UI КОМПОНЕНТЫ
// ============================================

function ResultBlock({ block, isSelected, onClick, isExpanded, isMobile, isTablet }) {
  const isSuccess = block.status === 'success';
  const isError = block.status === 'error';

  const bgColor = isSuccess
    ? (isSelected ? '#e8f5c8' : '#f0f8db')
    : isError
      ? (isSelected ? '#fecaca' : '#fee2e2')
      : '#e5e5e5';

  const borderColor = isSuccess
    ? (isSelected ? '#a3d944' : '#c8f542')
    : isError
      ? (isSelected ? '#ef4444' : '#fca5a5')
      : '#d4d4d4';

  const textColor = isSuccess ? '#3d5a00' : isError ? '#991b1b' : '#525252';
  const iconFile = blockIconMap[block.title] || 'strategy.png';

  return (
    <button
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`${block.title} - ${isSuccess ? 'Зеленая зона' : 'Красная зона'}. Нажмите для просмотра рекомендации`}
      aria-pressed={isSelected}
      style={{
        ...(isMobile ? {} : { aspectRatio: '3 / 1' }),
        width: '100%',
        padding: isMobile ? '8px 12px' : '4px 4px 3px',
        background: bgColor,
        border: `2px solid ${borderColor}`,
        borderRadius: '14px',
        cursor: 'pointer',
        transition: 'all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        textAlign: isMobile ? 'left' : 'center',
        fontFamily: "'Manrope', sans-serif",
        transform: isSelected ? 'scale(1.05)' : 'scale(1)',
        boxShadow: isSelected
          ? `0 4px 16px ${isSuccess ? 'rgba(200,245,66,0.4)' : 'rgba(239,68,68,0.3)'}`
          : '0 2px 4px rgba(0,0,0,0.08)',
        position: 'relative',
        zIndex: isSelected ? 2 : 1,
        outline: 'none',
        display: 'flex',
        flexDirection: isMobile ? 'row' : 'column',
        alignItems: 'center',
        justifyContent: isMobile ? 'flex-start' : 'flex-end',
        gap: isMobile ? '10px' : '2px',
        overflow: 'visible',
        boxSizing: 'border-box',
        filter: isSelected ? 'brightness(1.05)' : 'brightness(1)'
      }}
      onMouseOver={(e) => {
        if (!isSelected) {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.filter = 'brightness(1.08)';
        }
      }}
      onMouseOut={(e) => {
        if (!isSelected) {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.filter = 'brightness(1)';
        }
      }}
      onFocus={() => {}}
      onBlur={() => {}}
    >
      <img
        src={`/landing/assets/icons/scanner/${iconFile}`}
        alt=""
        style={{
          width: isMobile ? '68px' : isTablet ? '44px' : '57px',
          height: isMobile ? '68px' : isTablet ? '44px' : '57px',
          objectFit: 'contain',
          flexShrink: 0
        }}
      />
      <div style={{
        fontSize: isMobile ? '14px' : isTablet ? '11px' : '12px',
        fontWeight: 500,
        color: textColor,
        lineHeight: 1.2,
        padding: '0 2px 2px'
      }}>
        {block.title}
      </div>
    </button>
  );
}

function BlockDetail({ block, onClose }) {
  const isSuccess = block.status === 'success';
  const recommendation = isSuccess ? block.yes_rec : block.no_rec;
  const statusColor = isSuccess ? '#22c55e' : '#ef4444';
  const statusBg = isSuccess ? '#dcfce7' : '#fee2e2';
  const borderColor = isSuccess ? '#86efac' : '#fca5a5';

  return (
    <div style={{
      background: '#fff',
      borderRadius: '0 0 8px 8px',
      padding: '12px',
      border: `2px solid ${borderColor}`,
      borderTop: 'none',
      marginTop: '-2px',
      position: 'relative',
      zIndex: 0
    }}>
      <button
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClose();
          }
        }}
        aria-label="Закрыть рекомендацию"
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: '#7a7f8a',
          padding: '4px',
          outline: 'none'
        }}
        onFocus={(e) => {
          e.target.style.outline = '2px solid #4299e1';
          e.target.style.outlineOffset = '2px';
        }}
        onBlur={(e) => {
          e.target.style.outline = 'none';
        }}
      >
        <CloseIcon />
      </button>

      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 10px',
        background: statusBg,
        borderRadius: '100px',
        marginBottom: '10px'
      }}>
        <span style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: statusColor
        }} />
        <span style={{
          fontSize: '11px',
          fontWeight: 600,
          color: statusColor
        }}>
          {isSuccess ? 'Зелёная зона' : 'Красная зона'}
        </span>
      </div>

      <div style={{
        fontFamily: "'Manrope', sans-serif",
        fontSize: '12px',
        color: '#1a1a2e',
        lineHeight: 1.6
      }}>
        {recommendation}
      </div>
    </div>
  );
}


function useTooltipClamp(showTooltip) {
  const tooltipRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    if (showTooltip && tooltipRef.current) {
      const tooltip = tooltipRef.current;
      const rect = tooltip.getBoundingClientRect();
      const pad = 20;
      let shiftX = 0;

      if (rect.right > window.innerWidth - pad) {
        shiftX = -(rect.right - (window.innerWidth - pad));
      } else if (rect.left < pad) {
        shiftX = pad - rect.left;
      }

      tooltip.style.transform = `translateX(calc(-50% + ${shiftX}px))`;
      if (arrowRef.current) {
        arrowRef.current.style.transform = `translateX(calc(-50% - ${shiftX}px))`;
      }
    }
  }, [showTooltip]);

  return { tooltipRef, arrowRef };
}

function LevelBadge({ level, variant = 'default', tooltipText, isTablet }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const { tooltipRef, arrowRef } = useTooltipClamp(showTooltip);

  const badgeColors = {
    'default': { bg: '#f5f5f7', text: '#7a7f8a', border: '#d1d5db' },
    'start': { bg: '#c8f542', text: '#1a1a2e', border: '#c8f542' }
  };
  const color = badgeColors[variant];

  return (
    <div
      style={{ position: 'relative', display: 'inline-block', zIndex: showTooltip ? 1001 : 1 }}
      onMouseEnter={() => tooltipText && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: isTablet ? '5px 10px' : '6px 14px',
        background: color.bg,
        borderRadius: '20px',
        fontFamily: "'Manrope', sans-serif",
        fontSize: isTablet ? '11px' : '12px',
        fontWeight: 600,
        color: color.text,
        cursor: tooltipText ? 'help' : 'default',
        whiteSpace: 'nowrap',
        border: `1px solid ${color.border}`
      }}>
        {variant !== 'start' && <LockIcon size={16} />}
        Уровень {level}
      </div>

      {showTooltip && tooltipText && (
        <div ref={tooltipRef} style={{
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '10px',
          padding: '12px 16px',
          background: '#1a202c',
          color: '#fff',
          borderRadius: '8px',
          fontSize: '12px',
          lineHeight: 1.5,
          width: '280px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          zIndex: 1000,
          textAlign: 'left'
        }}>
          {tooltipText}
          <div ref={arrowRef} style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '8px solid #1a202c'
          }} />
        </div>
      )}
    </div>
  );
}

function TrophyWithTooltip({ tooltipText, isTablet }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const { tooltipRef, arrowRef } = useTooltipClamp(showTooltip);

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-block',
        cursor: 'help',
        zIndex: showTooltip ? 1001 : 1
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <TrophyIcon size={isTablet ? 36 : 48} />

      {showTooltip && tooltipText && (
        <div ref={tooltipRef} style={{
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '10px',
          padding: '12px 16px',
          background: '#1a202c',
          color: '#fff',
          borderRadius: '8px',
          fontSize: '12px',
          lineHeight: 1.5,
          width: '280px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          zIndex: 1000,
          textAlign: 'left'
        }}>
          {tooltipText}
          <div ref={arrowRef} style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '8px solid #1a202c'
          }} />
        </div>
      )}
    </div>
  );
}

function getCurrentLevel(blocks) {
  // Достигнутый уровень = максимальный уровень, где ВСЕ блоки зелёные
  // И все предыдущие уровни тоже полностью зелёные
  const levels = [0, 1, 2, 3];
  let openedLevel = -1; // -1 = ни один уровень не достигнут
  
  for (const level of levels) {
    const blocksOnLevel = blocks.filter(b => b.level === level);
    if (blocksOnLevel.length === 0) continue; // пропускаем пустые уровни
    const allGreen = blocksOnLevel.every(b => b.status === 'success');
    if (allGreen) {
      openedLevel = level;
    } else {
      break; // красный блок - прерываем, следующие уровни закрыты
    }
  }
  
  // Для отображения: если ничего не достигнуто, показываем 0
  return Math.max(0, openedLevel);
}

function SectionStats({ blocks, sectionName }) {
  const totalGreen = blocks.filter(b => b.status === 'success').length;
  const totalRed = blocks.filter(b => b.status === 'error').length;
  const total = blocks.length;
  const percent = Math.round((totalGreen / total) * 100);
  const entrepreneursPercent = getEntrepreneursPercent(percent);
  const currentLevel = getCurrentLevel(blocks);

  return (
    <div style={{
      background: '#fafafa',
      borderRadius: '12px',
      padding: '12px 16px',
      marginBottom: '16px',
      border: '1px solid #e5e5e5'
    }}>
      {/* Строка 1: Раздел работает на N% из 100 + детализация */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '6px'
      }}>
        <div style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: '14px',
          color: '#1a1a2e',
          fontWeight: 600
        }}>
          Работает на {percent}%
        </div>
        <div style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: '11px',
          color: '#7a7f8a'
        }}>
          <span style={{ color: '#22c55e', fontWeight: 600 }}>{totalGreen}</span>
          <span> / </span>
          <span style={{ color: '#ef4444', fontWeight: 600 }}>{totalRed}</span>
          <span> из {total}</span>
        </div>
      </div>

      {/* Строка 2: Текущий уровень */}
      <div style={{
        fontFamily: "'Manrope', sans-serif",
        fontSize: '12px',
        color: '#7a7f8a',
        marginBottom: '4px'
      }}>
        Уровень {currentLevel} из 3
      </div>

      {/* Строка 3: Такой результат у N% предпринимателей */}
      <div style={{
        fontFamily: "'Manrope', sans-serif",
        fontSize: '11px',
        color: '#7a7f8a'
      }}>
        Такой результат у <strong style={{ color: '#1a1a2e' }}>{entrepreneursPercent}%</strong> предпринимателей России
      </div>
    </div>
  );
}

// ============================================
// ДОРОЖКИ СЕКЦИЙ
// ============================================

function SectionTrackHorizontal({ section, blocks, selectedBlock, onSelectBlock, sectionKey, onDeselectBlock, isTablet }) {
  const colors = sectionColors[sectionKey];
  
  const blocksByLevel = {};
  blocks.forEach(block => {
    if (!blocksByLevel[block.level]) {
      blocksByLevel[block.level] = [];
    }
    blocksByLevel[block.level].push(block);
  });
  
  const levels = Object.keys(blocksByLevel).map(Number).sort((a, b) => a - b);
  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: isTablet ? '16px 16px 28px' : '24px 24px 36px',
        position: 'relative',
        overflow: 'visible',
        border: '1px solid #d1d5db',
        boxShadow: '0 25px 60px rgba(0,0,0,0.10), 0 6px 20px rgba(0,0,0,0.05)'
      }}>
        {/* Clip-обёртка для полоски — обрезает по скруглениям карточки */}
        <div style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          borderRadius: '16px',
          pointerEvents: 'none'
        }}>
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '4px',
            background: colors.accent
          }} />
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <SectionStats blocks={blocks} sectionName={section} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <PulsingDot color={colors.accent} size={8} />
            <h3 style={{
              fontFamily: "'Chakra Petch', sans-serif",
              color: '#1a1a2e',
              fontSize: '13px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              margin: 0
            }}>
              {section}
            </h3>
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          position: 'relative',
          overflow: 'visible'
        }}>
          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '60px',
            right: '60px',
            height: '4px',
            background: '#d1d5db',
            borderRadius: '2px',
            zIndex: 0
          }} />

          {levels.map((level, levelIndex) => {
            const levelUnlocked = isLevelUnlocked(level, blocks);
            const tooltipText = generateLevelTooltip(level, blocks, section);

            return (
              <React.Fragment key={level}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: isTablet ? '6px' : '8px',
                  minWidth: '0',
                  flex: '2 1 0%',
                  paddingBottom: isTablet ? '36px' : '44px',
                  position: 'relative'
                }}>
                  {blocksByLevel[level].length > 1 && (
                    <div style={{
                      position: 'absolute',
                      left: '50%',
                      top: '14px',
                      bottom: '60px',
                      width: '3px',
                      background: '#d1d5db',
                      transform: 'translateX(-50%)',
                      zIndex: 0,
                      borderRadius: '2px'
                    }} />
                  )}

                  {blocksByLevel[level].map((block) => {
                    const isBlockSelected = selectedBlock?.id === block.id;
                    return (
                      <div key={block.id}>
                        <ResultBlock
                          block={block}
                          isSelected={isBlockSelected}
                          isTablet={isTablet}
                          onClick={() => {
                            if (isBlockSelected) {
                              onDeselectBlock();
                            } else {
                              onSelectBlock(block);
                            }
                          }}
                        />
                        {isBlockSelected && (
                          <BlockDetail
                            block={block}
                            onClose={onDeselectBlock}
                          />
                        )}
                      </div>
                    );
                  })}

                  <div style={{
                    position: 'absolute',
                    left: '50%',
                    bottom: '28px',
                    height: '16px',
                    width: '3px',
                    background: '#d1d5db',
                    transform: 'translateX(-50%)',
                    borderRadius: '2px'
                  }} />
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  minWidth: '0',
                  flex: '1 1 0%',
                  position: 'relative'
                }}>
                  <LevelBadge
                    level={level}
                    variant={levelUnlocked ? 'start' : 'default'}
                    tooltipText={tooltipText}
                    isTablet={isTablet}
                  />
                </div>
              </React.Fragment>
            );
          })}

          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            minWidth: '0',
            flex: '0 0 auto',
            position: 'relative'
          }}>
            <TrophyWithTooltip tooltipText={generateTrophyTooltip(blocks, section)} isTablet={isTablet} />
          </div>
        </div>
      </div>
      
    </div>
  );
}

function SectionTrackVertical({ section, blocks, selectedBlock, onSelectBlock, sectionKey, onDeselectBlock }) {
  const colors = sectionColors[sectionKey];

  const blocksByLevel = {};
  blocks.forEach(block => {
    if (!blocksByLevel[block.level]) {
      blocksByLevel[block.level] = [];
    }
    blocksByLevel[block.level].push(block);
  });

  // Уровни от высшего к нулевому (сверху вниз на экране = снизу вверх по иерархии)
  const levels = Object.keys(blocksByLevel).map(Number).sort((a, b) => b - a);

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '16px',
      padding: '20px 20px 20px 26px',
      marginBottom: '20px',
      position: 'relative',
      overflow: 'visible',
      border: '1px solid #d1d5db',
      boxShadow: '0 25px 60px rgba(0,0,0,0.10), 0 6px 20px rgba(0,0,0,0.05)'
    }}>
      {/* Clip-обёртка для полоски — обрезает по скруглениям карточки */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        borderRadius: '16px',
        pointerEvents: 'none'
      }}>
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '4px',
          background: colors.accent
        }} />
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginBottom: '12px'
      }}>
        <PulsingDot color={colors.accent} size={8} />
        <h3 style={{
          fontFamily: "'Chakra Petch', sans-serif",
          color: '#1a1a2e',
          fontSize: '13px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          margin: 0,
          textAlign: 'center'
        }}>
          {section}
        </h3>
      </div>

      <SectionStats blocks={blocks} sectionName={section} />

      {/* Трофей + блоки с вертикальной линией */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        position: 'relative'
      }}>
        {/* Вертикальная соединительная линия */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '20px',
          bottom: '20px',
          width: '3px',
          background: '#d1d5db',
          transform: 'translateX(-50%)',
          borderRadius: '2px',
          zIndex: 0
        }} />

        {/* Трофей */}
        <div style={{
          position: 'relative',
          zIndex: 2
        }}>
          <TrophyWithTooltip tooltipText={generateTrophyTooltip(blocks, section)} />
        </div>
        {levels.map((level) => {
          const levelUnlocked = isLevelUnlocked(level, blocks);
          const tooltipText = generateLevelTooltip(level, blocks, section);

          return (
            <React.Fragment key={level}>
              {/* Бейдж уровня */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '4px 0',
                position: 'relative',
                zIndex: 2
              }}>
                <LevelBadge
                  level={level}
                  variant={levelUnlocked ? 'start' : 'default'}
                  tooltipText={tooltipText}
                />
              </div>

              {/* Блоки этого уровня — в один столбец */}
              {blocksByLevel[level].map(block => {
                const isExpanded = selectedBlock?.id === block.id;
                return (
                  <div key={block.id} style={{ width: '100%', maxWidth: '280px' }}>
                    <ResultBlock
                      block={block}
                      isSelected={isExpanded}
                      isExpanded={isExpanded}
                      isMobile={true}
                      onClick={() => {
                        if (isExpanded) {
                          onDeselectBlock();
                        } else {
                          onSelectBlock(block);
                        }
                      }}
                    />
                    {isExpanded && (
                      <BlockDetail
                        block={block}
                        onClose={onDeselectBlock}
                      />
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

// ============================================
// СЕКЦИЯ "АЛЕКСЕЙ ДОБРУСИН" (из лендинга — Career Section)
// ============================================

function CareerSection({ isMobile, onAuditClick }) {
  const isTablet = typeof window !== 'undefined' && window.innerWidth > 768 && window.innerWidth <= 1100;
  const sectionRef = useRef(null);
  const timerStarted = useRef(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 минут в секундах
  const [expired, setExpired] = useState(false);
  const [expiredToast, setExpiredToast] = useState(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !timerStarted.current) {
        timerStarted.current = true;
        const interval = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              clearInterval(interval);
              setExpired(true);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  const handleCTA = () => {
    if (expired) {
      setExpiredToast('Ваше предложение уже недействительно');
      setTimeout(() => setExpiredToast(null), 3500);
    } else {
      window.open('https://audit.metodzms.ru/?utm_source=test&utm_medium=results&utm_campaign=audit&promo=DOBRUSIN', '_blank');
      if (onAuditClick) onAuditClick();
    }
  };

  return (
    <div ref={sectionRef} style={{
      paddingBottom: isMobile ? '80px' : '150px',
      position: 'relative',
    }}>
      {/* Heading + Timer row */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'center' : 'flex-end',
        justifyContent: 'space-between',
        gap: isMobile ? '16px' : '24px',
        marginBottom: isMobile ? '36px' : '64px',
      }}>
        <h2 style={{
          fontFamily: "'Unbounded', sans-serif",
          fontSize: isMobile ? '28px' : isTablet ? '32px' : '55px',
          fontWeight: 600,
          color: '#1a1a2e',
          lineHeight: 1.15,
          letterSpacing: isMobile ? '-1px' : '-2px',
          margin: 0,
          whiteSpace: isMobile || isTablet ? 'normal' : 'nowrap',
          textAlign: isMobile ? 'center' : 'left',
          position: 'relative',
          zIndex: 0,
        }}>
          Это предложение<br />
          сгорит через{isMobile && <br />}
          {!isMobile && ' '}
          <span style={{ position: 'relative', display: 'inline' }}>
            15 минут
            <span style={{
              position: 'absolute',
              left: 0, right: 0, top: '22%', bottom: '12%',
              background: '#c8f542',
              transform: 'rotate(4.5deg)',
              zIndex: -1,
              borderRadius: '4px',
            }} />
          </span>
        </h2>

        {/* Timer block */}
        <div style={{
          background: '#1a1a2e',
          borderRadius: '18px',
          padding: isMobile ? '24px 36px' : '28px 44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          flexShrink: 0,
          minWidth: isMobile ? '160px' : '200px',
        }}>
          <span style={{
            fontFamily: "'Unbounded', sans-serif",
            fontSize: isMobile ? '36px' : '48px',
            fontWeight: 600,
            color: expired ? '#ff4d4d' : '#c8f542',
            letterSpacing: '2px',
            lineHeight: 1,
          }}>
            {minutes}
          </span>
          <span style={{
            fontFamily: "'Unbounded', sans-serif",
            fontSize: isMobile ? '32px' : '40px',
            fontWeight: 600,
            color: expired ? '#ff4d4d' : '#c8f542',
            lineHeight: 1,
            opacity: timeLeft % 2 === 0 ? 1 : 0.4,
          }}>:</span>
          <span style={{
            fontFamily: "'Unbounded', sans-serif",
            fontSize: isMobile ? '36px' : '48px',
            fontWeight: 600,
            color: expired ? '#ff4d4d' : '#c8f542',
            letterSpacing: '2px',
            lineHeight: 1,
          }}>
            {seconds}
          </span>
        </div>
      </div>

      {/* Toast при истечении */}
      {expiredToast && (
        <div style={{
          position: 'absolute',
          top: isMobile ? '80px' : '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#1a1a2e',
          color: '#ff4d4d',
          fontFamily: "'Manrope', sans-serif",
          fontSize: '14px',
          fontWeight: 600,
          padding: '10px 20px',
          borderRadius: '10px',
          zIndex: 10,
          animation: 'toast-fade 3.5s ease forwards',
          whiteSpace: 'nowrap',
        }}>
          {expiredToast}
        </div>
      )}

      {/* Container: image + content */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'stretch' : 'stretch',
        gap: isMobile ? '32px' : isTablet ? '24px' : '40px',
      }}>
        {/* Image */}
        <div style={{ flex: 1, minWidth: 0, position: 'relative', minHeight: isMobile ? '340px' : 'auto' }}>
          <img
            src="/landing/assets/images/ad_z.jpg"
            alt="Алексей Добрусин"
            style={{
              width: '100%',
              height: isMobile ? '340px' : '100%',
              objectFit: 'cover',
              display: 'block',
              borderRadius: isMobile ? '12px' : '18px',
              objectFit: 'cover',
              filter: 'grayscale(80%) brightness(0.70) contrast(1.1)',
            }}
          />
          {/* Затемнение нижней части фото под текстом */}
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '50%',
            borderRadius: isMobile ? '0 0 12px 12px' : '0 0 18px 18px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.50), rgba(0,0,0,0))',
            pointerEvents: 'none',
          }} />
          {/* Оверлей: точка + Автор метода + текст — в левой части фото */}
          <div style={{
            position: 'absolute',
            bottom: isMobile ? '20px' : '30px',
            left: isMobile ? '20px' : '30px',
            right: isMobile ? '20px' : '40%',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? '10px' : '12px',
              marginBottom: isMobile ? '10px' : '14px',
            }}>
              <div style={{
                width: isMobile ? '9px' : '12px',
                height: isMobile ? '9px' : '12px',
                borderRadius: '50%',
                background: '#c8f542',
                flexShrink: 0,
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0,
                  width: '100%', height: '100%',
                  borderRadius: '50%', background: '#c8f542',
                  opacity: 0, transformOrigin: 'center center',
                  animation: 'pulse-wave 2.5s ease-out infinite',
                }} />
                <div style={{
                  position: 'absolute', top: 0, left: 0,
                  width: '100%', height: '100%',
                  borderRadius: '50%', background: '#c8f542',
                  opacity: 0, transformOrigin: 'center center',
                  animation: 'pulse-wave 2.5s ease-out 1.25s infinite',
                }} />
              </div>
              <span style={{
                fontFamily: "'Unbounded', sans-serif",
                fontSize: isMobile ? '14px' : '17px',
                fontWeight: 600,
                color: '#ffffff',
              }}>
                Алексей Добрусин
              </span>
            </div>
            <p style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: isMobile ? '14px' : '14px',
              fontWeight: 400,
              color: '#ffffff',
              lineHeight: 1.5,
              margin: 0,
              opacity: 0.85,
            }}>
              Автор инженерного подхода, к.э.н., 16 лет в маркетинге. Подход проверен в микрокомпаниях из 47 ниш — средний рост выручки 40% за 5 месяцев.
            </p>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Карточка-подложка (стиль бонусных карточек) */}
          <div style={{
            background: '#fafafa',
            border: '1px dashed #d1d5db',
            borderRadius: '16px',
            padding: isMobile ? '20px 14px 28px' : '18px 20px 14px',
            marginLeft: isMobile ? 0 : isTablet ? '-12px' : '-20px',
            paddingLeft: isMobile ? '14px' : isTablet ? '30px' : '40px',
          }}>
          <h3 style={{
            fontFamily: "'Unbounded', sans-serif",
            fontSize: isMobile ? '19px' : '20px',
            fontWeight: 500,
            color: '#1a1a2e',
            lineHeight: 1.3,
            letterSpacing: isMobile ? '-0.5px' : '-1px',
            marginBottom: isMobile ? '8px' : '12px',
            marginTop: 0,
            textAlign: isMobile ? 'center' : 'left',
          }}>
            За 1 час Алексей лично разберёт ваш маркетинг по инженерному методу
          </h3>
          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: isMobile ? '16px' : '16px',
            fontWeight: 400,
            color: '#7a7f8a',
            lineHeight: 1.5,
            marginBottom: isMobile ? '16px' : '20px',
            marginTop: 0,
            textAlign: isMobile ? 'center' : 'left',
          }}>
            Соберёте маркетинг в понятную систему и уйдёте с пониманием, что делать на ближайшие месяцы, чтобы росла выручка.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              'Поймёте, почему маркетинг не даёт результата — и что с этим делать',
              'Получите план: что делать в первую очередь, а что можно не трогать',
              'Сверите гипотезы с опытом 300+ бизнесов — и не потеряете деньги',
            ].map((item, idx) => (
              <li key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                gap: isMobile ? '8px' : '10px',
                padding: isMobile ? '2px 0' : '3px 0',
                fontFamily: "'Manrope', sans-serif",
                fontSize: isMobile ? '13px' : '14px',
                fontWeight: 400,
                color: '#1a1a2e',
                lineHeight: 1.4,
              }}>
                <svg width={isMobile ? 14 : 16} height={isMobile ? 14 : 16} viewBox="0 0 22 22" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="11" cy="11" r="10" stroke="#c8f542" strokeWidth="2" fill="none" />
                  <path d="M7 11.5L9.5 14L15 8.5" stroke="#7a7f8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          </div>
          {/* Салатовая плашка: теги + цена + кнопка */}
          <div style={{
            background: '#c8f542',
            border: '1px dashed #d1d5db',
            borderRadius: isMobile ? '16px' : '20px',
            padding: isMobile ? '20px 14px' : '18px 20px',
            marginTop: isMobile ? '-16px' : '20px',
            position: isMobile ? 'relative' : 'static',
            zIndex: isMobile ? 2 : 'auto',
            marginLeft: isMobile ? 0 : isTablet ? '-12px' : '-20px',
            paddingLeft: isMobile ? '14px' : isTablet ? '30px' : '40px',
          }}>
            {/* Артефакты — теги с иконками */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr',
              gap: '5px',
              maxWidth: isMobile ? '100%' : '460px',
              marginBottom: isMobile ? '14px' : '18px',
            }}>
              {[
                { icon: <path d="M9 1a8 8 0 110 16A8 8 0 019 1zm0 3v5.5l3 1.5" stroke="#4a4a5a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />, text: 'Часовой созвон' },
                { icon: <><path d="M9 1a8 8 0 110 16A8 8 0 019 1z" stroke="#4a4a5a" strokeWidth="1.4" fill="none" /><path d="M5.5 9H12.5M9 5.5V12.5" stroke="#4a4a5a" strokeWidth="1.2" strokeLinecap="round" /><rect x="6" y="6" width="6" height="6" rx="0.5" stroke="#4a4a5a" strokeWidth="1" fill="none" /></>, text: 'Инженерная схема маркетинга' },
                { icon: <><path d="M9 1a8 8 0 110 16A8 8 0 019 1z" stroke="#4a4a5a" strokeWidth="1.4" fill="none" /><path d="M6 6.5H12M6 9H10.5M6 11.5H8.5" stroke="#4a4a5a" strokeWidth="1.3" strokeLinecap="round" /></>, text: 'План действий на месяц' },
                { icon: <><path d="M9 1a8 8 0 110 16A8 8 0 019 1z" stroke="#4a4a5a" strokeWidth="1.4" fill="none" /><path d="M6 13L9 6l3 7M7 11h4" stroke="#4a4a5a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" /></>, text: 'Смета на 3 месяца' },
                { icon: <><path d="M9 1a8 8 0 110 16A8 8 0 019 1z" stroke="#4a4a5a" strokeWidth="1.4" fill="none" /><circle cx="7.5" cy="7.5" r="1.5" stroke="#4a4a5a" strokeWidth="1.1" fill="none" /><circle cx="10.5" cy="7.5" r="1.5" stroke="#4a4a5a" strokeWidth="1.1" fill="none" /><path d="M5 13c0-1.5 1.2-2.5 2.5-2.5 .6 0 1.1.1 1.5.4.4-.3.9-.4 1.5-.4C11.8 10.5 13 11.5 13 13" stroke="#4a4a5a" strokeWidth="1.1" strokeLinecap="round" fill="none" /></>, text: 'Рекомендации по найму' },
                { icon: <><path d="M9 1a8 8 0 110 16A8 8 0 019 1z" stroke="#4a4a5a" strokeWidth="1.4" fill="none" /><path d="M5 12V8.5L9 6l4 2.5V12" stroke="#4a4a5a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" /><path d="M7.5 12V10h3v2" stroke="#4a4a5a" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" fill="none" /></>, text: 'Неделя поддержки от Алексея' },
              ].map((item, idx) => (
                <span key={idx} style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: isMobile ? '4px 8px' : '5px 10px',
                  background: '#f0f0f3',
                  borderRadius: '16px',
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: isMobile ? '8px' : '12px',
                  fontWeight: 500,
                  color: '#1a1a2e',
                  whiteSpace: 'nowrap',
                }}>
                  <svg width={isMobile ? 12 : 13} height={isMobile ? 12 : 13} viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
                    {item.icon}
                  </svg>
                  {item.text}
                </span>
              ))}
            </div>

            {/* Цена + CTA кнопка */}
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'center' : 'flex-end',
              gap: isMobile ? '16px' : '40px',
            }}>
              {/* Блок цены */}
              <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
                <div style={{
                  fontFamily: "'Unbounded', sans-serif",
                  fontSize: isMobile ? '17px' : '20px',
                  fontWeight: 500,
                  color: '#1a1a2e',
                  lineHeight: 1,
                  letterSpacing: isMobile ? '-0.5px' : '-1px',
                  marginBottom: '-2px',
                }}>
                  Всё это за
                </div>
                <div style={{
                  fontFamily: "'Unbounded', sans-serif",
                  fontSize: isMobile ? '33px' : isTablet ? '32px' : '50px',
                  whiteSpace: 'nowrap',
                  fontWeight: 800,
                  color: '#1a1a2e',
                  lineHeight: 1,
                  letterSpacing: isMobile ? '-1px' : '-2px',
                }}>
                  2 000 ₽
                </div>
                <div style={{
                  fontFamily: "'Unbounded', sans-serif",
                  fontSize: isMobile ? '14px' : '16px',
                  fontWeight: 500,
                  color: '#4a4a5a',
                  lineHeight: 1,
                  letterSpacing: isMobile ? '-0.5px' : '-1px',
                  marginTop: '-2px',
                }}>
                  вместо <span style={{ textDecoration: 'line-through' }}>15 000 ₽</span>
                </div>
              </div>

              {/* CTA кнопка */}
              <button
                onClick={handleCTA}
                style={{
                  padding: isMobile ? '24px 48px' : '18px 40px',
                  width: isMobile ? '100%' : 'auto',
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: isMobile ? '18px' : '17px',
                  fontWeight: isMobile ? 700 : 600,
                  background: expired ? '#7a7f8a' : '#1a1a2e',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: expired ? 'default' : 'pointer',
                  transition: 'all 0.2s',
                  opacity: expired ? 0.6 : 1,
                  flexShrink: 0,
                }}
                onMouseOver={(e) => {
                  if (!expired) {
                    e.target.style.transform = 'scale(1.04)';
                  }
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'scale(1)';
                }}
              >
                Записаться на аудит
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// ============================================
// СЕКЦИЯ "БОНУСЫ" (из лендинга — Steps Section)
// ============================================

function LandingStepsSection({ isMobile, results, answers, onBonusSubmit }) {
  const isTablet = typeof window !== 'undefined' && window.innerWidth > 768 && window.innerWidth <= 1100;
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [formWarning, setFormWarning] = useState(false);
  const [bonusSent, setBonusSent] = useState(false);

  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '');
    let d = digits;
    if (d.startsWith('8')) d = '7' + d.slice(1);
    if (!d.startsWith('7')) d = '7' + d;
    d = d.slice(0, 11);
    let result = '+7';
    if (d.length > 1) result += ' (' + d.slice(1, 4);
    if (d.length > 4) result += ') ' + d.slice(4, 7);
    if (d.length > 7) result += '-' + d.slice(7, 9);
    if (d.length > 9) result += '-' + d.slice(9, 11);
    return result;
  };

  const getRawPhone = (formatted) => {
    return formatted.replace(/\D/g, '');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name || name.trim().length < 2) {
      newErrors.name = 'Введите имя (минимум 2 символа)';
    }
    const digits = getRawPhone(phone);
    if (digits.length !== 11) {
      newErrors.phone = 'Введите номер телефона полностью';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrors({});
    try {
      if (onBonusSubmit) {
        await onBonusSubmit(name.trim(), phone.trim());
      }
      setBonusSent(true);
      window.open('https://t.me/dobrusin_promarketing_bot?start=bonuses', '_blank');
    } catch (error) {
      console.error('Ошибка отправки в Telegram:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const bonuses = [
    {
      label: '// Бонус 01',
      number: '01',
      dots: [true, false, false],
      text: 'Схема в Miro «Система маркетинга на 120 млн ₽»',
      image: '/landing/assets/images/b_1.png',
    },
    {
      label: '// Бонус 02',
      number: '02',
      dots: [true, true, false],
      text: 'Голосовые рекомендации от Алексея по результатам',
      image: '/landing/assets/images/b_2.jpg',
    },
    {
      label: '// Бонус 03',
      number: '03',
      dots: [true, true, true],
      text: 'Видеоурок «Основы инженерного маркетинга»',
      image: '/landing/assets/images/b_3.png',
    },
  ];

  const cardGap = isMobile ? '10px' : '12px';

  const renderBonusCard = (bonus, idx, compact, dark) => (
    <div key={idx} style={{
      border: dark ? 'none' : '1px dashed #d1d5db',
      borderRadius: '16px',
      padding: isMobile ? '16px 12px 12px' : '16px 14px 14px',
      background: dark ? '#1a1a2e' : '#fafafa',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: isMobile ? '10px' : '16px',
        padding: '0 8px',
      }}>
        <span style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: '13px',
          fontWeight: 400,
          color: dark ? 'rgba(255,255,255,0.5)' : '#7a7f8a',
        }}>
          {bonus.label}
        </span>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
          <span style={{
            fontFamily: "'Unbounded', sans-serif",
            fontSize: '16px',
            fontWeight: 600,
            color: dark ? '#fff' : '#1a1a2e',
            lineHeight: 1,
          }}>
            {bonus.number}
          </span>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            {bonus.dots.map((active, i) => (
              <span key={i} style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: active ? '#c8f542' : '#d1d5db',
              }} />
            ))}
          </div>
        </div>
      </div>
      <p style={{
        fontFamily: "'Manrope', sans-serif",
        fontSize: isMobile ? '17px' : '16px',
        fontWeight: 500,
        color: dark ? 'rgba(255,255,255,0.6)' : '#7a7f8a',
        lineHeight: 1.4,
        marginBottom: isMobile ? '12px' : '16px',
        marginTop: isMobile ? '10px' : '24px',
        padding: '0 8px',
      }}>
        {bonus.text}
      </p>
      <div style={{
        borderRadius: '12px',
        overflow: 'hidden',
        marginTop: 'auto',
        height: compact ? (isMobile ? '80px' : '100px') : (isMobile ? '100px' : '130px'),
        flexShrink: 0,
      }}>
        <img
          src={bonus.image}
          alt={bonus.text}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
            display: 'block',
          }}
        />
      </div>
    </div>
  );

  const btnBase = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '14px',
    padding: '24px 36px',
    background: '#1a1a2e',
    color: '#fff',
    fontFamily: "'Manrope', sans-serif",
    fontSize: '17px',
    fontWeight: 600,
    borderRadius: '16px',
    border: 'none',
    whiteSpace: 'nowrap',
    transition: 'box-shadow 0.3s ease, transform 0.25s ease, background 0.3s ease, color 0.3s ease',
    cursor: 'pointer',
    width: '100%',
  };

  const btnHover = {
    background: '#c8f542',
    color: '#1a1a2e',
    boxShadow: '0 8px 28px rgba(200, 245, 66, 0.35)',
    transform: 'scale(1.04)',
  };

  return (
    <div style={{
      paddingBottom: isMobile ? '80px' : '150px',
    }}>
      {/* Heading */}
      <div style={{
        marginBottom: isMobile ? '24px' : '60px',
        textAlign: isMobile ? 'center' : 'left',
      }}>
        <h2 style={{
          fontFamily: "'Unbounded', sans-serif",
          fontSize: isMobile ? '28px' : isTablet ? '36px' : '55px',
          fontWeight: 600,
          color: '#1a1a2e',
          lineHeight: 1.1,
          letterSpacing: isMobile ? '-1px' : isTablet ? '-1.5px' : '-2px',
          margin: 0,
          position: 'relative',
          zIndex: 0,
        }}>
          Заберите 3{' '}
          <span style={{ position: 'relative', display: 'inline' }}>
            бонуса
            <span style={{
              content: '""',
              position: 'absolute',
              left: 0, right: 0, top: '22%', bottom: '12%',
              background: '#c8f542',
              transform: 'rotate(4.5deg)',
              zIndex: -1,
              borderRadius: '4px',
            }} />
          </span>
        </h2>
      </div>

      {/* Two-column layout: cards + form */}
      <div style={{
        display: isMobile ? 'flex' : 'grid',
        flexDirection: isMobile ? 'column' : undefined,
        gridTemplateColumns: isMobile ? undefined : isTablet ? '1.5fr 0.9fr' : '2.2fr 0.9fr',
        gap: isMobile ? '16px' : cardGap,
        alignItems: 'stretch',
      }}>
        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: cardGap,
          order: 1,
        }}>
          {bonuses.map((bonus, idx) => renderBonusCard(bonus, idx, false, idx === 0))}
        </div>

        {/* Right column: Form on lime card */}
        <div style={{
          background: '#c8f542',
          borderRadius: '16px',
          padding: isMobile ? '24px 20px' : '32px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          order: 2,
          position: 'relative',
          overflow: 'visible',
          justifyContent: bonusSent ? 'center' : undefined,
          alignItems: bonusSent ? 'center' : undefined,
        }}>
          {bonusSent ? (
            <>
              <div style={{
                width: isMobile ? '64px' : '72px',
                height: isMobile ? '64px' : '72px',
                borderRadius: '50%',
                background: '#1a1a2e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
              }}>
                <svg width={isMobile ? 30 : 36} height={isMobile ? 30 : 36} viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="#c8f542" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p style={{
                fontFamily: "'Unbounded', sans-serif",
                fontSize: isMobile ? '18px' : '16px',
                fontWeight: 600,
                color: '#1a1a2e',
                margin: 0,
                textAlign: 'center',
              }}>
                Бонусы получены
              </p>
            </>
          ) : (
            <>
              <p style={{
                fontFamily: "'Unbounded', sans-serif",
                fontSize: isMobile ? '19px' : '16px',
                fontWeight: 500,
                color: '#1a1a2e',
                margin: '0 0 8px 0',
                lineHeight: 1.4,
                textAlign: 'left',
              }}>
                Получите свои материалы<br />в Telegram
              </p>

              <div>
                <input
                  type="text"
                  placeholder="Имя *"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({...errors, name: null});
                  }}
                  aria-label="Введите ваше имя"
                  aria-required="true"
                  style={{
                    width: '100%',
                    padding: isMobile ? '16px 20px' : '14px 18px',
                    fontSize: isMobile ? '16px' : '15px',
                    background: '#fff',
                    border: errors.name ? '2px solid #ef4444' : '1px solid #e5e5e5',
                    borderRadius: '10px',
                    color: '#1a1a2e',
                    outline: 'none',
                    fontFamily: "'Manrope', sans-serif",
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => { e.target.style.outline = '2px solid #c8f542'; e.target.style.outlineOffset = '2px'; }}
                  onBlur={(e) => { e.target.style.outline = 'none'; }}
                />
                {errors.name && (
                  <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }} role="alert">{errors.name}</div>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Телефон *"
                  value={phone}
                  onChange={(e) => {
                    setPhone(formatPhone(e.target.value));
                    if (errors.phone) setErrors({...errors, phone: null});
                  }}
                  onFocus={(e) => {
                    if (!phone) setPhone('+7');
                    e.target.style.outline = '2px solid #c8f542'; e.target.style.outlineOffset = '2px';
                  }}
                  onBlur={(e) => {
                    if (phone === '+7') setPhone('');
                    e.target.style.outline = 'none';
                  }}
                  aria-label="Введите номер телефона"
                  aria-required="true"
                  style={{
                    width: '100%',
                    padding: isMobile ? '16px 20px' : '14px 18px',
                    fontSize: isMobile ? '16px' : '15px',
                    background: '#fff',
                    border: errors.phone ? '2px solid #ef4444' : '1px solid #e5e5e5',
                    borderRadius: '10px',
                    color: '#1a1a2e',
                    outline: 'none',
                    fontFamily: "'Manrope', sans-serif",
                    boxSizing: 'border-box',
                  }}
                />
                {errors.phone && (
                  <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }} role="alert">{errors.phone}</div>
                )}
              </div>

              <button
                onClick={() => {
                  if (!name.trim() || getRawPhone(phone).length !== 11) {
                    setFormWarning(true);
                    setTimeout(() => setFormWarning(false), 3000);
                    return;
                  }
                  setFormWarning(false);
                  handleSubmit();
                }}
                disabled={isSubmitting}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '14px',
                  padding: isMobile ? '24px 48px' : '14px 18px',
                  background: '#1a1a2e',
                  color: '#fff',
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: isMobile ? '18px' : '15px',
                  fontWeight: 700,
                  borderRadius: '12px',
                  border: 'none',
                  whiteSpace: 'nowrap',
                  transition: 'box-shadow 0.3s ease, transform 0.25s ease, background 0.3s ease',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  width: '100%',
                  marginTop: '8px',
                  ...(hoveredBtn === 'submit' && !isSubmitting ? { boxShadow: '0 8px 28px rgba(200, 245, 66, 0.35)', transform: 'scale(1.04)' } : {}),
                }}
                onMouseEnter={() => setHoveredBtn('submit')}
                onMouseLeave={() => setHoveredBtn(null)}
              >
                {isSubmitting ? 'Отправка...' : 'Забрать бонусы'}
              </button>

              {formWarning && (
                <div style={{
                  position: 'absolute',
                  bottom: '-40px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  padding: '8px 20px',
                  background: '#1a1a2e',
                  color: '#fff',
                  fontSize: '13px',
                  fontFamily: "'Manrope', sans-serif",
                  borderRadius: '8px',
                  whiteSpace: 'nowrap',
                  animation: 'toast-fade 3s ease forwards',
                  pointerEvents: 'none',
                }}>
                  Заполните поля формы
                </div>
              )}

              {submitStatus === 'error' && (
                <div style={{
                  position: 'absolute',
                  bottom: '-40px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  padding: '8px 20px',
                  background: '#1a1a2e',
                  color: '#ef4444',
                  fontSize: '13px',
                  fontFamily: "'Manrope', sans-serif",
                  borderRadius: '8px',
                  whiteSpace: 'nowrap',
                  animation: 'toast-fade 4s ease forwards',
                  pointerEvents: 'none',
                }}>
                  Ошибка отправки. Попробуйте снова
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
}

// ============================================
// ЭКРАН ПЛАТНОГО АУДИТА
// ============================================


// ============================================
// СЕКЦИЯ "ЕСЛИ УЗНАЁТЕ СЕБЯ"
// ============================================

function FeaturesSection({ isMobile, results }) {
  // Собираем все красные блоки, сортируем по уровню, берём первые 3
  const allRedBlocks = [];
  ['Стратегия', 'Лидген', 'Продажи'].forEach(section => {
    results.sections[section].blocks
      .filter(b => b.status === 'error')
      .forEach(b => allRedBlocks.push({ ...b, sectionName: section }));
  });
  allRedBlocks.sort((a, b) => a.level - b.level);
  const topRed = allRedBlocks.slice(0, 3);

  // Если все блоки зелёные — не рендерим секцию
  if (topRed.length === 0) return null;

  return (
    <div style={{ marginBottom: isMobile ? '80px' : '150px' }}>
      {/* Заголовок */}
      <h2 style={{
        fontFamily: "'Unbounded', sans-serif",
        fontSize: isMobile ? '28px' : '55px',
        fontWeight: 600,
        color: '#1a1a2e',
        lineHeight: 1.1,
        letterSpacing: isMobile ? '-1px' : '-2px',
        marginBottom: isMobile ? '32px' : '60px',
        textAlign: isMobile ? 'center' : 'left',
        position: 'relative',
        zIndex: 0
      }}>
        Сделайте это{isMobile ? ' ' : <br />}
        в течение{' '}
        <span style={{ position: 'relative', display: 'inline', zIndex: 0 }}>
          <span style={{
            position: 'absolute',
            left: 0, right: 0, top: '22%', bottom: '12%',
            background: '#c8f542',
            transform: 'rotate(4.5deg)',
            zIndex: -1,
            borderRadius: '4px'
          }} />
          месяца
        </span>
      </h2>

      <p style={{
        fontFamily: "'Manrope', sans-serif",
        fontSize: isMobile ? '16px' : '18px',
        fontWeight: 400,
        color: '#7a7f8a',
        lineHeight: 1.5,
        textAlign: isMobile ? 'center' : 'left',
        margin: 0,
        marginTop: isMobile ? '-20px' : '-44px',
        marginBottom: isMobile ? '32px' : '48px'
      }}>
        Шаги перед вами. Что делать — понятно.<br />
        Как сделать правильно с первого раза —<br />
        Алексей разберёт на персональном аудите.
      </p>

      {/* Уровни инструментов — каждый = пара карточек */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '32px' : '20px'
      }}>
        {topRed.map((block, idx) => {
          const iconFile = blockIconMap[block.title] || 'strategy.png';
          const cardStyle = {
            background: '#ffffff',
            border: '1px solid #e5e5e5',
            borderRadius: '16px',
            padding: isMobile ? '24px' : '28px',
            flex: 1,
            minHeight: isMobile ? 'auto' : '220px',
            display: 'flex',
            flexDirection: 'column'
          };
          const textStyle = {
            fontFamily: "'Manrope', sans-serif",
            fontSize: isMobile ? '15px' : '15px',
            fontWeight: 400,
            color: '#7a7f8a',
            lineHeight: 1.5,
            margin: 0
          };

          return (
            <div key={block.id} style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'center' : 'flex-start',
              gap: isMobile ? '12px' : '60px'
            }}>
              {/* Левая колонка: иконка + название */}
              <div style={{
                flex: isMobile ? 'none' : '0 0 320px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: isMobile ? 'center' : 'flex-start',
                gap: '4px'
              }}>
                <div style={{
                  width: isMobile ? '30px' : '47px',
                  height: isMobile ? '30px' : '47px',
                  overflow: 'hidden',
                  flexShrink: 0
                }}>
                  <img
                    src={`/landing/assets/icons/scanner/${iconFile}`}
                    alt=""
                    style={{
                      width: '140%',
                      height: '140%',
                      objectFit: 'contain',
                      display: 'block',
                      margin: '-20%'
                    }}
                  />
                </div>
                <h3 style={{
                  fontFamily: "'Unbounded', sans-serif",
                  fontSize: isMobile ? '19px' : '26px',
                  fontWeight: 600,
                  color: '#1a1a2e',
                  lineHeight: 1.1,
                  letterSpacing: '-1px',
                  margin: 0,
                  textAlign: isMobile ? 'center' : 'left'
                }}>
                  {idx === 0 ? 'Первый' : idx === 1 ? 'Второй' : 'Третий'} шаг
                  <br />
                  <span style={{ color: '#7a7f8a' }}>{block.title}</span>
                </h3>
                {block.no_step && (
                  <p style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: isMobile ? '17px' : '16px',
                    fontWeight: 500,
                    color: '#1a1a2e',
                    lineHeight: 1.5,
                    margin: 0,
                    marginTop: '8px',
                    textAlign: isMobile ? 'center' : 'left'
                  }}>
                    {block.no_step}
                  </p>
                )}
              </div>

              {/* Правая часть: две карточки */}
              <div style={{
                flex: isMobile ? 'none' : 1,
                width: isMobile ? '100%' : 'auto',
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: isMobile ? '0px' : '20px'
              }}>
                {/* Карточка: Почему это критично */}
                <div style={{
                  ...cardStyle,
                  background: '#1a1a2e',
                  border: '1px solid #1a1a2e',
                  ...(isMobile ? { borderRadius: '16px 16px 0 0' } : {})
                }}>
                  <div style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '13px',
                    fontWeight: 800,
                    color: '#ffffff',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '8px'
                  }}>
                    Почему это критично
                  </div>
                  <p style={{...textStyle, color: 'rgba(255,255,255,0.7)'}}>{block.no_rec}</p>
                </div>

                {/* Карточка: Что даст исправление */}
                <div style={{
                  ...cardStyle,
                  background: '#c8f542',
                  border: '1px solid #c8f542',
                  ...(isMobile ? { marginTop: '-12px', zIndex: 2, position: 'relative' } : {})
                }}>
                  <div style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '13px',
                    fontWeight: 800,
                    color: '#1a1a2e',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '8px'
                  }}>
                    Что даст исправление
                  </div>
                  <p style={{...textStyle, color: '#1a1a2e'}}>{block.yes_rec}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================
// ГЛАВНЫЙ КОМПОНЕНТ
// ============================================

export function ResultsScreen({ results, answers, onRestart }) {
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [telegramMessageId, setTelegramMessageId] = useState(null);
  const [bonusData, setBonusData] = useState(null);
  const [auditClicked, setAuditClicked] = useState(false);
  const telegramSent = useRef(false);

  useEffect(() => {
    const mqlMobile = window.matchMedia('(max-width: 899px)');
    const mqlTablet = window.matchMedia('(min-width: 900px) and (max-width: 1199px)');
    const onMobileChange = (e) => setIsMobile(e.matches);
    const onTabletChange = (e) => setIsTablet(e.matches);
    setIsMobile(mqlMobile.matches);
    setIsTablet(mqlTablet.matches);
    mqlMobile.addEventListener('change', onMobileChange);
    mqlTablet.addEventListener('change', onTabletChange);
    return () => {
      mqlMobile.removeEventListener('change', onMobileChange);
      mqlTablet.removeEventListener('change', onTabletChange);
    };
  }, []);

  // Отправка первого сообщения в Telegram при загрузке результатов
  useEffect(() => {
    if (telegramSent.current) return;
    telegramSent.current = true;

    const utm = getUtmData();
    const host = window.location.hostname;

    sendTelegramEvent({
      action: 'send',
      message_id: null,
      answers,
      results,
      utm,
      bonusData: null,
      auditClicked: false,
      hostname: host
    }).then(data => {
      if (data.message_id) {
        setTelegramMessageId(data.message_id);
        try { sessionStorage.setItem('zms_message_id', String(data.message_id)); } catch(e) {}
      }
    }).catch(err => {
      console.error('Failed to send initial Telegram message:', err);
    });
  }, []);

  // Обработчик отправки бонусной формы
  const handleBonusSubmit = async (name, phone) => {
    const newBonusData = { name, phone };
    setBonusData(newBonusData);

    const msgId = telegramMessageId || Number(sessionStorage.getItem('zms_message_id'));
    if (!msgId) return;

    const utm = getUtmData();
    const host = typeof window !== 'undefined' ? window.location.hostname : '';

    await sendTelegramEvent({
      action: 'edit',
      message_id: msgId,
      answers,
      results,
      utm,
      bonusData: newBonusData,
      auditClicked,
      hostname: host
    });
  };

  // Обработчик клика на аудит
  const handleAuditClick = async () => {
    setAuditClicked(true);

    const msgId = telegramMessageId || Number(sessionStorage.getItem('zms_message_id'));
    if (!msgId) return;

    const utm = getUtmData();
    const host = typeof window !== 'undefined' ? window.location.hostname : '';

    try {
      await sendTelegramEvent({
        action: 'edit',
        message_id: msgId,
        answers,
        results,
        utm,
        bonusData,
        auditClicked: true,
        hostname: host
      });
    } catch (err) {
      console.error('Failed to edit Telegram message (audit):', err);
    }
  };

  const handleDeselectBlock = () => setSelectedBlock(null);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f5f7'
    }}>
      <header style={{
        padding: isMobile ? '20px 20px' : isTablet ? '20px 32px' : '20px 60px',
        maxWidth: '1320px',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}>
        <a href="/landing/index.html" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none'
        }}>
          <img src="/landing/assets/icons/crosshair.svg" alt="" width="28" height="28" />
          <span style={{
            fontFamily: "'ClashDisplay', sans-serif",
            fontSize: '19px',
            fontWeight: 600,
            color: '#1a1a2e',
            letterSpacing: '-0.3px'
          }}>
            MetodZMS
          </span>
        </a>
      </header>

      <main style={{
        padding: isMobile ? '0 20px' : isTablet ? '0 32px' : '0 60px',
        maxWidth: '1320px',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}>
        {(() => {
          const totalBlocks = Object.values(results.sections).reduce((sum, s) => sum + s.blocks.length, 0);
          const totalGreen = Object.values(results.sections).reduce((sum, s) => sum + s.totalGreen, 0);
          const totalRed = totalBlocks - totalGreen;
          const overallPercent = Math.round((totalGreen / totalBlocks) * 100);

          const summaryCard = (
            <div style={{
              background: '#1a1a2e',
              borderRadius: '16px',
              padding: isMobile ? '20px 24px' : '24px 32px',
              flexShrink: 0,
              minWidth: isMobile ? 'auto' : '260px',
              width: isMobile ? '100%' : 'auto',
              boxSizing: 'border-box'
            }}>
              <div style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '13px',
                fontWeight: 800,
                color: 'rgba(255,255,255,0.5)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '8px'
              }}>
                Эффективность системы
              </div>
              <div style={{
                fontFamily: "'Unbounded', sans-serif",
                fontSize: isMobile ? '36px' : '48px',
                fontWeight: 600,
                color: '#c8f542',
                lineHeight: 1,
                marginBottom: '16px'
              }}>
                {overallPercent}%
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.7)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}>
                  <span>В зелёной зоне</span>
                  <span style={{ color: '#22c55e', fontWeight: 700 }}>{totalGreen}</span>
                </div>
                <div style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.7)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}>
                  <span>В красной зоне</span>
                  <span style={{ color: '#ef4444', fontWeight: 700 }}>{totalRed}</span>
                </div>
              </div>
            </div>
          );

          return (isMobile || isTablet) ? (
            <div style={{
              marginBottom: isMobile ? '48px' : '60px',
              paddingTop: isMobile ? '40px' : '60px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px'
            }}>
              <h1 style={{
                fontFamily: "'Unbounded', sans-serif",
                fontSize: isMobile ? '28px' : '40px',
                fontWeight: 600,
                color: '#1a1a2e',
                margin: 0,
                lineHeight: 1.1,
                letterSpacing: '-1px',
                textAlign: 'center'
              }}>
                Ваши{' '}
                <span style={{ position: 'relative', display: 'inline', zIndex: 0 }}>
                  <span style={{
                    position: 'absolute',
                    left: 0, right: 0, top: '22%', bottom: '12%',
                    background: '#c8f542',
                    transform: 'rotate(4.5deg)',
                    zIndex: -1,
                    borderRadius: '4px'
                  }} />
                  результаты
                </span>
              </h1>
              <div style={{ width: isMobile ? '100%' : '320px' }}>
                {summaryCard}
              </div>
              <p style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: isMobile ? '18px' : '18px',
                fontWeight: 600,
                color: '#4a4a5a',
                margin: 0,
                lineHeight: 1.4,
                textAlign: 'center',
                maxWidth: '520px'
              }}>
                <span style={{ display: 'inline-block', animation: 'finger-point 1.5s ease-in-out infinite', fontSize: '1.2em' }}>👉</span>
                {' '}Нажимайте на{' '}
                <span style={{ color: '#22c55e', fontWeight: 800, display: 'inline-block', animation: 'word-pulse 2s ease-in-out infinite' }}>зеленые</span>
                {' '}и{' '}
                <span style={{ color: '#ef4444', fontWeight: 800, display: 'inline-block', animation: 'word-pulse 2s ease-in-out infinite 0.5s' }}>красные</span>
                {' '}блоки, чтобы увидеть персональные рекомендации.{totalRed > 0 ? ' Ниже перечислены приоритетные шаги на ближайший месяц.' : ''}
              </p>
            </div>
          ) : (
            <div style={{
              marginBottom: '80px',
              paddingTop: '80px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '40px'
            }}>
              <div style={{ maxWidth: '620px' }}>
                <h1 style={{
                  fontFamily: "'Unbounded', sans-serif",
                  fontSize: isTablet ? '40px' : '55px',
                  fontWeight: 600,
                  color: '#1a1a2e',
                  margin: '0 0 12px 0',
                  lineHeight: 1.1,
                  letterSpacing: '-1px'
                }}>
                  Ваши{' '}
                  <span style={{ position: 'relative', display: 'inline', zIndex: 0 }}>
                    <span style={{
                      position: 'absolute',
                      left: 0, right: 0, top: '22%', bottom: '12%',
                      background: '#c8f542',
                      transform: 'rotate(4.5deg)',
                      zIndex: -1,
                      borderRadius: '4px'
                    }} />
                    результаты
                  </span>
                </h1>
                <p style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#4a4a5a',
                  margin: 0,
                  lineHeight: 1.4
                }}>
                  <span style={{ display: 'inline-block', animation: 'finger-point 1.5s ease-in-out infinite', fontSize: '1.2em' }}>👉</span>
                  {' '}Нажимайте на{' '}
                  <span style={{ color: '#22c55e', fontWeight: 800, display: 'inline-block', animation: 'word-pulse 2s ease-in-out infinite' }}>зеленые</span>
                  {' '}и{' '}
                  <span style={{ color: '#ef4444', fontWeight: 800, display: 'inline-block', animation: 'word-pulse 2s ease-in-out infinite 0.5s' }}>красные</span>
                  {' '}блоки, чтобы увидеть персональные рекомендации.{totalRed > 0 ? ' Ниже перечислены приоритетные шаги на ближайший месяц.' : ''}
                </p>
              </div>
              {summaryCard}
            </div>
          );
        })()}

        {['Стратегия', 'Лидген', 'Продажи'].map(section => (
          isMobile ? (
            <SectionTrackVertical
              key={section}
              section={section === 'Стратегия' ? 'СТРАТЕГИЧЕСКИЙ МАРКЕТИНГ' :
                       section === 'Лидген' ? 'ГЕНЕРАЦИЯ ЛИДОВ' : 'ПРОДАЖИ'}
              sectionKey={section}
              blocks={results.sections[section].blocks}
              selectedBlock={selectedBlock}
              onSelectBlock={setSelectedBlock}
              onDeselectBlock={handleDeselectBlock}
            />
          ) : (
            <SectionTrackHorizontal
              key={section}
              section={section === 'Стратегия' ? 'СТРАТЕГИЧЕСКИЙ МАРКЕТИНГ' :
                       section === 'Лидген' ? 'ГЕНЕРАЦИЯ ЛИДОВ' : 'ПРОДАЖИ'}
              sectionKey={section}
              blocks={results.sections[section].blocks}
              selectedBlock={selectedBlock}
              onSelectBlock={setSelectedBlock}
              onDeselectBlock={handleDeselectBlock}
              isTablet={isTablet}
            />
          )
        ))}

        {/* Секция "Если узнаёте себя" — скопирована с лендинга */}
        <div style={{ paddingTop: isMobile ? '56px' : '126px' }}>
          <FeaturesSection isMobile={isMobile} results={results} />
        </div>

        {/* Секция "Алексей Добрусин" — предложение 15 минут */}
        <CareerSection isMobile={isMobile} onAuditClick={handleAuditClick} />

        {/* Секция "Бонусы" — форма + карточки */}
        <LandingStepsSection isMobile={isMobile} results={results} answers={answers} onBonusSubmit={handleBonusSubmit} />
      </main>

      {/* Футер — на всю ширину, как на лендинге */}
      <footer style={{
        background: '#1a1a2e',
        padding: '32px 0 28px',
        marginTop: isMobile ? 56 : 80,
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
        }}>
          {/* Логотип */}
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <img
              src="/landing/assets/icons/crosshair.svg"
              alt=""
              style={{
                width: 22, height: 22,
                filter: 'brightness(0) saturate(100%) invert(85%) sepia(30%) saturate(600%) hue-rotate(40deg) brightness(105%) contrast(105%)',
              }}
            />
            <span style={{ fontFamily: 'Unbounded, sans-serif', fontSize: 16, fontWeight: 600, color: '#fff' }}>MetodZMS</span>
          </a>

          {/* Ссылки */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            gap: isMobile ? 6 : 8,
          }}>
            <a href="/privacy" style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 400, color: '#7a7f8a', textDecoration: 'none' }}>Политика конфиденциальности</a>
            {!isMobile && <span style={{ color: '#7a7f8a', fontSize: 13 }}>·</span>}
            <a href="/offer" style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 400, color: '#7a7f8a', textDecoration: 'none' }}>Оферта</a>
          </div>

          {/* Копирайт */}
          <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, fontWeight: 400, color: '#4a4e57', margin: 0 }}>© 2025 Алексей Добрусин</p>
        </div>
      </footer>
    </div>
  );
}
