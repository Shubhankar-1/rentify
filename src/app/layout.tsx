'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "./(store)/store";
import { NextUIProvider } from "@nextui-org/react";
import { Providers } from "./providers";
import NavBar from "@/components/NavBar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Rentify",
//   description: "Rentify is a platform for renting and leasing properties.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <Providers>
        <NavBar />
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <div className="flex justify-center items-center pt-20">
          {children}
        </div>
      </Providers>
    </Provider>
  );
}
