import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ResultCanvas({ name }) {
  const canvasRef = useRef(null);
  const navigate = useNavigate(); // 使用 React Router 來導頁

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // 畫背景圖
    const image = new Image();
    image.src = "/img/629128.jpg";
    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      if (name) {
        // 畫文字
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText(`恭喜 ${name}！`, 50, 50);
      }
    };
  }, [name]);

  return (
    <>
      <canvas ref={canvasRef} width={600} height={797} />
      <button onClick={() => navigate("/")}>重新測驗</button>
    </>
  );
}

export default ResultCanvas;
