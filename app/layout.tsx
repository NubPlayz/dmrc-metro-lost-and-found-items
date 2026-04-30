import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import MikuCursorClient from "./MikuCursorClient";

export const metadata = {
  title: "Metro Finder",
  description: "Find lost items in Delhi Metro",
  verification: {
    google: "-H80yUP3sbYE-SJpOm-LniZYRdOpQwlJFT_IjdMP_tg",
  },
};


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <MikuCursorClient />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
