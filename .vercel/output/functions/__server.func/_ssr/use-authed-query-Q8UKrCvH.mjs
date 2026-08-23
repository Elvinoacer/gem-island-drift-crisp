import { o as __toESM } from "../_runtime.mjs";
import { G as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useCurrentUserState } from "./use-current-user-DG6UNzh9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-authed-query-Q8UKrCvH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useAuthedQuery(fn, deps = []) {
	const { user, isPending } = useCurrentUserState();
	const [data, setData] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [tick, setTick] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (isPending) return;
		if (!user) {
			setData(null);
			setLoading(false);
			return;
		}
		let cancelled = false;
		setLoading(true);
		setError(null);
		fn().then((d) => {
			if (!cancelled) setData(d);
		}).catch((e) => {
			if (!cancelled) setError(e instanceof Error ? e.message : "Something went wrong");
		}).finally(() => {
			if (!cancelled) setLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, [
		user,
		isPending,
		tick,
		...deps
	]);
	return {
		user,
		sessionPending: isPending,
		data,
		error,
		loading: isPending || loading,
		reload: () => setTick((t) => t + 1)
	};
}
//#endregion
export { useAuthedQuery as t };
