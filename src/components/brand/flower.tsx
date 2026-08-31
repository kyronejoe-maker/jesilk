import { cn } from "@/lib/utils";

export function Flower({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("text-gold", className)}
      fill="currentColor"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : "presentation"}
    >
      {title ? <title>{title}</title> : null}
      <g transform="translate(16 16)">
        <ellipse cx="0" cy="-7.2" rx="3.4" ry="6.2" />
        <ellipse cx="0" cy="7.2" rx="3.4" ry="6.2" />
        <ellipse cx="-7.2" cy="0" rx="6.2" ry="3.4" />
        <ellipse cx="7.2" cy="0" rx="6.2" ry="3.4" />
        <circle cx="0" cy="0" r="2.4" className="fill-bg" />
        <circle cx="0" cy="0" r="1.35" />
      </g>
    </svg>
  );
}

export function GoldRuleFlower({ className }: { className?: string }) {
  return (
    <div className={cn("gold-rule max-w-xs", className)} aria-hidden="true">
      <Flower className="size-4 shrink-0" />
    </div>
  );
}
