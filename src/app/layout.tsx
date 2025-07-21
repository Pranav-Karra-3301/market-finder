import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Image from "next/image";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Market Finder - Insurance Carrier Discovery",
  description: "Find available insurance carriers in licensed states (CA, TX, AZ)",
  metadataBase: new URL('https://market-finder.pranavkarra.me'),
  openGraph: {
    title: "Market Finder - Insurance Carrier Discovery",
    description: "Find available insurance carriers in licensed states (CA, TX, AZ)",
    url: 'https://market-finder.pranavkarra.me',
    siteName: 'Market Finder',
    images: [
      {
        url: '/preview.png',
        width: 1200,
        height: 630,
        alt: 'Market Finder - Insurance Carrier Discovery Tool',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Market Finder - Insurance Carrier Discovery",
    description: "Find available insurance carriers in licensed states (CA, TX, AZ)",
    images: ['/preview.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '', // Add Google Search Console verification code if needed
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased bg-white`} style={{ fontFamily: 'Inter, system-ui, sans-serif', lineHeight: 1.5 }}>
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="bg-white">
            <div className="max-w-4xl mx-auto px-6 py-8">
              <div className="flex items-center justify-center space-x-4">
                <Image
                  src="/logo.png"
                  alt="Market Finder Logo"
                  width={64}
                  height={64}
                  className=""
                />
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Market Finder</h1>
              </div>
            </div>
          </header>
          
          {/* Main Content */}
          <main className="flex-1">
            <div className="w-full max-w-4xl mx-auto px-6 py-16">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
