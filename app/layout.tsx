import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'OMYPY App',
  description: '  Spend, save, and stay on top of your finances,all with a focus on your financial security ',
    viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  openGraph: {
    images: [
      {
        url: 'https://ompay.om/wp-content/uploads/2025/10/HomePage-Hand-100OMR-1536x1090.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://ompay.om/wp-content/uploads/2025/10/HomePage-Hand-100OMR-1536x1090.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  );
}
