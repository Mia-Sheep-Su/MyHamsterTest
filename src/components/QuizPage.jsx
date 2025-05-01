// 顯示題目的頁面（會依序呈現每一題）
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { questions } from "../data/questions";
import { calculateResult } from "../utils/calculateResult";
import AnswerButton from "./AnswerButton";
import styles from "./QuizPage.module.css";

export default function QuizPage({ onComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // 預先載入圖片（preload）+ loading 狀態
  const base = import.meta.env.BASE_URL;

  const handleAnswer = (option) => {
    setAnswers([...answers, option]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const resultType = calculateResult([...answers, option]);
      onComplete(resultType);
      navigate("/result");
    }
  };

  useEffect(() => {
    let loadedCount = 0;

    questions.forEach((q) => {
      const img = new Image();
      img.src = q.img;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === questions.length) {
          setLoading(false);
        }
      };
    });
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center" }}>
        <img
          src={`${import.meta.env.BASE_URL}/icon-001.ico`}
          alt="loading"
          className={styles.spin} // 可以套上剛剛的旋轉動畫
          style={{ width: "100px", marginBottom: "1rem" }}
        />
        <p>冒險生成中...</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className={styles.home}>
      <div className={styles.quizContainer}>
        <h3 className={styles.questionText}>{currentQuestion.text}</h3>

        <img
          src={`${base}${currentQuestion.img}`}
          alt="題目圖片"
          className={styles.questionImage}
        />

        <div className={styles.optionsContainer}>
          {currentQuestion.options.map((option, i) => (
            <AnswerButton
              key={i}
              text={option.text}
              onClick={() => handleAnswer(option)}
            />
          ))}
        </div>

        <p className={styles.progressText}>
          {currentQuestionIndex + 1} / {questions.length}
        </p>
      </div>
    </div>
  );
}
