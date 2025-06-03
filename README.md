# My Hamster Test｜心理測驗前端專案

這是一個獨立部署的心理測驗網站，透過一系列簡單問題，分析你是哪一隻可愛的倉鼠人格角色 🐹

🔗 **線上預覽：** [https://mia-sheep-su.github.io/MyHamsterTest/](https://mia-sheep-su.github.io/MyHamsterTest/)

**所有倉鼠資料：**[https://mia-sheep-su.github.io/AboutMe/#/myhamstertest](https://mia-sheep-su.github.io/AboutMe/#/myhamstertest)

---

## 🐹 專案特色

* ✅ 多題選擇題測驗邏輯
* 💫 得分加權判斷角色人格
* 🎨 結果頁展示角色圖片、特質、合拍角色與反差角色
* 🔁 支援重新作答、分享與導向外部平台

---

## 🔧 使用技術

* React 18
* Vite
* TypeScript
* React Router v6
* CSS Modules
* GitHub Pages 部署

---

## 📁 專案結構

```
MyHamsterTest/
├── data/                 # 題目與角色資料
├── components/           # 測驗頁、選項按鈕、結果頁等元件
├── pages/                # 啟動頁、測驗流程、結果頁
├── public/               # 角色圖片與資源
├── styles/               # CSS Modules
└── main.tsx
```

---

## 🧪 如何執行本地開發

```bash
git clone https://github.com/Mia-Sheep-Su/MyHamsterTest.git
cd MyHamsterTest
npm install
npm run dev
```

---

## 🚀 部署方式

```bash
npm run build
npm run deploy
```

> 📌 確保 `vite.config.ts` 設定：
>
> ```ts
> export default defineConfig({
>   base: '/MyHamsterTest/',
>   ...
> });
> ```

---

## 🙋‍♀️ 作者資訊

由 Mia Sheep 製作的趣味人格心理測驗，結合插畫角色、性格分類與互動體驗。

* GitHub: [@Mia-Sheep-Su](https://github.com/Mia-Sheep-Su)
* Instagram: [@m\_0713\_su](https://www.instagram.com/m_0713_su/)
* Portfolio: [https://mia-sheep-su.github.io/AboutMe/](https://mia-sheep-su.github.io/AboutMe/)

---

快來測測你是哪隻倉鼠人格吧！🐭
