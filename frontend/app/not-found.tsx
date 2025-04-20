import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="max-w-2xl px-8 py-16 text-center">
                <div className="mb-8">
                    <h1 className="text-7xl font-extrabold text-primary mb-2">404</h1>
                    <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Oops! It seems this page has gone out of style.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/admission">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back
                    </Link>
                </Button>
            </div>
        </div>
    );
}
