import { Outlet } from "react-router-dom";
import Nav from "./nav";
import Sidebar from "./sidebar";
import Footer from "./footer";
import React, { useState } from "react";

function DashboardLayout() {
  const [isActiveMenuMobile, setIsActiveMenuMobile] = useState(false);
  const toggleMenuMobile = () => {
    setIsActiveMenuMobile(!isActiveMenuMobile);
  };
  return (
    <React.Fragment>
      <Nav onClickToggleMobile={toggleMenuMobile} />
      <Sidebar
        activeMenuMobile={isActiveMenuMobile}
        onClickToggleMobile={toggleMenuMobile}
      />
      <main className="sm:ml-96 md:ml-[15rem] bg-slate-300">
        <div className="w-full flex flex-col min-h-screen">
          <div className="flex-1">
            <Outlet />
          </div>
          <Footer />
        </div>
      </main>
    </React.Fragment>
  );
}

export default DashboardLayout;
