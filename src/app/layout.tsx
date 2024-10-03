import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import ErrorProvider from "./store/error-provider";
import PortfolioProvider from "./store/portfolio-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mukul Arora",
  description: "Mukul Arora Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/icon.png" sizes="any" />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <ErrorProvider>
          <PortfolioProvider>
            <Suspense>
              <div id="error-modal-root"></div>
              {children}
              <div id="root"></div>
            </Suspense>
          </PortfolioProvider>
        </ErrorProvider>
      </body>
    </html>
  );
}
