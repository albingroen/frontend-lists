export const apiUrl = "http://localhost:5000";

export const appUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "http://lists-app.vercel.app";
