// 控制流程的主元件
import { useState } from "react";
import NameInput from "./components/Name";
import Quiz from "./components/QuizPage";
import Result from "./components/ResultPage";

function App() {
  const [name, setName] = useState("");
  const [stage, setStage] = useState("name"); // name → quiz → result
  const [result, setResult] = useState(null);

  const handleNameSubmit = (userName) => {
    setName(userName);
    setStage("quiz");
  };

  const handleQuizComplete = (quizResult) => {
    setResult(quizResult);
    setStage("result");
  };

  return (
    <>
      {stage === "name" && <NameInput onNameSubmit={handleNameSubmit} />}
      {stage === "quiz" && <Quiz onComplete={handleQuizComplete} />}
      {stage === "result" && <Result name={name} result={result} />}
    </>
  );
}

export default App;
