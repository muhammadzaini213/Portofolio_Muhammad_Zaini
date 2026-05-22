import { Bebas_Neue, Poppins } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { Analytics } from '@vercel/analytics/next';

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

// Fallback jika database belum diisi
const FALLBACK = {
  title: "Zaini | Unity Gameplay Programmer & AI Systems Developer",
  description: "Specializing in Unity gameplay systems, advanced AI architectures, and technical design for immersive game experiences.",
  siteUrl: "https://zaini-portfolio.vercel.app",
  ogImage: "/images/og-preview.png",
  twitterImage: "/images/og-preview.png",
  googleVerifyId: "US1DmiDdDrZhWUkQ97WVUru06GcRG23v7WQC1p1GZh8",
}

export async function generateMetadata(): Promise<Metadata> {
  const meta = await prisma.siteMetadata.findUnique({ where: { id: 1 } })

  const title = meta?.title || FALLBACK.title
  const description = meta?.description || FALLBACK.description
  const siteUrl = meta?.siteUrl || FALLBACK.siteUrl
  const ogImage = meta?.ogImage || FALLBACK.ogImage
  const twitterImage = meta?.twitterImage || FALLBACK.twitterImage
  const googleVerifyId = meta?.googleVerifyId || FALLBACK.googleVerifyId

  return {
    title,
    description,
    verification: {
      google: googleVerifyId,
    },
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: "Zaini Portfolio",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Zaini Portfolio Preview",
        },
      ],
      locale: "id_ID",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [twitterImage],
    },
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebas.variable} ${poppins.variable} scroll-smooth`}>
      <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <body className="bg-primary text-white font-poppins">
        {children}
        <Analytics />
      </body>
    </html>
  );
}