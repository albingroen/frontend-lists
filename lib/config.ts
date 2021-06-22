export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const appUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://frontend-lists.vercel.app";

export const siteInfo = {
  title: "Weblists | Create text lists and share them with anyone",
  description:
    "Create and share a list with anyone on the web, without creating an account.",
  image:
    "https://res.cloudinary.com/albin-groen/image/upload/v1624364659/weblists-seo_vaudjk.png",
};
