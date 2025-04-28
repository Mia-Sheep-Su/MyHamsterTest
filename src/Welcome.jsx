import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Welcome.module.css";

function Welcome() {
  const [isQuiz, setIsQuiz] = useState(true); // 用 useState 記錄選擇
  const navigate = useNavigate(); // 使用 React Router 來導頁

  function StartClick() {
    if (isQuiz) {
      navigate("/app"); // 轉到測驗頁面
    } else {
      navigate("/tic-tac-toe"); // 轉到圈圈叉叉
    }
  }
  useEffect(() => {
    document.body.style.backgroundColor = "#EBF4E9";
  }, []);

  return (
    <>
      <div className={styles.home}>
        <div className={styles.titlebox}>
          <div className={styles.backwheel}>
            <img className={styles.titleimg} src="img/titlex4.png" />
            <div className={styles.hamsterbox}>
              <input
                type="checkbox"
                className={styles.Switch}
                id="switch"
                checked={isQuiz}
                onChange={() => setIsQuiz(!isQuiz)} // React 控制開關
              />
              <label htmlFor="switch" className={styles.hamster} />{" "}
            </div>
          </div>
        </div>
        <div className={styles.Woodbox}>
          <div className={styles.startbox}>
            <button
              onClick={StartClick}
              id="startBtn"
              className={styles.Startbtn}
            >
              開始遊戲
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcome;
