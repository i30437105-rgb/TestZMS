'use client';

export function CompletionScreen({ onViewResults }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Декоративные элементы */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '10%',
        width: '250px',
        height: '250px',
        background: 'radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(50px)'
      }} />

      {/* Контент */}
      <div style={{
        textAlign: 'center',
        maxWidth: '500px',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Кубок */}
        <div style={{
          fontSize: '80px',
          marginBottom: '24px',
          animation: 'pulse 2s ease-in-out infinite'
        }}>
          🏆
        </div>

        {/* Заголовок */}
        <h1 style={{
          fontSize: '32px',
          fontWeight: 800,
          color: '#fff',
          marginBottom: '16px',
          lineHeight: 1.2
        }}>
          Поздравляем!
        </h1>

        {/* Подзаголовок */}
        <p style={{
          fontSize: '18px',
          color: '#22c55e',
          fontWeight: 600,
          marginBottom: '12px'
        }}>
          Вы прошли тест до конца
        </p>

        {/* Ранг */}
        <div style={{
          display: 'inline-block',
          padding: '12px 24px',
          background: 'linear-gradient(135deg, rgba(255,215,0,0.2) 0%, rgba(255,215,0,0.1) 100%)',
          border: '1px solid rgba(255,215,0,0.3)',
          borderRadius: '100px',
          marginBottom: '24px'
        }}>
          <span style={{
            fontSize: '16px',
            color: '#ffd700',
            fontWeight: 600
          }}>
            🎖️ Вы достигли ранга «Целеустремлённый лидер»
          </span>
        </div>

        {/* Описание */}
        <p style={{
          fontSize: '15px',
          color: 'rgba(255,255,255,0.7)',
          lineHeight: 1.6,
          marginBottom: '32px'
        }}>
          Вы вошли в 36% тех, кто не сдался и прошёл диагностику до конца. 
          Теперь вы можете увидеть детальный анализ вашего маркетинга.
        </p>

        {/* Кнопка */}
        <button
          onClick={onViewResults}
          style={{
            padding: '16px 48px',
            fontSize: '16px',
            fontWeight: 700,
            color: '#000',
            background: 'linear-gradient(135deg, #ffd700 0%, #ffed4a 100%)',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 20px rgba(255,215,0,0.3)'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 30px rgba(255,215,0,0.4)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 20px rgba(255,215,0,0.3)';
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
      `}</style>
    </div>
  );
}
