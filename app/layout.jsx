export const metadata = {
  title: 'Метод ZMS',
  description: 'Диагностика бизнеса. 25 вопросов. 3 направления. Точечные рекомендации.',
  icons: {
    icon: '/landing/assets/icons/crosshair.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;500;600;700&family=Manrope:wght@300;400;500;600;700&family=Unbounded:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: `@font-face { font-family: 'ClashDisplay'; src: url('/landing/assets/fonts/ClashDisplay-Variable.ttf') format('truetype'); font-weight: 200 700; font-display: swap; } @keyframes pulse-wave { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(2.5); opacity: 0; } } @keyframes form-pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(200, 245, 66, 0); transform: scale(1); } 50% { box-shadow: 0 0 40px 12px rgba(200, 245, 66, 0.45); transform: scale(1.02); } } @keyframes toast-fade { 0% { opacity: 0; transform: translate(-50%, 10px); } 15% { opacity: 1; transform: translate(-50%, 0); } 85% { opacity: 1; transform: translate(-50%, 0); } 100% { opacity: 0; transform: translate(-50%, -10px); } } @keyframes word-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.08); } } @keyframes finger-point { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(6px); } }` }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function setAppHeight() {
                document.documentElement.style.setProperty('--app-height', window.innerHeight + 'px');
              }
              window.addEventListener('resize', setAppHeight);
              window.addEventListener('orientationchange', setAppHeight);
              setAppHeight();
            `,
          }}
        />
      </head>
      <body style={{ margin: 0, padding: 0, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', background: '#0a0a0a', color: '#fff' }}>
        {children}
      </body>
    </html>
  )
}
