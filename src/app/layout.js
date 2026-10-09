import "./globals.css";

export const metadata = {
  title: {
    default: "GetYourFruits | The World of Dry Fruits",
    template: "%s | GetYourFruits",
  },
  description:
    "Explore the world of dry fruits, including their benefits, nutrition, origins, production, history, uses and interesting facts.",
  keywords: [
    "dry fruits",
    "dry fruit information",
    "dry fruits benefits",
    "almonds",
    "pistachios",
    "cashews",
    "walnuts",
    "dates",
    "dried fruits",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}