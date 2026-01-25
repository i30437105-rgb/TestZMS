# TASK-005: Мобильная адаптация QuestionScreen

**Статус:** 🔴 НЕ НАЧАТО
**Приоритет:** 🔴 КРИТИЧЕСКИЙ
**Исполнитель:** Не назначен
**Дата создания:** 2026-01-25

---

## 🎯 ЦЕЛЬ

Добавить адаптивную логику в QuestionScreen, StartScreen, CompletionScreen.
Сейчас: breakpoint только в ResultsScreen (< 900px).
50-70% трафика с мобильных — должно работать идеально!

---

## ✅ ГОТОВО, ЕСЛИ...

- [ ] QuestionScreen: breakpoint < 900px
- [ ] Кнопки "Да/Нет" >= 44x44px (для touch)
- [ ] Текст >= 16px
- [ ] StartScreen: адаптивный
- [ ] CompletionScreen: адаптивный
- [ ] Протестировано на iPhone (DevTools)
- [ ] Протестировано на Android (DevTools)
- [ ] Протестировано landscape orientation
- [ ] Нет горизонтального скролла

---

## 📁 ГДЕ ТРОГАТЬ

**Файлы:**
- `app/components/QuestionScreen.jsx`
- `app/components/StartScreen.jsx`
- `app/components/CompletionScreen.jsx`

**Что добавить:**
- `const [isMobile, setIsMobile] = useState(false)`
- `useEffect(() => { ... }, [])` для проверки ширины
- Условные стили: `fontSize: isMobile ? '18px' : '20px'`

**Связано с:** BUG-003

---

## 📝 ШАГИ

1. Прочитать ResultsScreen.jsx:1256 — пример breakpoint
2. Добавить в QuestionScreen:
   ```javascript
   const [isMobile, setIsMobile] = useState(false);
   useEffect(() => {
     const checkMobile = () => setIsMobile(window.innerWidth < 900);
     checkMobile();
     window.addEventListener('resize', checkMobile);
     return () => window.removeEventListener('resize', checkMobile);
   }, []);
   ```
3. Адаптировать стили для isMobile
4. Повторить для StartScreen, CompletionScreen
5. Протестировать

---

**Версия:** 1.0
