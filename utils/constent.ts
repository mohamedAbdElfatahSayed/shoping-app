export const Domain =
  process.env.NODE_ENV === "production"
    ? "https://shoping-app-git-main-mohamed-bookstore-abdelfatahs-projects.vercel.app/api" 
    : "http://localhost:3000/api";
  