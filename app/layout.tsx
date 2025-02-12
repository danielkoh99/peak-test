import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import "./globals.css";
import { QueryProvider } from "@/components/QueryProvider";

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
              <h1 className="text-xl font-bold">Peak test</h1>
            </div>
          </header>

          <main className="flex-1 px-6 py-8">{children}</main>

          <footer className="border-t bg-card py-4 text-center text-sm text-muted-foreground">
            {new Date().getFullYear()}
          </footer>

        </body>
      </html>
    </QueryProvider>
  );
}