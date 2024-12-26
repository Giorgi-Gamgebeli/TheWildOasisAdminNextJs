import type { Metadata } from "next";
import "./globals.css";

import { Poppins, Sono } from "next/font/google";
import ClientProviders from "./_utils/ClientProviders";
import { DarkModeProvider } from "./_context/DarkModeContext";
import { SessionProvider } from "next-auth/react";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--fontFamily_Poppins",
});

const sono = Sono({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--fontFamily_Sono",
});

export const metadata: Metadata = {
  title: {
    default: "The Wild Oasis admin side | Giorgi Gamgebeli",
    template: "%s | The Wild Oasis",
  },
  description:
    "A dedicated React frontend developer with a strong background in HTML, CSS, and JavaScript. I enjoy creating responsive, interactive user interfaces that enhance the user experience. My focus is on building scalable and modern applications with the latest frontend technologies like React, Tailwind CSS, and Next.js.",
  keywords: [
    "frontend",
    "giorgi",
    "gamgebeli",
    "giorgi gamgebeli",
    "react",
    "nextjs",
    "tech",
    "javascript",
    "typescript",
    "UI development",
    "frontend engineer",
    "frontend developer",
    "developer portfolio",
    "software",
    "software developer",
    "software engineer",
    "portfolio",
  ],
  openGraph: {
    title: "Giorgi Gamgebeli | Front-end Developer",
    description:
      "A dedicated React frontend developer with a strong background in HTML, CSS, and JavaScript, building scalable and modern applications with the latest frontend technologies like React, Tailwind CSS, and Next.js.",
    url: "https://www.giorgi-webdev-portfolio.vercel.app",
    siteName: "giorgi gamgebeli portfolio",
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      "max-image-preview": "large",
    },
  },
  category: "technology",
  twitter: {
    card: "summary_large_image",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="text-[62.5%]">
      <body
        className={`${poppins.className} ${sono.variable} text-[1.4rem] text-gray-700 dark:text-gray-200`}
      >
        <SessionProvider>
          <DarkModeProvider>
            <ClientProviders>{children}</ClientProviders>
          </DarkModeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
