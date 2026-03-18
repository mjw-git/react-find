import type { Metadata } from 'next';
import './globals.css';
import Profile from '../../components/Profile';

export const metadata: Metadata = {
  title: 'React Find Demo / Next 15',
  description: 'Polished App Router demo for testing react-find source inspection.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Profile>{children}</Profile>
      </body>
    </html>
  );
}
