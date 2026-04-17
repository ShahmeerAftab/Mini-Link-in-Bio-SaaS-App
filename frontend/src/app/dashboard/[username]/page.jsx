"use client";

import { use } from "react";
import { useEffect } from "react";
import DashboardPage from "@/components/dashboard/DashboardPage";

// /dashboard/[username] — pre-seeds the username into localStorage
// then renders the same sidebar dashboard as /dashboard

const Page = ({ params }) => {
  const { username } = use(params);

  useEffect(() => {
    if (username) {
      localStorage.setItem("dashboard_username", username);
    }
  }, [username]);

  return <DashboardPage />;
};

export default Page;
