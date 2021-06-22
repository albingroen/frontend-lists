export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const appUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://frontend-lists.vercel.app";
