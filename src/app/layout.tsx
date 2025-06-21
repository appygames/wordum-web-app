"use client";
import "./globals.css";
import { Nunito } from "next/font/google";
import { useEffect } from "react";
import { setAvatar } from "@/store/userSlice";
import { setCoins } from "@/features/game/gameSlice";
import { store } from "@/store";
import { useRouter } from "next/navigation";
import { Provider } from "react-redux";
import ClientWrapper from "@/components/ClientWrapper";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-nunito",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  useEffect(() => {
    const coins = localStorage.getItem("coins") || "0";
    const avatar = localStorage.getItem("avatar") || null;

    store.dispatch(setCoins(Number(coins)));
    if (avatar) {
      store.dispatch(setAvatar(String(avatar)));
    } else {
      router.push("/avatar");
    }
  }, [router]);

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
        <Provider store={store}>
          <ClientWrapper>{children}</ClientWrapper>
        </Provider>
      </body>
    </html>
  );
}
