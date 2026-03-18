
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Profile from "../../components/Profile";

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
  title: 'React Find Demo / Next 14',
  description: 'Polished App Router demo for testing react-find source inspection.',
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
        <Profile>
            {children}
        </Profile>

      </body>
    </html>
  );
}
