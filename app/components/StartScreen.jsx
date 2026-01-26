'use client';
import { useState, useEffect } from 'react';

export function StartScreen({ onStart }) {
  const [isMobile, setIsMobile] = useState(false);

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
      background: 'linear-gradient(180deg, #0a0a0a 0%, #111 100%)',
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
        background: 'radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)',
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
        background: 'radial-gradient(circle, rgba(234,179,8,0.05) 0%, transparent 70%)',
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
          fontFamily: 'monospace',
          fontSize: isMobile ? '10px' : '12px',
          color: '#555',
          letterSpacing: isMobile ? '2px' : '3px',
          marginBottom: isMobile ? '16px' : '24px',
          textTransform: 'uppercase'
        }}>
          METHOD ZMS
        </div>

        {/* Заголовок */}
        <h1 style={{
          fontSize: 'clamp(24px, 6vw, 42px)',
          fontWeight: 800,
          marginBottom: isMobile ? '16px' : '20px',
          color: '#fff',
          lineHeight: 1.1
        }}>
          Краш-тест маркетинга
        </h1>

        {/* Дескриптор */}
        <p style={{
          fontSize: isMobile ? '14px' : '15px',
          color: '#888',
          marginBottom: '24px',
          lineHeight: 1.6,
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
                  background: '#333',
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
              background: '#555',
              flexShrink: 0
            }} />
            <span style={{ fontSize: '11px', color: '#777' }}>25 вопросов по принципу «Да/Нет»</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ 
              width: '5px', 
              height: '5px', 
              borderRadius: '50%', 
              background: '#555',
              flexShrink: 0
            }} />
            <span style={{ fontSize: '11px', color: '#777' }}>3 уровня — Стратегия, Лидген, Продажи</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ 
              width: '5px', 
              height: '5px', 
              borderRadius: '50%', 
              background: '#555',
              flexShrink: 0
            }} />
            <span style={{ fontSize: '11px', color: '#777' }}>Войдите в 36% тех, кто дошел до финиша</span>
          </div>
        </div>

        {/* Кнопка */}
        <button
          onClick={onStart}
          style={{
            minHeight: '44px',
            padding: isMobile ? '14px 36px' : '18px 48px',
            fontSize: isMobile ? '15px' : '16px',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 20px rgba(34, 197, 94, 0.3)'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 30px rgba(34, 197, 94, 0.4)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 20px rgba(34, 197, 94, 0.3)';
          }}
        >
          Начать аудит →
        </button>
      </div>
    </div>
  );
}
