import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./cn-Ccejyh36.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/status-badge-1zRt-Kgl.js
var import_jsx_runtime = require_jsx_runtime();
var TONES = {
	active: "bg-forest/10 text-forest",
	listed: "bg-forest/10 text-forest",
	featured: "bg-gold/25 text-ink",
	submitted: "bg-gold/20 text-ink",
	needs_info: "bg-gold/20 text-ink",
	draft: "bg-ink/8 text-muted",
	suspended: "bg-ink/10 text-ink",
	rejected: "bg-ink/10 text-muted",
	pending: "bg-gold/20 text-ink",
	ready: "bg-forest/10 text-forest",
	open: "bg-gold/20 text-ink",
	closed: "bg-ink/8 text-muted",
	received: "bg-gold/20 text-ink",
	packing: "bg-gold/20 text-ink",
	dispensed: "bg-forest/10 text-forest",
	in_stock: "bg-forest/10 text-forest",
	low: "bg-gold/25 text-ink",
	out: "bg-ink/10 text-muted"
};
function StatusBadge({ status }) {
	const label = status.replace(/_/g, " ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize", TONES[status] ?? "bg-ink/8 text-muted"),
		children: label
	});
}
//#endregion
export { StatusBadge as t };
