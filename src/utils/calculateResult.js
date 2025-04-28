// 用來計算哪一種倉鼠類型的邏輯
export function calculateResult(answers) {
    const scoreMap = {};
  
    answers.forEach(answer => {
      Object.entries(answer.scores).forEach(([resultName, score]) => {
        if (!scoreMap[resultName]) scoreMap[resultName] = 0;
        scoreMap[resultName] += score;
      });
    });
  
    const sorted = Object.entries(scoreMap).sort((a, b) => b[1] - a[1]);
    const topResult = sorted[0][0];
  
    return topResult;
  }
//這裡 answers 是你收集到使用者每一題所選的 option（裡面有對應 scores 資訊）。  