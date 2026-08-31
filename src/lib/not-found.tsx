import { Link } from "@tanstack/react-router";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="font-sans text-[11px] tracking-[0.2em] text-gold uppercase">404</p>
      <h1 className="mt-3 font-display text-4xl">This square is missing</h1>
      <p className="mt-3 font-body text-sm text-muted">The page you asked for is not in the edit.</p>
      <Link to="/shop" className={cn(buttonVariants({ size: "md" }), "mt-8 inline-flex")}>
        Back to shop
      </Link>
    </div>
  );
}
