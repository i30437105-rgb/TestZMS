'use client';

export function StartScreen({ onStart }) {
  const icons = [
    '/icons/flag.png',
    '/icons/bicep.png', 
    '/icons/shield.png',
    '/icons/trophy.png'
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '40px 20px', 
      background: 'linear-gradient(180deg, #0a0a0a 0%, #111 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Декоративные элементы */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '5%',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(234,179,8,0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)'
      }} />

      <div style={{ maxWidth: '500px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Лейбл */}
        <div style={{ 
          fontFamily: 'monospace', 
          fontSize: '12px', 
          color: '#555', 
          letterSpacing: '3px', 
          marginBottom: '24px',
          textTransform: 'uppercase'
        }}>
          METHOD ZMS
        </div>

        {/* Заголовок */}
        <h1 style={{ 
          fontSize: 'clamp(28px, 6vw, 42px)', 
          fontWeight: 800, 
          marginBottom: '20px', 
          color: '#fff',
          lineHeight: 1.1
        }}>
          Краш-тест маркетинга
        </h1>

        {/* Дескриптор */}
        <p style={{ 
          fontSize: '15px', 
          color: '#888', 
          marginBottom: '24px',
          lineHeight: 1.6,
          maxWidth: '440px',
          margin: '0 auto 24px'
        }}>
          Этот тест снимет розовые очки. Он покажет, в каком именно узле вы теряете деньги прямо сейчас и что конкретно исправить сегодня, чтобы завтра продажи пошли вверх.
        </p>

        {/* Иконки с линией — между дескриптором и булитами */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          marginBottom: '24px',
          position: 'relative',
          padding: '0 10px'
        }}>
          {icons.map((iconSrc, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <img 
                  src={iconSrc} 
                  alt="" 
                  style={{ 
                    width: '32px', 
                    height: '32px'
                  }} 
                />
              </div>
              {idx < icons.length - 1 && (
                <div style={{
                  width: '50px',
                  height: '3px',
                  background: '#333',
                  borderRadius: '2px'
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
            padding: '18px 48px', 
            fontSize: '16px', 
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
