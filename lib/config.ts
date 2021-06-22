export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const appUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://frontend-lists.vercel.app";

export const siteInfo = {
  title: "Lists | Create text lists and share them with anyone",
  description:
    "Using Lists you can create and share a list of text items with anyone on the web, without creating an account.",
};
