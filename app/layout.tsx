import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const gravesend = localFont({
  src: [
    {
      path: './fonts/gravesend/gravesend-sans-fine.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/gravesend/gravesend-sans-light.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/gravesend/gravesend-sans-medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/gravesend/gravesend-sans-bold.ttf',
      weight: '700',
      style: 'normal',
    },
  
  ],
  variable: "--font-gravesend"
})

const scandia = localFont({
  src: [
    {
      path: './fonts/scandia/Scandia-Light.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/scandia/Scandia-LightItalic.woff',
      weight: '300',
      style: 'italic',
    },
    {
      path: './fonts/scandia/Scandia-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/scandia/Scandia-RegularItalic.woff',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/scandia/Scandia-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/scandia/Scandia-MediumItalic.woff',
      weight: '500',
      style: 'italic',
    },
    {
      path: './fonts/scandia/Scandia-Bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/scandia/Scandia-BoldItalic.woff',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-scandia'
})

export const metadata: Metadata = {
  title: "LuxySwap | Loren Ipsum...",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${scandia.variable} ${gravesend.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
