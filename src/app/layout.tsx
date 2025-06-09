"use client";
import "./globals.css";
import { Providers } from "./provider";
import { Nunito } from "next/font/google";
import { useEffect } from "react";
import { setAvatar } from "@/store/userSlice";
import { setCoins } from "@/features/game/gameSlice";
import { store } from "@/store";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"], // Add more weights if needed
  variable: "--font-nunito",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const coins = localStorage.getItem("coins");
    const avatar = localStorage.getItem("avatar") || "/avatars/profile-1.png";
    if (coins) {
      const coins = localStorage.getItem("coins") || 0;
      store.dispatch(setAvatar(String(avatar)));
      store.dispatch(setCoins(Number(coins)));
    }
  }, []);

  return (
    <html lang="en" className={nunito.variable}>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3470509197648988"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="font-nunito">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
