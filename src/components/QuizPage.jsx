// 顯示題目的頁面（會依序呈現每一題）
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "../data/questions";
import { calculateResult } from "../utils/calculateResult";
import AnswerButton from "./AnswerButton";
import styles from "./QuizPage.module.css";

export default function QuizPage({ onComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

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

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className={styles.home}>
      <div className={styles.quizContainer}>
        <h3 className={styles.questionText}>{currentQuestion.text}</h3>

        <img
          src={currentQuestion.img}
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
