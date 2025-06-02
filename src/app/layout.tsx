// "use client";
// import { usePathname } from "next/navigation";
import "./globals.css";
import { Providers } from "./provider";
import { Nunito } from "next/font/google";

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
  // const pathname = usePathname();
  // const hideLayout = pathname.startsWith("/game");

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
