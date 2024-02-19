import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "effector-react";
import {
  questionAnswered,
  $currentQuestion,
  $score,
  reset,
  saveTestResult,
  clearTestData,
  saveToLocalStorage,
  loadFromLocalStorage,
  setCurrentQuestion,
} from "../model/store/store";
import questionsData from "questions.json";
import styles from "./QuestionScreen.module.scss";
import { Question } from "../model/types/model";
import { ProgressBar } from "shared/components/ProgressBar";
import { v4 as uuidv4 } from "uuid";
import useShuffledAnswers from "../model/hooks/useShuffledAnswers";

// Генерация уникального идентификатора теста
const generateTestId = (): string => {
  return uuidv4();
};

const TestScreen = () => {
  const navigate = useNavigate();
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const currentQuestion = useStore($currentQuestion);
  const score = useStore($score);
  const questions: Question[] = questionsData;

  // Загрузка данных из локального хранилища при первом рендере компонента
  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  // Обработчик клика по варианту ответа на вопрос
  const handleAnswerOptionClick = useCallback(
    (selectedOption: string) => {
      setSelectedAnswer(selectedOption);
      localStorage.setItem("selectedAnswer", selectedOption);
      localStorage.setItem("currentQuestion", currentQuestion.toString());

      if (currentQuestion < questions.length - 1) {
        // Задержка перед переходом к следующему вопросу (временно закомментирована)
        const timeout = setTimeout(() => {
          if (selectedOption === questions[currentQuestion].correctAnswer) {
            questionAnswered(currentQuestion);
          }
          saveToLocalStorage();
          setCurrentQuestion(currentQuestion + 1);
        }, 1000); // Задержка в миллисекундах (в данном случае 1 секунда)
        return () => clearTimeout(timeout);
      } else {
        // Сохранение результатов теста и переход на страницу результатов
        const completionTime = new Date();
        const testId = generateTestId();
        saveTestResult(testId, score, completionTime);
        reset(); // Сброс данных теста
        navigate("/results"); // Переход на страницу результатов
      }
    },
    [currentQuestion, navigate, questions, score]
  );

  // Обработчик перехода к следующему вопросу
  const handleNext = () => {
    setCurrentQuestion(currentQuestion + 1);
    saveToLocalStorage();
    clearTestData();
  };

  // Обработчик перехода к предыдущему вопросу
  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Проверка завершения теста и отображение результата
  useEffect(() => {
    if (currentQuestion === questions.length) {
      setShowScore(true);
    }
  }, [currentQuestion]);

  const progressPercentage = useMemo(
    () => ((currentQuestion + 1) / questions.length) * 100,
    [currentQuestion, questions.length]
  );
  
  // Получение перемешанных вариантов ответов для текущего вопроса
  const shuffledAnswers = useShuffledAnswers(currentQuestion, questions);

  return (
    <div className={styles.container}>
      <>
        {/* Секция с вопросом */}
        <div className={styles.questionSection}>
          <div className={styles.questionCount}>
            <span>Вопрос {currentQuestion + 1}</span>/{questions.length}
          </div>
          <div className={styles.questionText}>
            {questions[currentQuestion].question}
          </div>
        </div>
        {/* Секция с вариантами ответов */}
        <div className={styles.answerSection}>
          {shuffledAnswers.map((answerOption, index) => (
            <button
              key={index}
              onClick={() => handleAnswerOptionClick(answerOption)}
              className={`${styles.answerButton} ${
                selectedAnswer &&
                (selectedAnswer === answerOption
                  ? answerOption === questions[currentQuestion].correctAnswer
                    ? styles.correctAnswer
                    : styles.incorrectAnswer
                  : "")
              }`}
            >
              {answerOption}
            </button>
          ))}
        </div>
        {/* Навигация между вопросами */}
        <div>
          <button onClick={handlePrev} disabled={currentQuestion === 0}>
            Назад
          </button>
          {currentQuestion < questions.length - 1 && (
            <button onClick={handleNext}>Продолжить</button>
          )}
        </div>
        {/* Прогресс-бар */}
        <ProgressBar percentage={progressPercentage} />
      </>
    </div>
  );
};

export default TestScreen;
