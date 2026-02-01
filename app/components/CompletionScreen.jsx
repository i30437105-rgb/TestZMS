'use client';
import { useState, useEffect } from 'react';

export function CompletionScreen({ onViewResults }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return (
    <div style={{
      height: 'var(--app-height, 100vh)',
      background: '#f5f5f7',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '16px 20px' : '24px 20px',
      position: 'relative',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      {/* Декоративные элементы */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(200,245,66,0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '10%',
        width: '250px',
        height: '250px',
        background: 'radial-gradient(circle, rgba(200,245,66,0.04) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(50px)',
        pointerEvents: 'none'
      }} />

      {/* Контент */}
      <div style={{
        textAlign: 'center',
        maxWidth: '500px',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Кубок с конфетти */}
        <div style={{
          position: 'relative',
          marginBottom: isMobile ? '20px' : '24px'
        }}>
          {/* Конфетти — разные формы и размеры */}
          {[
            { w: 8, h: 8, r: '50%', bg: '#c8f542', anim: 'conf0', dur: 2.2, del: 0 },
            { w: 6, h: 12, r: '2px', bg: '#eab308', anim: 'conf1', dur: 2.5, del: 0.3 },
            { w: 10, h: 10, r: '50%', bg: '#c8f542', anim: 'conf2', dur: 2.0, del: 0.6 },
            { w: 5, h: 14, r: '2px', bg: '#ef4444', anim: 'conf3', dur: 2.8, del: 0.2 },
            { w: 12, h: 6, r: '2px', bg: '#4299e1', anim: 'conf4', dur: 2.3, del: 0.8 },
            { w: 7, h: 7, r: '50%', bg: '#eab308', anim: 'conf5', dur: 2.6, del: 0.1 },
            { w: 6, h: 14, r: '2px', bg: '#c8f542', anim: 'conf6', dur: 2.4, del: 0.5 },
            { w: 9, h: 9, r: '50%', bg: '#ef4444', anim: 'conf7', dur: 2.1, del: 0.7 },
            { w: 5, h: 12, r: '2px', bg: '#4299e1', anim: 'conf8', dur: 2.7, del: 0.4 },
            { w: 11, h: 5, r: '2px', bg: '#eab308', anim: 'conf9', dur: 2.3, del: 0.9 },
            { w: 8, h: 8, r: '50%', bg: '#c8f542', anim: 'conf10', dur: 2.5, del: 1.1 },
            { w: 6, h: 13, r: '2px', bg: '#ef4444', anim: 'conf11', dur: 2.0, del: 1.3 },
          ].map((c, i) => (
            <span key={i} style={{
              position: 'absolute',
              left: '50%',
              top: '40%',
              width: `${c.w}px`,
              height: `${c.h}px`,
              borderRadius: c.r,
              background: c.bg,
              opacity: 0,
              animation: `${c.anim} ${c.dur}s ease-out ${c.del}s infinite`,
              pointerEvents: 'none',
              zIndex: 0
            }} />
          ))}
          <div style={{
            fontSize: isMobile ? '64px' : '80px',
            animation: 'pulse 2s ease-in-out infinite',
            position: 'relative',
            zIndex: 1
          }}>
            🏆
          </div>
        </div>

        {/* Заголовок */}
        <h1 style={{
          fontFamily: "'Unbounded', sans-serif",
          fontSize: isMobile ? '28px' : '55px',
          fontWeight: 600,
          color: '#1a1a2e',
          marginBottom: '16px',
          lineHeight: 1.1,
          letterSpacing: '-1px'
        }}>
          Поздравляем!
        </h1>

        {/* Подзаголовок */}
        <p style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: isMobile ? '16px' : '18px',
          color: '#7a7f8a',
          fontWeight: 600,
          marginTop: 0,
          marginBottom: '4px'
        }}>
          {isMobile ? (<>Вы прошли тест до конца<br />и достигли 4-го ранга</>) : 'Вы прошли тест до конца и достигли 4-го ранга'}
        </p>

        {/* Ранг */}
        <p style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: isMobile ? '16px' : '18px',
          color: '#1a1a2e',
          fontWeight: 700,
          marginTop: 0,
          marginBottom: isMobile ? '20px' : '24px'
        }}>
          <span style={{ fontSize: isMobile ? '20px' : '22px' }}>🎖️</span> «Целеустремлённый лидер»
        </p>

        {/* Описание */}
        <p style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: isMobile ? '14px' : '15px',
          color: '#7a7f8a',
          lineHeight: 1.6,
          marginBottom: isMobile ? '28px' : '32px'
        }}>
          Вы вошли в 36% тех, кто не сдался и прошёл диагностику до конца.
          Теперь вы можете увидеть детальный анализ вашего маркетинга.
        </p>

        {/* Кнопка */}
        <button
          onClick={(e) => {
            e.currentTarget.blur();
            onViewResults();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.currentTarget.blur();
              onViewResults();
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
          aria-label="Смотреть результаты теста"
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
          Смотреть результаты
        </button>
      </div>

      {/* CSS анимация */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes conf0 {
          0% { transform: translate(-50%, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(calc(-50% - 80px), -120px) rotate(200deg); opacity: 0; }
        }
        @keyframes conf1 {
          0% { transform: translate(-50%, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(calc(-50% + 90px), -100px) rotate(-180deg); opacity: 0; }
        }
        @keyframes conf2 {
          0% { transform: translate(-50%, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(calc(-50% - 110px), -60px) rotate(150deg); opacity: 0; }
        }
        @keyframes conf3 {
          0% { transform: translate(-50%, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(calc(-50% + 120px), -80px) rotate(-250deg); opacity: 0; }
        }
        @keyframes conf4 {
          0% { transform: translate(-50%, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(calc(-50% - 50px), -140px) rotate(300deg); opacity: 0; }
        }
        @keyframes conf5 {
          0% { transform: translate(-50%, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(calc(-50% + 60px), -130px) rotate(-160deg); opacity: 0; }
        }
        @keyframes conf6 {
          0% { transform: translate(-50%, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(calc(-50% - 100px), -90px) rotate(220deg); opacity: 0; }
        }
        @keyframes conf7 {
          0% { transform: translate(-50%, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(calc(-50% + 100px), -110px) rotate(-280deg); opacity: 0; }
        }
        @keyframes conf8 {
          0% { transform: translate(-50%, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(calc(-50% - 70px), -135px) rotate(190deg); opacity: 0; }
        }
        @keyframes conf9 {
          0% { transform: translate(-50%, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(calc(-50% + 130px), -50px) rotate(-200deg); opacity: 0; }
        }
        @keyframes conf10 {
          0% { transform: translate(-50%, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(calc(-50% - 130px), -70px) rotate(270deg); opacity: 0; }
        }
        @keyframes conf11 {
          0% { transform: translate(-50%, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(calc(-50% + 70px), -145px) rotate(-310deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
