import { createFileRoute } from "@tanstack/react-router";
import { CollectionView } from "@/components/product/collection-view";
import { getCollection } from "@/lib/products";
import { NotFound } from "@/lib/not-found";

export const Route = createFileRoute("/collections/$handle")({
  component: CollectionPage,
});

function CollectionPage() {
  const { handle } = Route.useParams();
  if (!getCollection(handle)) return <NotFound />;
  return <CollectionView handle={handle} />;
}
