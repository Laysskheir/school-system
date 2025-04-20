import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center  p-6 ">
      <h1 className="text-4xl font-extrabold mb-4 text-primary">
        Welcome to the Dashboard
      </h1>
      <p className="text-lg text-muted-foreground mb-6">
        Your one-stop solution for managing your tasks efficiently.
      </p>

      <Button asChild>
         <Link href="/admission">Go to Admission</Link>
      </Button>
    </div>
  );
}
