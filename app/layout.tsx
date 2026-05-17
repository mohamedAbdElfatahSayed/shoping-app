import "./globals.css";
import type { ReactNode } from "react";
import Header from "./components/header/Header";
import { ToastContainer } from "react-toastify";
import ReduxProvider from "./providers";
import Footer from "./components/footer/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>

          <ReduxProvider>
            
          <Header />
            {children}
            <ToastContainer position="top-right" />
            <Footer/>
          </ReduxProvider>

      </body>
    </html>
  );
}