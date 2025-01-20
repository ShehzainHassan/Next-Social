import Navbar from "@/components/Navbar";
import { CommentProvider } from "@/utils/contexts/CommentContext";
import { PostProvider } from "@/utils/contexts/PostContext";
import { TokenProvider } from "@/utils/contexts/TokenContext";
import { UserProvider } from "@/utils/contexts/UserContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social Media App",
  description: "Social media app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="w-full px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
          <Providers>
            <TokenProvider>
              <UserProvider>
                <Navbar />
              </UserProvider>
            </TokenProvider>
          </Providers>
        </div>
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
          <TokenProvider>
            <UserProvider>
              <PostProvider>
                <CommentProvider>{children}</CommentProvider>
              </PostProvider>
            </UserProvider>
          </TokenProvider>
        </div>
      </body>
    </html>
  );
}
