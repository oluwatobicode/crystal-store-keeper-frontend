import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const AppLayout = () => {
  return (
    <section className="h-screen w-full max-w-[1440px] mx-auto bg-[#FAFAFB]">
      <div className="flex h-full">
        <div className="w-[280px] shrink-0 h-full border-r border-gray-200">
          <Sidebar />
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <Navbar />

          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </section>
  );
};

export default AppLayout;
