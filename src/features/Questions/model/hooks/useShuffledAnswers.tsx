import { useMemo } from "react";
import { Question } from "../types/model";

const useShuffledAnswers = (currentQuestion: number, questions: Question[]) => {
  const shuffledAnswers = useMemo(() => {
    const answers = [...questions[currentQuestion].answers];
    const correctAnswer = questions[currentQuestion].correctAnswer;
    // Находим индекс правильного ответа
    const correctAnswerIndex = answers.findIndex((answer) => answer === correctAnswer);
    // Удаляем правильный ответ из массива
    answers.splice(correctAnswerIndex, 1);
    // Перемешиваем массив
    answers.sort(() => Math.random() - 0.5);
    // Вставляем правильный ответ на случайную позицию
    const randomIndex = Math.floor(Math.random() * (answers.length + 1));
    answers.splice(randomIndex, 0, correctAnswer);
    return answers;
  }, [currentQuestion, questions]);

  return shuffledAnswers;
};

export default useShuffledAnswers;