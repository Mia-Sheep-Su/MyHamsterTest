import { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    question: "某天睜開眼睛突然發現自己變成倉鼠了？！/n你會...？",
    options: [
      "睡回去，一定是自己還沒睡醒",
      "蛤？？？！？！！太扯了吧",
      "酷欸！那我是誰",
    ],
  },
  {
    question: "出了自己的窩，發現前面有一小堆葵花籽，你會...？",
    options: ["吃的欸！", "可能有詐！（小心奕奕試探", "無視"],
  },
  {
    question: "來確認一下自己到底在哪裡好了…你會？",
    options: [
      "往被木屑擋住的水管口探索",
      "前往那個有一堆沙子的地方",
      "看起來像是通往高處的樓梯？",
    ],
  },
  {
    question: " 確認了被關在籠子裡（廢話），發現籠子沒關好…你會…？",
    options: ["出去看看吧？", "出去感覺就會鼠…", "在門口探索看看好了"],
  },
  {
    question: "發現遠處看起來有鏡子！去看看自己到底長怎樣吧！",
    options: "前往",
  },
  {
    question: "前往的道路被一個不明物體擋住了！！！你會...？",
    options: ["使用蠻力叼走", "看看有沒有其他路好了", "爬上去看看！"],
  },
  {
    question: "成功繼續向前走，發現了一個跑輪…",
    options: ["跑看看是什麼感覺好了", "無視他繼續往前", "試圖往滾輪上爬（？"],
  },
  { question: "終於到鏡子前面了！你是.....", options: "生成結果" },
];

function QuizPage({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleAnswer = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete(currentIndex);
      navigate("/result");
    }
  };

  return (
    <div className="quiz">
      <h2>{questions[currentIndex].question}</h2>
      {questions[currentIndex].options.map((option, index) => (
        <button key={index} onClick={handleAnswer}>
          {option}
        </button>
      ))}
      <p>
        {currentIndex + 1} / {questions.length}
      </p>
    </div>
  );
}

export default QuizPage;
