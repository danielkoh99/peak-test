import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import "./globals.css";
import { QueryProvider } from "@/components/QueryProvider";
import { StarIcon } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Peak test Dani",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <html lang="en">
        <body className={cn("flex flex-col min-h-screen bg-background text-foreground")}>
          <header className="sticky top-0 w-full border-b bg-card/50 backdrop-blur-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <h1 className="text-xl font-bold">Peak test</h1>
                <Link href="/" className="flex gap-2 items-center border rounded-lg shadow-sm bg-white hover:bg-gray-100 transition p-2" >
                  <p>Search</p>
                </Link>
              </div>
              <Link href="/stock/saved" className="flex gap-2 items-center border rounded-lg shadow-sm bg-white hover:bg-gray-100 transition p-2" >
                <p>Saved</p>
                <StarIcon className="w-5 h-5 text-yellow-500 hover:fill-yellow-500 transition-all" />
              </Link>
            </div>
          </header>

          <main className="flex flex-1 h-full px-6 py-8">{children}</main>

        </body>
      </html>
    </QueryProvider>
  );
}