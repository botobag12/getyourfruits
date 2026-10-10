import "./globals.css";
import { Roboto } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.getyourfruits.com"),
  title: {
    default: "GetYourFruits | Discover the World of Dry Fruits",
    template: "%s | GetYourFruits",
  },
  description:
    "Explore dry fruits, nuts, nutrition information, storage tips, and helpful guides from around the world.",
  openGraph: {
    siteName: "GetYourFruits",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}