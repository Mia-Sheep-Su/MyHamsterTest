# My Hamster Test｜心理測驗前端專案

這是一個趣味心理測驗網站，用 8 種倉鼠角色代表不同人格特質，結合 RWD 排版與互動式卡片，展示你是哪一隻獨特的鼠！

🔗 **線上預覽：**[https://mia-sheep-su.github.io/MyHamsterTest/](https://mia-sheep-su.github.io/MyHamsterTest/)

**所有倉鼠資料：**[https://mia-sheep-su.github.io/AboutMe/#/myhamstertest](https://mia-sheep-su.github.io/AboutMe/#/myhamstertest)

---

## 🐹 專案特色

* 💡 角色總覽：資料來自 `/data/results.ts`，內含描述、相合/不合對象與配色
* 📱 響應式介面：桌機為表格、手機為卡片式切換展示
* 🎨 標籤與顏色依角色特性客製化
* ♻️ 元件化開發，資料傳遞由父元件處理

---

## 🔧 使用技術

* React 18
* TypeScript
* CSS Modules
* Vite

---

## 📦 資料結構簡介

```ts
export const results = {
  "番鼠": {
    name: "番鼠",
    description: "活潑好動、愛玩愛吃…",
    hashtags: [
      { text: "#樂觀", color: "#BF8C6F" },
      ...
    ],
    compatibleWith: "鼠來寶",
    incompatibleWith: "嚇鼠",
    ...
  },
  ...
}
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

## 🙋‍♀️ 作者資訊

由 Mia Sheep 製作，結合插畫角色、性格分類與前端練習，希望讓心理測驗更可愛好玩。

* GitHub: [@Mia-Sheep-Su](https://github.com/Mia-Sheep-Su)
* Instagram: [@m\_0713\_su](https://www.instagram.com/m_0713_su/)
* Portfolio: [https://mia-sheep-su.github.io/AboutMe/](https://mia-sheep-su.github.io/AboutMe/)

---

想知道你是哪一隻倉鼠？快來試試吧 🐹
