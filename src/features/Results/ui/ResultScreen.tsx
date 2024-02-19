import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./ResultScreen.module.scss";

interface TestResult {
  result: number;
  completionTime: string;
}

const ResultsScreen = () => {
  const [testResults, setTestResults] = useState<{ [key: string]: TestResult }>({});

  useEffect(() => {
    const loadedTestResults = JSON.parse(localStorage.getItem("testResults") || "{}") as { [key: string]: TestResult };
    setTestResults(loadedTestResults);
  }, []);

  return (
    <div className={styles.resultsContainer}>
      <h2 className={styles.header}>История пройденных тестов</h2>
      <div className={styles.results}>
        {Object.keys(testResults).map((testId) => (
          <div key={testId} className={styles.result}>
            <p>Результат теста: {testResults[testId].result}</p>
            <p>Дата прохождения: {new Date(testResults[testId].completionTime).toLocaleString()}</p>
          </div>
        ))}
      </div>
      <Link to="/" className={styles.link}>Пройти еще раз</Link>
    </div>
  );
};

export default ResultsScreen;