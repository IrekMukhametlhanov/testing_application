import React, { useState, useEffect, useCallback } from "react";
import { useStoreMap } from "effector-react";
import { saveNameToLocalStorage, Name } from "features/StartQuestions";
import { useNavigate } from "react-router-dom";
import styles from "./StartScreen.module.scss";

const StartScreen: React.FC = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("Name");
    if (storedName) {
      setName(storedName);
    }
  }, []);
  
  const storedName = useStoreMap({
    store: Name,
    keys: [],
    fn: (value) => value,
  });

  useEffect(() => {
    if (storedName) {
      navigate("/question");
    }
  }, [storedName, navigate]);

  const startTest = useCallback(() => {
    setName(name); // Устанавливаем новое имя
    saveNameToLocalStorage(name); // Сохраняем имя в локальное хранилище
    navigate("/question"); // Переходим на страницу с вопросами
  }, [name, navigate, saveNameToLocalStorage]);

  return (
    <div className={styles.container}>
      <div className={styles.startScreen}>
        <h1 className={styles.startHeading}>Добро пожаловать!</h1>
        <input
          className={styles.inputField}
          type="text"
          placeholder="Введите ваше имя"
          value={name || storedName}
          onChange={(e) => setName(e.target.value)}
        />
        <button className={styles.startButton} onClick={startTest}>
          Начать тест
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
