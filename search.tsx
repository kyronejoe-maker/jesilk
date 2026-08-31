import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useCart } from "@/lib/cart-store";

export const Route = createFileRoute("/search")({ component: SearchPage });

function SearchPage() {
  const setSearchOpen = useCart((s) => s.setSearchOpen);
  const navigate = useNavigate();
  useEffect(() => {
    setSearchOpen(true);
    void navigate({ to: "/" });
  }, [navigate, setSearchOpen]);
  return null;
}
