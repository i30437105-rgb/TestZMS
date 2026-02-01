'use client';
import { useState, useEffect } from 'react';

export function StartScreen({ onStart }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const icons = [
    '/icons/flag.png',
    '/icons/bicep.png',
    '/icons/shield.png',
    '/icons/trophy.png'
  ];

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '30px 20px' : '40px 20px',
      background: '#f5f5f7',
      position: 'relative',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      {/* Декоративные элементы */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: isMobile ? '-20%' : '5%',
        width: isMobile ? '200px' : '300px',
        height: isMobile ? '200px' : '300px',
        background: 'radial-gradient(circle, rgba(200,245,66,0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: isMobile ? '-20%' : '5%',
        width: isMobile ? '200px' : '350px',
        height: isMobile ? '200px' : '350px',
        background: 'radial-gradient(circle, rgba(200,245,66,0.04) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
        boxSizing: 'border-box'
      }}>
        {/* Лейбл */}
        <div style={{
          fontFamily: "'Chakra Petch', sans-serif",
          fontSize: isMobile ? '10px' : '12px',
          color: '#7a7f8a',
          letterSpacing: isMobile ? '2px' : '3px',
          marginBottom: isMobile ? '16px' : '24px',
          textTransform: 'uppercase',
          fontWeight: 500
        }}>
          METHOD ZMS
        </div>

        {/* Заголовок */}
        <h1 style={{
          fontFamily: "'Unbounded', sans-serif",
          fontSize: isMobile ? '28px' : '55px',
          fontWeight: 600,
          marginBottom: isMobile ? '16px' : '20px',
          color: '#1a1a2e',
          lineHeight: 1.1,
          letterSpacing: '-1px'
        }}>
          Краш-тест маркетинга
        </h1>

        {/* Дескриптор */}
        <p style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: isMobile ? '14px' : '16px',
          color: '#7a7f8a',
          marginBottom: '24px',
          lineHeight: 1.5,
          fontWeight: 400,
          maxWidth: '440px',
          margin: isMobile ? '0 auto 20px' : '0 auto 24px'
        }}>
          Этот тест снимет розовые очки. Он покажет, в каком именно узле вы теряете деньги прямо сейчас и что конкретно исправить сегодня, чтобы завтра продажи пошли вверх.
        </p>

        {/* Иконки с линией — между дескриптором и булитами */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: isMobile ? '20px' : '24px',
          position: 'relative',
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box'
        }}>
          {icons.map((iconSrc, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: isMobile ? '32px' : '40px',
                height: isMobile ? '32px' : '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <img
                  src={iconSrc}
                  alt=""
                  style={{
                    width: isMobile ? '24px' : '32px',
                    height: isMobile ? '24px' : '32px'
                  }}
                />
              </div>
              {idx < icons.length - 1 && (
                <div style={{
                  width: isMobile ? '24px' : '50px',
                  height: '3px',
                  background: '#d1d5db',
                  borderRadius: '2px',
                  flexShrink: 0
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Булиты с точками — меньший шрифт */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginBottom: '28px',
          textAlign: 'left',
          maxWidth: '320px',
          margin: '0 auto 28px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: '#d1d5db',
              flexShrink: 0
            }} />
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '12px', color: '#7a7f8a', fontWeight: 400 }}>25 вопросов по принципу «Да/Нет»</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: '#d1d5db',
              flexShrink: 0
            }} />
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '12px', color: '#7a7f8a', fontWeight: 400 }}>3 уровня — Стратегия, Лидген, Продажи</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: '#d1d5db',
              flexShrink: 0
            }} />
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '12px', color: '#7a7f8a', fontWeight: 400 }}>Войдите в 36% тех, кто дошел до финиша</span>
          </div>
        </div>

        {/* Кнопка */}
        <button
          onClick={(e) => {
            e.currentTarget.blur();
            onStart();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.currentTarget.blur();
              onStart();
            }
          }}
          onMouseOver={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
          onFocus={(e) => {
            e.target.style.outline = '3px solid #c8f542';
            e.target.style.outlineOffset = '2px';
          }}
          onBlur={(e) => {
            e.target.style.outline = 'none';
          }}
          aria-label="Начать аудит маркетинга"
          style={{
            minHeight: isMobile ? '65px' : '44px',
            padding: isMobile ? '18px 33px' : '24px 36px',
            fontSize: isMobile ? '16px' : '17px',
            fontWeight: 600,
            fontFamily: "'Manrope', sans-serif",
            background: isHovered ? '#c8f542' : '#1a1a2e',
            color: isHovered ? '#1a1a2e' : '#ffffff',
            border: 'none',
            borderRadius: '16px',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            boxShadow: isHovered
              ? '0 10px 40px rgba(200,245,66,0.35)'
              : '0 4px 20px rgba(26,26,46,0.15)',
            transform: isHovered ? 'scale(1.04)' : 'scale(1)',
            outline: 'none',
            willChange: 'transform'
          }}
        >
          Начать аудит →
        </button>
      </div>
    </div>
  );
}
