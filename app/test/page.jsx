'use client';
import { useState } from 'react';
import { allQuestions } from '../data/questions';
import { checkpoints } from '../data/gamification';
import { calculateResults } from '../utils/calculations';
import { StartScreen } from '../components/StartScreen';
import { DiagnosticQuestion, QualificationQuestion } from '../components/QuestionScreen';
import { CompletionScreen } from '../components/CompletionScreen';
import { ResultsScreen } from '../components/ResultsScreen';

export default function MarketingAudit() {
  const [screen, setScreen] = useState('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [justReachedCheckpoint, setJustReachedCheckpoint] = useState(null);

  const currentQuestion = allQuestions[currentQuestionIndex];
  const totalQuestions = allQuestions.length;

  const handleStart = () => {
    setScreen('testing');
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const handleAnswer = (answer) => {
    const newAnswers = { ...answers, [currentQuestion.id]: answer };
    setAnswers(newAnswers);

    const nextIndex = currentQuestionIndex + 1;
    const currentQNum = currentQuestion.questionNumber;

    // Проверяем достижение чекпоинта (кроме первого)
    const reachedCheckpoint = checkpoints.find(c => c.question === currentQNum && currentQNum > 1);

    if (nextIndex < totalQuestions) {
      setJustReachedCheckpoint(reachedCheckpoint || null);
      setCurrentQuestionIndex(nextIndex);
    } else {
      setResults(calculateResults(newAnswers, allQuestions));
      setScreen('completion');
    }
  };

  const handleViewResults = () => {
    setScreen('results');
  };

  const handleRestart = () => {
    setScreen('start');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResults(null);
    setJustReachedCheckpoint(null);
  };

  return (
    <>
      {screen === 'start' && <StartScreen onStart={handleStart} />}

      {screen === 'testing' && currentQuestion && (
        currentQuestion.isQualification ? (
          <QualificationQuestion
            question={currentQuestion}
            questionNumber={currentQuestion.questionNumber}
            totalQuestions={totalQuestions}
            onAnswer={handleAnswer}
            sectionName={currentQuestion.section}
            reachedCheckpoint={justReachedCheckpoint}
          />
        ) : (
          <DiagnosticQuestion
            question={currentQuestion}
            questionNumber={currentQuestion.questionNumber}
            totalQuestions={totalQuestions}
            onAnswer={handleAnswer}
            reachedCheckpoint={justReachedCheckpoint}
          />
        )
      )}

      {screen === 'completion' && (
        <CompletionScreen onViewResults={handleViewResults} />
      )}

      {screen === 'results' && results && (
        <ResultsScreen results={results} answers={answers} onRestart={handleRestart} />
      )}
    </>
  );
}
