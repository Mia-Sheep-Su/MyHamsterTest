import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/MyHamsterTest/", // ⚠️ 這裡的名稱必須與你的 GitHub Repo 名稱相符！
});
