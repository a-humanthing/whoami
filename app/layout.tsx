import { Geist, Geist_Mono } from "next/font/google";
import { AnalyticsProvider } from "@/components/analytics/analytics-provider";
import { ContactModal } from "@/components/analytics/contact-modal";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arun Krishna- whoami",
  description:
    "I'm a software engineerFullstack Web Developer with 2 Year of broad and depth Industrial Experience in Developing and Maintaining Product Based Software with Best Practices. Currently focused on development with MERN. Keen in Developing software which make impact in Daily living . Proficient In core Javascript concepts",
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
        <AnalyticsProvider>
            {children}
            <ContactModal />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
