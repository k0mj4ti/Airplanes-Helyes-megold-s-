import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Repülők",
  description: "Komjáti Gábor Kornél",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="hu"
      data-theme="light"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
       <meta charSet="UTF-8"/>
      </head>
      <body className="min-h-full flex flex-col ">{children}</body>
    </html>
  );
}
