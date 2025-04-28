import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Name.module.css";

export default function Name({ onNameSubmit }) {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (name.trim() !== "") {
      onNameSubmit(name);
      navigate("/quiz");
    }
  };

  useEffect(() => {
    document.body.style.backgroundColor = "#FAF4E6";
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.nameContainer}>
        <h2>請輸入你的名字！</h2>
        <input
          className={styles.nameInput}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="你的名字"
        />
        <button className={styles.confirmButton} onClick={handleSubmit}>
          確認
        </button>
      </div>
    </div>
  );
}
