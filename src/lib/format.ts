export function formatWhen(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function stockLabel(status: string) {
  if (status === "low") return "Low stock";
  if (status === "out") return "Out of stock";
  return "In stock";
}
