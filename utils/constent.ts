export const Domain =
  process.env.NODE_ENV === "production"
    ? "https://shoping-app-iota.vercel.app/api" 
    : "http://localhost:3000/api";
