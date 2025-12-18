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
  metadataBase: new URL("https://arunkrishnakt.netlify.app"), // Assuming domain, or use process.env.NEXT_PUBLIC_BASE_URL
  title: {
    default: "Arun Krishna - Software Engineer | India",
    template: "%s | Arun Krishna"
  },
  description: "Arun Krishna is a Full Stack Web Developer with 3+ years of experience in MERN stack, Next.js, and NestJS. Building scalable software solutions at Livello and Guidesly.",
  keywords: ["Arun Krishna", "Full Stack Developer", "MERN Stack", "NestJS", "Next.js", "React", "TypeScript", "Livello", "Guidesly", "India"],
  authors: [{ name: "Arun Krishna", url: "https://arunkrishnakt.netlify.app" }],
  creator: "Arun Krishna",
  publisher: "Arun Krishna",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arunkrishnakt.netlify.app",
    title: "Arun Krishna - Software Engineer | India",
    description: "Full Stack Engineer specializing in modern web technologies. Building scalable solutions at Guidesly.",
    siteName: "Arun Krishna Portfolio",
    images: [
      {
        url: "/og-image.jpg", // Needs to be added to public/ or opengraph-image.tsx created
        width: 1200,
        height: 630,
        alt: "Arun Krishna - Software Engineer",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arun Krishna - Software Engineer",
    description: "Building scalable web solutions. Software Engineer at Guidesly.",
    creator: "@arunkrishna", // Replace with actual handle if different
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://arunkrishnakt.netlify.app",
  },
  verification: {
    google: 'hay1fWAWGbcxhpRYhT3DqDEdB0oGRbgHvTnELNUW_4Y',
  },
};

import JsonLd from "@/components/seo/json-ld";

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
        <JsonLd />
        <AnalyticsProvider>
            {children}
            <ContactModal />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
