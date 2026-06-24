import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Providers } from "@/components/Providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "ForgeWeb Lead Manager",
  description: "Advanced lead management portal for ForgeWeb. Optimize sales outreach and track prospects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={`${poppins.className} bg-[#F8FAFC] text-[#1E293B] min-h-screen antialiased selection:bg-[#0D99FF]/10 selection:text-[#0D99FF]`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}