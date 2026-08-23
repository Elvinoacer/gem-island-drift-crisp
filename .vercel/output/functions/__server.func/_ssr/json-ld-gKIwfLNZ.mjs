import { i as pharmacyPath } from "./platform-yHVO60AA.mjs";
import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/json-ld-gKIwfLNZ.js
var import_jsx_runtime = require_jsx_runtime();
function PharmacyJsonLd({ pharmacy }) {
	const data = {
		"@context": "https://schema.org",
		"@type": "Pharmacy",
		name: pharmacy.name,
		description: pharmacy.description || pharmacy.tagline,
		image: pharmacy.coverImageUrl || pharmacy.images[0]?.url,
		telephone: pharmacy.phone,
		email: pharmacy.email,
		url: pharmacyPath(pharmacy.slug),
		address: {
			"@type": "PostalAddress",
			streetAddress: pharmacy.street,
			addressLocality: pharmacy.city,
			addressRegion: pharmacy.county,
			postalCode: pharmacy.zip,
			addressCountry: "KE"
		},
		areaServed: {
			"@type": "City",
			name: pharmacy.city
		}
	};
	if (pharmacy.latitude != null && pharmacy.longitude != null) {
		data.geo = {
			"@type": "GeoCoordinates",
			latitude: pharmacy.latitude,
			longitude: pharmacy.longitude
		};
		data.hasMap = `https://www.google.com/maps?q=${pharmacy.latitude},${pharmacy.longitude}`;
	}
	if (pharmacy.hours.length) data.openingHours = pharmacy.hours.map((h) => `${h.day} ${h.time}`);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
		type: "application/ld+json",
		dangerouslySetInnerHTML: { __html: JSON.stringify(data) }
	});
}
function BreadcrumbJsonLd({ items }) {
	const data = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name: item.name,
			item: item.path
		}))
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
		type: "application/ld+json",
		dangerouslySetInnerHTML: { __html: JSON.stringify(data) }
	});
}
//#endregion
export { PharmacyJsonLd as n, BreadcrumbJsonLd as t };
