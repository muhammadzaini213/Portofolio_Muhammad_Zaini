import { Bebas_Neue, Poppins } from 'next/font/google';
import './globals.css';

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas'
});

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebas.variable} ${poppins.variable} scroll-smooth`}>
      <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <body className="bg-[#2d2d2d] text-white font-poppins">{children}</body>
    </html>
  );
}