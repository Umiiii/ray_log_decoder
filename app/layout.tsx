import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Raydium AMM Log Parser",
  description: "A powerful tool to parse and analyze Raydium AMM logs on Solana blockchain",
  keywords: "Solana, Raydium, AMM, blockchain, cryptocurrency, DeFi, log parser, ray_log",
  authors: [{ name: "Umi" }],
  openGraph: {
    title: "Raydium AMM Log Parser",
    description: "A powerful tool to parse and analyze Raydium AMM logs on Solana blockchain",
    type: "website",
    locale: "en_US",
    siteName: "Raydium AMM Log Parser",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raydium AMM Log Parser",
    description: "A powerful tool to parse and analyze Raydium AMM logs on Solana blockchain",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: {
    index: true,
    follow: true,
  },
};

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
      </body>
    </html>
  );
}
