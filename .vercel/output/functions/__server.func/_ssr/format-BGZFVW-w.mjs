//#region node_modules/.nitro/vite/services/ssr/assets/format-BGZFVW-w.js
function formatWhen(iso) {
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return iso;
	return d.toLocaleString("en-KE", {
		day: "numeric",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	});
}
function stockLabel(status) {
	if (status === "low") return "Low stock";
	if (status === "out") return "Out of stock";
	return "In stock";
}
//#endregion
export { stockLabel as n, formatWhen as t };
