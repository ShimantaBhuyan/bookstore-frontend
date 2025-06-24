import Link from "next/link";
import { ApolloWrapper } from "./ApolloWrapper";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Bookstore Frontend",
  description:
    "The frontend for the Bookstore application using Apollo client and Next.js.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="container mx-auto flex flex-col gap-10 px-4 py-8">
        <Link
          href="/"
          className="w-fit cursor-pointer rounded border border-gray-300 bg-white px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          Home
        </Link>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
