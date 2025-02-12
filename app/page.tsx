import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col h-full items-center justify-center bg-gray-50 text-gray-900">
      <main className="flex flex-col items-center text-center gap-6 p-6">
        <h1 className="text-4xl font-bold">Welcome to Next.js</h1>
        <p className="text-lg text-gray-600 max-w-md">
          Build amazing web applications with React and Next.js.
        </p>
        <Button className="px-6 py-3 text-lg">Get Started</Button>
      </main>
    </div>
  );
}
