// src/layouts/StaticPageLayout.jsx

import { Outlet } from "react-router-dom";

// This component provides consistent structure for all static pages.
export default function StaticPageLayout() {
  return (
    <div className="bg-black text-white pt-24"> {/* pt-24 to offset the fixed navbar */}
      <main className="w-full max-w-4xl mx-auto px-6 py-12">
        <Outlet />
      </main>
    </div>
  );
}