import "./globals.css";
import { Nunito } from "next/font/google";
import ClientLayout from "@/components/ClientWrapper";

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
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
