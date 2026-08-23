import { y as getRouteApi } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/storefront-context-DyvpP1Cd.js
var storefrontRoute = getRouteApi("/p/$slug");
function usePharmacy() {
	return storefrontRoute.useLoaderData();
}
//#endregion
export { usePharmacy as t };
