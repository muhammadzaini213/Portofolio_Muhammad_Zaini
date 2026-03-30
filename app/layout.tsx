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
  // Title yang muncul di tab browser
  title: "Zaini | Gameplay Programmer & AI Systems",
  description: "Unity Developer specializing in immersive gameplay systems and technical prototypes.",

  // Open Graph (Untuk WhatsApp, Facebook, LinkedIn)
  openGraph: {
    title: "Zaini | Gameplay Programmer",
    description: "Building the next generation of gameplay systems. Check out my latest technical prototypes and projects.",
    url: "https://zaini-portfolio.vercel.app", // Ganti dengan URL Vercel kamu nanti
    siteName: "Zaini Portfolio",
    images: [
      {
        url: "/images/og-preview.png", // File ini harus ada di folder public/images/
        width: 1200,
        height: 630,
        alt: "Zaini Portfolio Preview Logo",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Zaini | Gameplay Programmer",
    description: "Unity Gameplay & AI Systems Developer",
    images: ["/images/og-preview.png"], // Sama dengan OG Image
  },
};

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