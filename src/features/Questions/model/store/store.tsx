import { createStore, createEvent } from "effector";
import questions from "questions.json";

export const questionAnswered = createEvent<number>();
export const reset = createEvent();
export const setCurrentQuestion = createEvent<number>();

// Создаем хранилище для текущего вопроса и инициализируем его значением из localStorage
export const $currentQuestion = createStore(
  parseInt(localStorage.getItem("currentQuestion") || "0", 10)
)
  .on(questionAnswered, (state) => state + 1)
  .on(setCurrentQuestion, (_, newQuestion) => {
    localStorage.setItem("currentQuestion", newQuestion.toString());
    return newQuestion;
  })
  .reset(reset); // Сбрасываем значение текущего вопроса при событии reset

export const saveToLocalStorage = () => {
  localStorage.setItem("score", $score.getState().toString());
};

export const saveTestResult = (
  testId: string,
  result: number,
  completionTime: Date
) => {
  const storedResults = JSON.parse(
    localStorage.getItem("testResults") || "{}"
  );
  storedResults[testId] = { result, completionTime };
  localStorage.setItem("testResults", JSON.stringify(storedResults));
  // После сохранения результатов теста очищаем данные в localStorage
  clearTestData();
};

export const clearTestData = () => {
  localStorage.removeItem("selectedAnswer");
  localStorage.removeItem("currentQuestion");
  localStorage.removeItem("score");
};

// Создаем хранилище для счета и инициализируем его значением из localStorage
export const $score = createStore(
  parseInt(localStorage.getItem("score") || "0", 0)
)
  .on(questionAnswered, (state, currentQuestion) => {
    const selectedAnswer = localStorage.getItem("selectedAnswer");
    const correctAnswer = questions[currentQuestion].correctAnswer;
    if (selectedAnswer && selectedAnswer === correctAnswer) {
      return state + 1;
    }
    return state;
  })
  .reset(reset); // Сбрасываем значение счета при событии reset

export const loadFromLocalStorage = () => {
  // Ничего не делаем при инициализации мог понадобится функционал
};

// При событии reset сбрасываем значения хранилищ для текущего вопроса и счета
reset.watch(() => {
  $currentQuestion.reset();
  $score.reset();
});