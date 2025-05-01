// 顯示測驗結果的頁面
import { results } from "../data/results";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./ResultPage.module.css";

//根據最大寬度自動換行，每行畫一次 fillText：
function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, padding = 2) {
  const words = text.split(""); // 中文一個字一個字來
  let line = "";
  let currentY = y;

  const effectiveWidth = maxWidth - padding * 2; // 扣掉左右 padding

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n];
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > effectiveWidth && n > 0) {
      ctx.fillText(line, x + padding, currentY);
      line = words[n];
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x + padding, currentY);
}

// ✅ hashtag 膠囊畫圖函式
function drawHashtag(ctx, text, x, y, bgColor) {
  ctx.save(); // 👉 儲存畫布目前的狀態

  ctx.font = "bold 16px 'Noto Sans TC'";
  const paddingX = 12;
  const textWidth = ctx.measureText(text).width;
  const boxWidth = textWidth + paddingX * 2;
  const boxHeight = 30;

  ctx.beginPath();
  const radius = 15;
  ctx.fillStyle = bgColor;
  ctx.roundRect(x, y, boxWidth, boxHeight, radius);
  ctx.fill();

  ctx.fillStyle = "#fff";
  ctx.fillText(text, x + paddingX, y + 21);

  ctx.restore(); // 👉 還原畫布到呼叫前的狀態
}

