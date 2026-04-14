import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "mycrm | 빛의 속도로 구축하는 CRM",
  description:
    "React를 위한 헤드리스 UI 라이브러리. 데이터 중심 CRM 인터페이스와 AI 네이티브 DX를 위해 설계되었습니다.",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "2154x2154" }],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${inter.variable} h-full scroll-smooth antialiased`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
        />
      </head>
      <body className="min-h-full bg-surface text-on-surface">{children}</body>
    </html>
  );
}
