// 單一選項按鈕元件
import styles from "./AnswerButton.module.css";

export default function AnswerButton({ text, onClick }) {
  return (
    <button className={styles.answerButton} onClick={onClick}>
      {text}
    </button>
  );
}
