//#region node_modules/.nitro/vite/services/ssr/assets/platform-yHVO60AA.js
var platform = {
	name: "Aether",
	legalName: "Aether Pharmacy Network",
	tagline: "The pharmacy network for Kenya",
	promise: "We promise life, and we promise caring.",
	description: "One patient account. Every neighbourhood pharmacy. Prescriptions, refills, vaccinations, and a pharmacist who still knows your name — from a licensed shop close to home.",
	email: "hello@aether.health",
	phone: "+254 790 670 542",
	phoneHref: "tel:+254790670542",
	whatsapp: "+254790670542",
	whatsappHref: "https://wa.me/254790670542",
	country: "Kenya",
	regulator: "Pharmacy and Poisons Board",
	emergency: "999",
	emergencyAlt: "112"
};
function pharmacyPath(slug, path = "/") {
	return `/p/${slug}${path === "/" ? "" : path}`;
}
function mapsEmbed(lat, lng) {
	return `https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed`;
}
function mapsDirections(lat, lng) {
	return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}
function waLink(phone, text) {
	return `https://wa.me/${phone.replace(/[^\d]/g, "")}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}
function formatKes(n) {
	return `KES ${n.toLocaleString("en-KE")}`;
}
//#endregion
export { platform as a, pharmacyPath as i, mapsDirections as n, waLink as o, mapsEmbed as r, formatKes as t };
