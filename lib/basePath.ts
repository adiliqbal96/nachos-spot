const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const img = (path: string) => `${base}${path}`;
