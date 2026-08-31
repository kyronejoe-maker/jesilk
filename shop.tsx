import { createFileRoute } from "@tanstack/react-router";
import { CollectionView } from "@/components/product/collection-view";

export const Route = createFileRoute("/shop")({ component: ShopPage });

function ShopPage() {
  return <CollectionView handle="all" />;
}