export default function ResultPage({ name, result }) {
  const resultData = results[result]; // 先取到整個物件
  const canvasRef = useRef(null);
  const navigate = useNavigate(); // 使用 React Router 來導頁
  const [imgDataUrl, setImgDataUrl] = useState("");
  const [canUseShare, setCanUseShare] = useState(false);
  const [isDrawing, setIsDrawing] = useState(true);

  useEffect(() => {
    document.body.style.backgroundColor = "#EBF4E9";
    const base = import.meta.env.BASE_URL; //引導路徑

    if (navigator.share) {
      setCanUseShare(true);
    } //判定是否可執行原生分享

    const canvas = canvasRef.current;
    if (!canvas || !resultData) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return; // ← 防止 ctx 是 null

    // 擴充圓角函式（若尚未擴充）
    if (!CanvasRenderingContext2D.prototype.roundRect) {
      CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
        this.beginPath();
        this.moveTo(x + r, y);
        this.arcTo(x + w, y, x + w, y + h, r);
        this.arcTo(x + w, y + h, x, y + h, r);
        this.arcTo(x, y + h, x, y, r);
        this.arcTo(x, y, x + w, y, r);
        this.closePath();
      };
    }

    // ✅ 圖片物件
    const bgImg = new Image();
    bgImg.src = base + resultData?.image;

    const characterImg = new Image();
    characterImg.src = base + resultData?.characterImage;

    const nameTagImg = new Image();
    nameTagImg.src = base + resultData?.nameTagImage;

    const matchTagImg = new Image();
    matchTagImg.src = base + resultData?.matchTagImage;

    const nemesisTagImg = new Image();
    nemesisTagImg.src = base + resultData?.nemesisTagImage;

    // ✅ 等待所有圖片載入後才開始繪製
    Promise.all([
      new Promise((res) => (bgImg.onload = res)),
      new Promise((res) => (characterImg.onload = res)),
      new Promise((res) => (nameTagImg.onload = res)),
      new Promise((res) => (matchTagImg.onload = res)),
      new Promise((res) => (nemesisTagImg.onload = res)),
    ]).then(() => {
      // 🔄 繪製區域開始
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 背景圖
      ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

      // 名稱
      if (name) {
        ctx.fillStyle = "#5F302A";
        ctx.font = "30px Arial";
        ctx.fillText(`${name}，你是...`, 50, 60);
      }

      // 角色圖
      ctx.drawImage(characterImg, 110, 120, 380, 380);

      // 角色名稱貼圖
      ctx.drawImage(nameTagImg, 150, 70, 300, 80);

      // 角色介紹背景方塊
      ctx.fillStyle = resultData?.boxColor || "rgba(255,165,0,0.4)";
      ctx.roundRect(60, 500, 480, 120, 20);
      ctx.fill();

      // 合拍方格
      ctx.roundRect(60, 635, 225, 145, 20);
      ctx.fill();

      // 不合方格
      ctx.roundRect(310, 635, 225, 145, 20);
      ctx.fill();

      // 角色描述文字
      ctx.fillStyle = "#5F302A";
      ctx.font = "18px Arial";
      ctx.textAlign = "left";
      drawWrappedText(ctx, resultData?.description, 80, 540, 440, 26);

      // 合拍描述
      ctx.font = "15px Arial";
      drawWrappedText(ctx, resultData?.reasonCompatible, 80, 725, 180, 22);
      ctx.fillText("合拍夥伴", 140, 655);

      // 不合描述
      ctx.font = "15px Arial";
      drawWrappedText(ctx, resultData?.reasonIncompatible, 330, 725, 180, 22);
      ctx.fillText("可能和不太來", 370, 655);

      // 合拍貼圖（置中靠上）
      ctx.drawImage(matchTagImg, 70, 655, 210, 60);

      // 不合貼圖（置中靠上）
      ctx.drawImage(nemesisTagImg, 315, 655, 210, 60);

      // Hashtag（膠囊形式）
      const hashtags = resultData?.hashtags || [];
      const hashtagPositions = [
        { x: 120, y: 150 },
        { x: 430, y: 180 },
        { x: 400, y: 400 },
      ];
      hashtags.forEach((tag, index) => {
        const pos = hashtagPositions[index];
        drawHashtag(ctx, tag.text, pos.x, pos.y, tag.color);
      });

      // 輸出成圖供下載
      setTimeout(() => {
        const dataURL = canvas.toDataURL("image/png");
        setImgDataUrl(dataURL);
        setIsDrawing(false); // ✅ 畫完了才顯示結果
      }, 300);
    });
  }, [name, resultData]);

  const handleFBShare = () => {
    const shareText = encodeURIComponent("你是甚麼鼠?🐹 超可愛心理測驗 👉");
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}&text=${shareText}`,
      "_blank"
    );
  };

  const handleLineShare = () => {
    const shareText = encodeURIComponent("你是甚麼鼠?🐹 超可愛心理測驗 👉");
    const url = encodeURIComponent(window.location.href);
    const shareUrl = `https://social-plugins.line.me/lineit/share?u=${url}&text=${shareText}`;

    window.open(shareUrl, "_blank");
  };

  const handleIGRedirect = () => {
    window.location.href = "instagram://user?username=m_0713_su";
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "哈囉！那你鼠咧？",
          text: "我剛做完一個超可愛的倉鼠心理測驗，點進來看看你是哪種倉鼠吧 🐹",
          url: window.location.href,
        })
        .then(() => console.log("分享成功"))
        .catch((error) => console.log("分享錯誤：", error));
    } else {
      alert("你的瀏覽器不支援原生分享，請使用 Facebook 或 LINE 按鈕。");
    }
  };

  return (
    <>
      <div className={styles.home}>
        <canvas
          ref={canvasRef}
          alt="你的結果圖"
          width={600}
          height={797}
          style={{ display: "none" }}
        />
        {isDrawing ? (
          <div
            style={{
              textAlign: "center",
              width: "100%",
              maxWidth: "600px",
              height: "80hv",
            }}
          >
            <img
              src={`${import.meta.env.BASE_URL}/icon-001.ico`}
              alt="loading"
              className={styles.spin}
            />
            <p>正在產生你的倉鼠結果圖...</p>
          </div>
        ) : (
          imgDataUrl && (
            <>
              <div>
                <img
                  src={imgDataUrl}
                  alt="你的結果圖"
                  style={{
                    width: "100%",
                    maxWidth: "600px",
                    borderRadius: "12px",
                  }}
                />
              </div>
              <p className={styles.downloadtext}>
                長按圖片下載測驗結果，或是
                <a href={imgDataUrl} download="result.png">
                  <button>點我下載圖片</button>
                </a>
              </p>
              <div className={styles["social-buttons"]}>
                {canUseShare ? (
                  <>
                    <span>分享你的結果：</span>
                    <button
                      onClick={handleNativeShare}
                      className={`${styles.icon} ${styles.nativeShare}`}
                    ></button>
                  </>
                ) : (
                  <>
                    <span>分享到：</span>
                    <button
                      className={`${styles.icon} ${styles.fb}`}
                      onClick={handleFBShare}
                    ></button>
                    <button
                      className={`${styles.icon} ${styles.ig}`}
                      onClick={handleIGRedirect}
                    ></button>
                    <button
                      className={`${styles.icon} ${styles.line}`}
                      onClick={handleLineShare}
                    ></button>
                  </>
                )}
              </div>
              <button
                onClick={() => navigate("/")}
                className={styles.retryButton}
              >
                重新測驗
              </button>
            </>
          )
        )}

        <div className={styles.links}>
          <a
            href="https://www.instagram.com/m_0713_su"
            target="_blank"
            className={styles.profile}
          >
            <img
              src={`${import.meta.env.BASE_URL}/assets/my-instagram.jpg`}
              alt="IG"
            />
            <div className={styles.profiletext}>
              <p>@m_0713_su</p>
              <p>銤烊｜日常 吃吃喝喝 玩樂</p>
            </div>
          </a>
          <a
            href="https://github.com/Mia-Sheep-Su"
            target="_blank"
            className={styles.github}
          >
            <img
              src={`${import.meta.env.BASE_URL}/assets/my-github.jpg`}
              alt="github"
            />
            <div>
              <p>Mia-Sheep-Su</p>
            </div>
          </a>
        </div>
        <div className={styles["berry-section"]}>
          <p className={styles.downloadtext}>
            分享我家的倉鼠
            <br />
            <a href="https://www.instagram.com/stories/highlights/18001313105423954/">
              #Berry是一隻倉鼠
            </a>
          </p>
          <div className={styles.carousel}>
            <img
              src={`${import.meta.env.BASE_URL}/assets/berry1.jpg`}
              alt="Berry1"
            />
            <img
              src={`${import.meta.env.BASE_URL}/assets/berry2.jpg`}
              alt="Berry2"
            />
            <img
              src={`${import.meta.env.BASE_URL}/assets/berry3.jpg`}
              alt="Berry3"
            />
          </div>
        </div>
      </div>
    </>
  );
}
