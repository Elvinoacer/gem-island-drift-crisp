import { h as Outlet, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useCurrentUserState } from "./use-current-user-DG6UNzh9.mjs";
import { t as RedirectToSignIn } from "./gates-CBujfI_M.mjs";
import { n as PageSkeleton } from "./page-state-DpakMD24.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-QAX-VSLc.js
var import_jsx_runtime = require_jsx_runtime();
function AdminGate() {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSkeleton, { label: "Opening staff console" });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
}
//#endregion
export { AdminGate as component };
