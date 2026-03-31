import { Bebas_Neue, Poppins } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';

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

export const metadata: Metadata = {
  title: "Zaini | Unity Gameplay Programmer & AI Systems Developer", // Diperpanjang agar tidak "Short"
  description: "Specializing in Unity gameplay systems, advanced AI architectures, and technical design for immersive game experiences.", // Diperpanjang

  openGraph: {
    title: "Zaini | Unity Gameplay Programmer & AI Systems",
    description: "Building immersive gameplay systems and technical prototypes. See my latest work and technical articles.",
    url: "https://zaini-portfolio.vercel.app", // PASTIKAN ini sama dengan domain Vercel kamu
    siteName: "Zaini Portfolio",
    images: [
      {
        url: "/images/og-preview.png", // GUNAKAN FULL URL SEPERTI INI
        width: 1200,
        height: 630,
        alt: "Zaini Portfolio Preview Logo",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

metadata.twitter = {
  card: "summary_large_image",
  title: "Zaini | Unity Gameplay Programmer & AI Systems",
  description: "Building immersive gameplay systems and technical prototypes.",
  images: ["/images/og-preview.png"]
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebas.variable} ${poppins.variable} scroll-smooth`}>
      <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="google-site-verification" content="US1DmiDdDrZhWUkQ97WVUru06GcRG23v7WQC1p1GZh8" />
      <body className="bg-primary text-white font-poppins">{children}</body>
    </html>
  );
}