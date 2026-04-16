import { useState } from "react";
import { GitBranch, Settings } from "lucide-react";
import logo from "../assets/logoLCC.png";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function Testing() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navItems = [
    {
      name: "Branch Accounts",
      icon: GitBranch,
      path: "/dashboard/branch-accounts",
    },
    { name: "Configuration", icon: Settings, path: "/dashboard/configuration" },
  ];
  return (
    <div className=" flex bg-gray-100 h-screen">
      {/* //Sidebar */}
      <div
        className={` flex flex-col bg-[#293041] w-64 h-screen shadow fixed transition-transform
        ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} lg:translate-x-0 lg:static`}
      >
        {/* Header of the sidebar */}
        <div className="p-4 flex justify-between border-b">
          {/* IMAGE */}

          <img src={logo} alt="Logo" className="w-15 h-15 object-contain" />
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            X
          </button>
        </div>

        {/* side Navigation bar */}
        <div className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon; //this is for react to treat it as  a component
            return (
              <Link
                to={item.path}
                key={item.name}
                className="flex items-center gap-2 p-2 hover:bg-gray-600"
              >
                <Icon size={20} className="text-white" />
                <span className="text-xl text-white">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Logout pinned to bottom */}
        <div className="mt-auto border-t border-gray-600 p-4">
          <button className="text-sm text-gray-400 hover:text-white cursor-pointer">
            Logout
          </button>
        </div>
      </div>

      {/* // Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white flex p-4 justify-start gap-6">
          <button
            className="p-2 text-xl font-bold lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <h1 className="text-xl font-bold">Store Admin Portal</h1>
          <input
            className="w-60 rounded px-3 focus:outline-none focus:ring-2 focus:ring-blue-300 justify-start items-start h-10 border"
            type="search"
            placeholder=" Searching for anything?"
            id="search"
          />

          <div className="ml-auto flex-shrink-0 bg-gray-500 w-10 h-10 rounded-full"></div>
        </header>

        <div className="overflow-y-auto flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
