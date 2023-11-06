import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-24">
      <h1 className="text-6xl font-bold text-center">Home</h1>
      <Button variant="outline">Button</Button>
    </main>
  );
}
