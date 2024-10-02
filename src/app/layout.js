import localFont from "next/font/local";
import "./globals.css";

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



export const metadata = {
  title: 'Recharge Your Mobile | Amazing Offers',
  description: 'Recharge your mobile with the best offers available upto 95% discount. Choose a plan and pay easily using UPI!',
  openGraph: {
    title: 'Recharge Your Mobile',
    description: 'Recharge your mobile with the best offers available. Choose a plan and pay easily using UPI!',
    images: [
      {
        url: '/offer.png', // Replace with your image path in the public directory
        width: 800,
        height: 600,
        alt: 'Recharge Offers',
      },
    ],
    url: 'https://recharge-app-lime.vercel.app/', // Change this to your actual URL when deployed
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
