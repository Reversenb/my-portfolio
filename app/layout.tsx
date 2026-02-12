import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// โหลดฟอนต์ Inter จาก Google Fonts (Optimized อัตโนมัติโดย Next.js)
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter', // เผื่ออยากใช้ Tailwind เรียกใช้ผ่าน var
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Thanabodee | Portfolio", // ชื่อที่จะขึ้นบน Tab Browser
  description: "Computer Science Student Portfolio & Creative Developer",
  icons: {
    icon: '/vite.svg', // ถ้ามี favicon ใส่ตรงนี้ได้ (ใช้ของเดิมไปก่อน)
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-[#0b0f19] text-slate-200 selection:bg-indigo-500 selection:text-white`}>
        {/* antialiased: ทำให้ตัวหนังสือคมชัดขึ้น (macOS/iOS)
            selection:... : เปลี่ยนสีเวลาลากคลุมข้อความให้ดูพรีเมียม (สี Indigo)
        */}
        {children}
      </body>
    </html>
  );
}