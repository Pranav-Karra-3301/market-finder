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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased bg-gray-50`} style={{ fontFamily: 'Inter, system-ui, sans-serif', lineHeight: 1.5 }}>
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="bg-white border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-6 py-8">
              <div className="flex items-center justify-center space-x-4">
                <Image
                  src="/logo.png"
                  alt="Market Finder Logo"
                  width={48}
                  height={48}
                  className="rounded-xl shadow-sm"
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
