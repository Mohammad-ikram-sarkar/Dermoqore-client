import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
      <p className="text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
        404
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground uppercase">
        Page not found
      </h1>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button className="mt-10" render={<Link href="/" />}>
        Back to home
      </Button>
    </main>
  );
}
