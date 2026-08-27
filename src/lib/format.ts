export function formatUgx(amount: number) {
  return `UGX ${amount.toLocaleString("en-UG")}`;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
