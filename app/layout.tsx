import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import "./globals.css";
import { StarIcon } from "lucide-react";
import Link from "next/link";
import { SavedItemsProvider } from "./contexts/SavedItemContext";
import { QueryProvider } from "./providers/QueryProvider";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Peak test Dani",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <SavedItemsProvider>
      <QueryProvider>
        <html lang="en">
          <body className={cn("flex flex-col min-h-screen bg-background text-foreground")}>
            <header className="sticky top-0 w-full border-b bg-card/50 backdrop-blur-md z-20">
              <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row gap-4 items-center ">
                <h1 className="text-xl font-bold">Peak test</h1>
                <Button variant="outline" className="w-full md:w-auto">
                  <Link href="/" className="flex gap-2 items-center transition p-2" >
                    <p>Search</p>
                  </Link>
                </Button>
                <Button variant="outline" className="w-full md:w-auto">
                  <Link href="/stock/saved" className="flex gap-2 items-center p-2" >
                    <p>Saved</p>
                    <StarIcon className="w-5 h-5 text-yellow-500 transition-all" />
                  </Link>
                </Button>

              </div>
            </header>

            <main className="flex flex-col flex-1 overflow-hidden px-6 py-8">{children}</main>

          </body>
        </html>
      </QueryProvider>
    </SavedItemsProvider>
  );
}