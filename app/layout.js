import { Inter, Oswald,Urbanist } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

import ReduxProvider from "./ReduxProvider";
import CartInitializer from "@/context/CartInitializer";


const inter = Inter({ subsets: ["latin"] });

// const oswald = Oswald({
//   subsets: ['latin'],
//   weight: ['200'], // Specify weights you need
//   // font-family: 'Oswald', sans-serif;
// });

// const urbanist = Urbanist({
//   subsets: ['latin'],
//   weight: ['100'], // Specify weights you need
//   // font-family: 'Urbanist', sans-serif;
// });

export const metadata = {
  title: "Online Shoe Store",
  description: "Ecommerce Shoe Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <body className={`${inter.className} ${oswald.className} ${urbanist.className}`}> */}

      <body className={`${inter.className}`}>
      
      <ReduxProvider>
        <CartInitializer />
          <Header />
          {children}
          <Footer />
        {/* </CartInitializer> */}
      </ReduxProvider>
      
      </body>
    </html>
  );
}
