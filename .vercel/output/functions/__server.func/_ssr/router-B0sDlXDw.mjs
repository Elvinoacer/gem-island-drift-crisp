import { o as __toESM } from "../_runtime.mjs";
import { a as platform } from "./platform-yHVO60AA.mjs";
import { C as useRouter, G as require_react, W as notFound, _ as createFileRoute, d as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, u as Scripts, v as createRootRoute, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn, s as __exportAll } from "./ssr.mjs";
import { A as array, B as union, F as number, I as object, N as literal, z as string } from "../_libs/@better-auth/core+[...].mjs";
import { a as getSql, r as ensureSeed } from "./seed-Crd82BVY.mjs";
import { n as auth } from "./server-BWkyY3jb.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
import { n as TriangleAlert } from "../_libs/lucide-react.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public-DPiG2HVA.js
var listMarketplace = createServerFn({ method: "GET" }).validator(object({
	q: string().optional(),
	city: string().optional()
})).handler(createSsrRpc("11f8c48059f6ef3c873243029b7bbaa9a9dc84cc9a2711787238836da519ddab"));
var listCities = createServerFn({ method: "GET" }).handler(createSsrRpc("c763b5a2215b1a7f285776f6eb627ce59787efdfacf85719f1a45a7de7bb8733"));
var getStorefront = createServerFn({ method: "GET" }).validator(object({ slug: string() })).handler(createSsrRpc("69753bb1c381f6a3bcf402d5012a8c39a0780791d561711400d2ed3135ea429f"));
var getServicePage = createServerFn({ method: "GET" }).validator(object({
	slug: string(),
	serviceSlug: string()
})).handler(createSsrRpc("314017496ac3d80c78d9a75ec9548b007ec8a1f494e492855efa59d07946cab8"));
var listMedicines = createServerFn({ method: "GET" }).validator(object({
	slug: string(),
	q: string().optional(),
	category: string().optional()
})).handler(createSsrRpc("22ffa0952f0957b3fd3d4104d445395900c36ac957ed4cc0c83bf672832a0491"));
var getMedicinePage = createServerFn({ method: "GET" }).validator(object({
	slug: string(),
	medSlug: string()
})).handler(createSsrRpc("fc127521b868687e5398655c84bba38bf33bfa30f4c7ec5cb2c0197a5dedd575"));
var listArticles = createServerFn({ method: "GET" }).handler(createSsrRpc("e99c7bf8408d85097d21117efb219dc9c3215684c0c50f903489517975d7d8f4"));
var getArticle = createServerFn({ method: "GET" }).validator(object({
	slug: string(),
	articleSlug: string()
})).handler(createSsrRpc("175df518016fc1775ba5f35420eb727d8a4e10d5a0dfd02d2c2027f08275d7a0"));
var submitEnquiry = createServerFn({ method: "POST" }).validator(object({
	slug: string(),
	name: string().min(2),
	email: string().email().or(literal("")),
	phone: string().min(7),
	subject: string().min(2),
	message: string().min(8)
})).handler(createSsrRpc("dd08098ebce7517d13f7a5629b6afd4317776f12f9c13f72bf4edae559e11273"));
var submitRefill = createServerFn({ method: "POST" }).validator(object({
	slug: string(),
	name: string().min(2),
	phone: string().min(7),
	medication: string().min(2),
	notes: string().optional()
})).handler(createSsrRpc("8bbe982c3317617955b05f96df3de94756b13ccdaf56805491e701242d526a17"));
var submitOrder = createServerFn({ method: "POST" }).validator(object({
	slug: string(),
	name: string().min(2),
	phone: string().min(7),
	items: array(object({
		name: string(),
		qty: number(),
		priceKes: number()
	})).min(1)
})).handler(createSsrRpc("813b3d25cc2bcaa9bdd284f89f9db0c3ca49ea4b0833c2720b46c1242572470e"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/seo-CIyC4abA.js
function pageHead(title, description) {
	return { meta: [{ title }, {
		name: "description",
		content: description
	}] };
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-B0sDlXDw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-eu8rHFLv.css";
var APP_NAME = "Aether";
var Route$32 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#0d5c4b"
			},
			{
				name: "description",
				content: "Aether is Kenya’s pharmacy network — neighbourhood shops with prescriptions, refills, vaccinations, and a pharmacist who still knows your name."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Outfit:wght@400;500;600;700&display=swap"
			}
		]
	}),
	component: RootDocument,
	notFoundComponent: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center bg-cream px-6 text-center text-ink",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "Aether"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl",
				children: "This page is not on the map"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: "The pharmacy or page you asked for is not listed."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "/",
				className: "btn-primary mt-6",
				children: "Find a pharmacy"
			})
		] })
	})
});
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "top-center",
				richColors: false
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$28 = () => import("./routes-eHzlYWd4.mjs");
var Route$31 = createFileRoute("/")({
	validateSearch: (s) => ({
		...typeof s.q === "string" && s.q ? { q: s.q } : {},
		...typeof s.city === "string" && s.city ? { city: s.city } : {}
	}),
	loaderDeps: ({ search }) => ({
		q: search.q,
		city: search.city
	}),
	loader: async ({ deps }) => {
		const [pharmacies, cities] = await Promise.all([listMarketplace({ data: {
			q: deps.q,
			city: deps.city
		} }), listCities()]);
		return {
			pharmacies,
			cities
		};
	},
	head: () => pageHead("Aether — The pharmacy network for Kenya", platform.description),
	component: lazyRouteComponent($$splitComponentImporter$28, "component")
});
var $$splitComponentImporter$27 = () => import("./admin-QAX-VSLc.mjs");
var Route$30 = createFileRoute("/admin")({
	head: () => pageHead("Staff console · Aether", "Run your pharmacy: storefront, inventory, refills, and patients."),
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
var $$splitComponentImporter$26 = () => import("./for-pharmacies-Cze_sIaj.mjs");
var Route$29 = createFileRoute("/for-pharmacies")({
	head: () => pageHead("For pharmacies · Aether", "List your licensed Kenyan pharmacy on Aether: a public storefront, staff console, and patient portal — reviewed before you go live."),
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
var $$splitComponentImporter$25 = () => import("./login-hOGhF_Hz.mjs");
var Route$28 = createFileRoute("/login")({
	validateSearch: (s) => typeof s.next === "string" ? { next: s.next } : {},
	head: () => pageHead("Sign in · Aether", "Sign in to the Aether pharmacy network."),
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
var $$splitComponentImporter$24 = () => import("./onboard-vLkdEbrN.mjs");
var Route$27 = createFileRoute("/onboard")({
	head: () => pageHead("List your pharmacy · Aether", "Apply to list a PPB-licensed Kenyan pharmacy on the Aether network."),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./platform-B5TdjRPj.mjs");
var Route$26 = createFileRoute("/platform")({
	head: () => pageHead("Aether platform", "Review pharmacies, listing, and network health."),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./portal-Bq5Ssvhr.mjs");
var Route$25 = createFileRoute("/portal")({
	head: () => pageHead("Patient portal · Aether", "Your pharmacies, loyalty, and refill requests."),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var BODY = `User-agent: *
Allow: /
Allow: /p/
Allow: /for-pharmacies
Disallow: /admin
Disallow: /platform
Disallow: /portal
Disallow: /onboard
Disallow: /login
Disallow: /api/
Sitemap: /sitemap.xml
`;
var Route$24 = createFileRoute("/robots.txt")({ server: { handlers: { GET: () => new Response(BODY, { headers: { "Content-Type": "text/plain; charset=utf-8" } }) } } });
var Route$23 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async ({ request }) => {
	await ensureSeed();
	const origin = new URL(request.url).origin;
	const sql = await getSql();
	const pharmacies = await sql`
          select slug from pharmacies where status = 'active' and listed = true
        `;
	const services = await sql`
          select p.slug, s.slug as service
          from services s
          join pharmacies p on p.id = s.pharmacy_id
          where p.status = 'active' and p.listed = true and s.published = true
        `;
	const meds = await sql`
          select p.slug, m.slug as med
          from pharmacy_inventory i
          join pharmacies p on p.id = i.pharmacy_id
          join medicines m on m.id = i.medicine_id
          where p.status = 'active' and p.listed = true and i.listed = true
        `;
	const articles = await sql`
          select slug from health_articles where published = true
        `;
	const urls = ["/", "/for-pharmacies"];
	const pages = [
		"",
		"/about",
		"/services",
		"/medicines",
		"/health",
		"/location",
		"/contact",
		"/refill"
	];
	for (const p of pharmacies) for (const page of pages) urls.push(`/p/${p.slug}${page}`);
	for (const s of services) urls.push(`/p/${s.slug}/services/${s.service}`);
	for (const m of meds) urls.push(`/p/${m.slug}/medicines/${m.med}`);
	for (const p of pharmacies) for (const a of articles) urls.push(`/p/${p.slug}/health/${a.slug}`);
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${origin}${u}</loc><changefreq>weekly</changefreq></url>`).join("\n")}
</urlset>`;
	return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
} } } });
var $$splitComponentImporter$21 = () => import("./admin-DgjQ45ag.mjs");
var Route$22 = createFileRoute("/admin/")({ component: lazyRouteComponent($$splitComponentImporter$21, "component") });
var $$splitComponentImporter$20 = () => import("./customers-n3dMpS4y.mjs");
var Route$21 = createFileRoute("/admin/customers")({ component: lazyRouteComponent($$splitComponentImporter$20, "component") });
var $$splitComponentImporter$19 = () => import("./enquiries-sZL8o-6g.mjs");
var Route$20 = createFileRoute("/admin/enquiries")({ component: lazyRouteComponent($$splitComponentImporter$19, "component") });
var $$splitComponentImporter$18 = () => import("./medicines-ycHJkdUH.mjs");
var Route$19 = createFileRoute("/admin/medicines")({ component: lazyRouteComponent($$splitComponentImporter$18, "component") });
var $$splitComponentImporter$17 = () => import("./orders-DS-WpL48.mjs");
var Route$18 = createFileRoute("/admin/orders")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
var $$splitComponentImporter$16 = () => import("./refills-DpquOplC.mjs");
var Route$17 = createFileRoute("/admin/refills")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./services-B3Qjdfbi.mjs");
var Route$16 = createFileRoute("/admin/services")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./storefront-DofoKsBa.mjs");
var Route$15 = createFileRoute("/admin/storefront")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("../_slug-Bjqa1gRF.mjs");
var Route$14 = createFileRoute("/p/$slug")({
	loader: async ({ params }) => {
		const pharmacy = await getStorefront({ data: { slug: params.slug } });
		if (!pharmacy) throw notFound();
		return pharmacy;
	},
	head: ({ loaderData }) => pageHead(loaderData ? `${loaderData.name} · ${loaderData.city} pharmacy · Aether` : "Pharmacy · Aether", loaderData?.description || loaderData?.tagline || "A listed Aether pharmacy."),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./platform-D3XLhhgf.mjs");
var Route$13 = createFileRoute("/platform/")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./applications-6c4e22pg.mjs");
var Route$12 = createFileRoute("/platform/applications")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var Route$11 = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var $$splitComponentImporter$10 = () => import("../_slug-BTaPSYmw.mjs");
var Route$10 = createFileRoute("/p/$slug/")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./about-fUFRkhVF.mjs");
var Route$9 = createFileRoute("/p/$slug/about")({
	head: ({ params }) => pageHead(`About · ${params.slug}`, "Meet the pharmacists and the story of this neighbourhood shop."),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./contact-Como5BxS.mjs");
var Route$8 = createFileRoute("/p/$slug/contact")({
	head: ({ params }) => pageHead(`Contact · ${params.slug}`, "Message this pharmacy."),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./location-DTs1UhvV.mjs");
var Route$7 = createFileRoute("/p/$slug/location")({
	head: ({ params }) => pageHead(`Location · ${params.slug}`, "Map, hours, and directions to this Aether pharmacy."),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./refill-C7Lhz6zP.mjs");
var Route$6 = createFileRoute("/p/$slug/refill")({
	head: ({ params }) => pageHead(`Prescription refill · ${params.slug}`, "Request a refill from this neighbourhood pharmacy."),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./health-sxXFtZbq.mjs");
var Route$5 = createFileRoute("/p/$slug/health/")({
	loader: () => listArticles(),
	head: ({ params }) => pageHead(`Health notes · ${params.slug}`, "Pharmacist-written guidance from the Aether network."),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("../_articleSlug-B7dOe0Bc.mjs");
var Route$4 = createFileRoute("/p/$slug/health/$articleSlug")({
	loader: async ({ params }) => {
		const data = await getArticle({ data: {
			slug: params.slug,
			articleSlug: params.articleSlug
		} });
		if (!data?.article) throw notFound();
		return data;
	},
	head: ({ loaderData }) => pageHead(loaderData ? `${loaderData.article.title} · ${loaderData.pharmacy.name}` : "Article", loaderData?.article.excerpt ?? ""),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./medicines-BNQs1r3v.mjs");
var Route$3 = createFileRoute("/p/$slug/medicines/")({
	validateSearch: (s) => ({
		...typeof s.q === "string" && s.q ? { q: s.q } : {},
		...typeof s.category === "string" && s.category ? { category: s.category } : {}
	}),
	loaderDeps: ({ search }) => ({
		q: search.q,
		category: search.category
	}),
	loader: async ({ params, deps }) => {
		const data = await listMedicines({ data: {
			slug: params.slug,
			q: deps.q,
			category: deps.category
		} });
		if (!data) throw new Error("Pharmacy not found");
		return data;
	},
	head: ({ loaderData }) => pageHead(loaderData ? `Medicines at ${loaderData.pharmacy.name} · ${loaderData.pharmacy.city}` : "Medicines", "OTC and wellness products in stock at this Aether pharmacy."),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("../_medSlug-B9TGXRG6.mjs");
var Route$2 = createFileRoute("/p/$slug/medicines/$medSlug")({
	loader: async ({ params }) => {
		const data = await getMedicinePage({ data: {
			slug: params.slug,
			medSlug: params.medSlug
		} });
		if (!data?.item) throw notFound();
		return data;
	},
	head: ({ loaderData }) => pageHead(loaderData ? `${loaderData.item.name} at ${loaderData.pharmacy.name} · ${loaderData.pharmacy.city}` : "Medicine", loaderData?.item.description ?? ""),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./services-D9HyYwdH.mjs");
var Route$1 = createFileRoute("/p/$slug/services/")({
	head: ({ params }) => pageHead(`Services · ${params.slug}`, "Clinical and retail services at this pharmacy."),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_serviceSlug-B0vYvvvE.mjs");
var Route = createFileRoute("/p/$slug/services/$serviceSlug")({
	loader: async ({ params }) => {
		const data = await getServicePage({ data: {
			slug: params.slug,
			serviceSlug: params.serviceSlug
		} });
		if (!data?.service) throw notFound();
		return data;
	},
	head: ({ loaderData }) => pageHead(loaderData ? `${loaderData.service.title} at ${loaderData.pharmacy.name} · ${loaderData.pharmacy.city}` : "Service", loaderData?.service.short ?? ""),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$31.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$32
});
var AdminRoute = Route$30.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$32
});
var ForPharmaciesRoute = Route$29.update({
	id: "/for-pharmacies",
	path: "/for-pharmacies",
	getParentRoute: () => Route$32
});
var LoginRoute = Route$28.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$32
});
var OnboardRoute = Route$27.update({
	id: "/onboard",
	path: "/onboard",
	getParentRoute: () => Route$32
});
var PlatformRoute = Route$26.update({
	id: "/platform",
	path: "/platform",
	getParentRoute: () => Route$32
});
var PortalRoute = Route$25.update({
	id: "/portal",
	path: "/portal",
	getParentRoute: () => Route$32
});
var RobotsDottxtRoute = Route$24.update({
	id: "/robots.txt",
	path: "/robots.txt",
	getParentRoute: () => Route$32
});
var SitemapDotxmlRoute = Route$23.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$32
});
var AdminIndexRoute = Route$22.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var AdminCustomersRoute = Route$21.update({
	id: "/customers",
	path: "/customers",
	getParentRoute: () => AdminRoute
});
var AdminEnquiriesRoute = Route$20.update({
	id: "/enquiries",
	path: "/enquiries",
	getParentRoute: () => AdminRoute
});
var AdminMedicinesRoute = Route$19.update({
	id: "/medicines",
	path: "/medicines",
	getParentRoute: () => AdminRoute
});
var AdminOrdersRoute = Route$18.update({
	id: "/orders",
	path: "/orders",
	getParentRoute: () => AdminRoute
});
var AdminRefillsRoute = Route$17.update({
	id: "/refills",
	path: "/refills",
	getParentRoute: () => AdminRoute
});
var AdminServicesRoute = Route$16.update({
	id: "/services",
	path: "/services",
	getParentRoute: () => AdminRoute
});
var AdminStorefrontRoute = Route$15.update({
	id: "/storefront",
	path: "/storefront",
	getParentRoute: () => AdminRoute
});
var PSlugRoute = Route$14.update({
	id: "/p/$slug",
	path: "/p/$slug",
	getParentRoute: () => Route$32
});
var PlatformIndexRoute = Route$13.update({
	id: "/",
	path: "/",
	getParentRoute: () => PlatformRoute
});
var PlatformApplicationsRoute = Route$12.update({
	id: "/applications",
	path: "/applications",
	getParentRoute: () => PlatformRoute
});
var ApiAuthSplatRoute = Route$11.update({
	id: "/api/auth/$",
	path: "/api/auth/$",
	getParentRoute: () => Route$32
});
var PSlugIndexRoute = Route$10.update({
	id: "/",
	path: "/",
	getParentRoute: () => PSlugRoute
});
var PSlugAboutRoute = Route$9.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => PSlugRoute
});
var PSlugContactRoute = Route$8.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => PSlugRoute
});
var PSlugLocationRoute = Route$7.update({
	id: "/location",
	path: "/location",
	getParentRoute: () => PSlugRoute
});
var PSlugRefillRoute = Route$6.update({
	id: "/refill",
	path: "/refill",
	getParentRoute: () => PSlugRoute
});
var PSlugHealthIndexRoute = Route$5.update({
	id: "/health/",
	path: "/health/",
	getParentRoute: () => PSlugRoute
});
var PSlugHealthArticleSlugRoute = Route$4.update({
	id: "/health/$articleSlug",
	path: "/health/$articleSlug",
	getParentRoute: () => PSlugRoute
});
var PSlugMedicinesIndexRoute = Route$3.update({
	id: "/medicines/",
	path: "/medicines/",
	getParentRoute: () => PSlugRoute
});
var PSlugMedicinesMedSlugRoute = Route$2.update({
	id: "/medicines/$medSlug",
	path: "/medicines/$medSlug",
	getParentRoute: () => PSlugRoute
});
var PSlugServicesIndexRoute = Route$1.update({
	id: "/services/",
	path: "/services/",
	getParentRoute: () => PSlugRoute
});
var PSlugServicesServiceSlugRoute = Route.update({
	id: "/services/$serviceSlug",
	path: "/services/$serviceSlug",
	getParentRoute: () => PSlugRoute
});
var AdminRouteChildren = {
	AdminCustomersRoute,
	AdminEnquiriesRoute,
	AdminMedicinesRoute,
	AdminOrdersRoute,
	AdminRefillsRoute,
	AdminServicesRoute,
	AdminStorefrontRoute,
	AdminIndexRoute
};
var AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
var PlatformRouteChildren = {
	PlatformApplicationsRoute,
	PlatformIndexRoute
};
var PlatformRouteWithChildren = PlatformRoute._addFileChildren(PlatformRouteChildren);
var PSlugRouteChildren = {
	PSlugAboutRoute,
	PSlugContactRoute,
	PSlugLocationRoute,
	PSlugRefillRoute,
	PSlugIndexRoute,
	PSlugHealthArticleSlugRoute,
	PSlugMedicinesMedSlugRoute,
	PSlugServicesServiceSlugRoute,
	PSlugHealthIndexRoute,
	PSlugMedicinesIndexRoute,
	PSlugServicesIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AdminRoute: AdminRouteWithChildren,
	ForPharmaciesRoute,
	LoginRoute,
	OnboardRoute,
	PlatformRoute: PlatformRouteWithChildren,
	PortalRoute,
	RobotsDottxtRoute,
	SitemapDotxmlRoute,
	PSlugRoute: PSlugRoute._addFileChildren(PSlugRouteChildren),
	ApiAuthSplatRoute
};
var routeTree = Route$32._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { Route$4 as a, Route$28 as c, submitOrder as d, submitRefill as f, Route$3 as i, Route$31 as l, Route as n, Route$5 as o, Route$2 as r, Route$14 as s, router_exports as t, submitEnquiry as u };
