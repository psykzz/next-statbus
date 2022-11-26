import Script from 'next/script';
import Footer from '../components/Footer';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        {children}
        <Footer />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-N45E21FRJB"
        />
        <Script id="google-gtag">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-N45E21FRJB');`}
        </Script>
      </body>
    </html>
  );
}
