import { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const AppLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);

  return (
    <section className="h-screen w-full max-w-[1440px] mx-auto bg-[#FAFAFB]">
      <div className="flex h-full">
        <div
          className={`shrink-0 h-full border-r border-gray-200 transition-all duration-300 ${
            sidebarCollapsed ? "w-[72px]" : "w-[280px]"
          }`}
        >
          <Sidebar collapsed={sidebarCollapsed} />
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <Navbar
            onToggleSidebar={toggleSidebar}
            sidebarCollapsed={sidebarCollapsed}
          />

          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </section>
  );
};

export default AppLayout;
