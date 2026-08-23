import { getRouteApi } from "@tanstack/react-router";
import type { PharmacyStorefront } from "@/lib/types";

const storefrontRoute = getRouteApi("/p/$slug");

export function usePharmacy(): PharmacyStorefront {
  return storefrontRoute.useLoaderData();
}
