import { NavLink } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import { ISidebarProps } from "../../../types/sidebar.model";

function Sidebar(props: ISidebarProps) {
  const { activeMenuMobile, onClickToggleMobile } = props;
  const isMobile = useMediaQuery("(max-width: 426px)");
  return (
    <aside
      className={`fixed md:w-[250px] md:pt-16 h-screen w-full transition-transform bg-white border-r border-gray-300 mt-16 md:mt-0 ${
        activeMenuMobile && isMobile ? "-translate-x-full" : "translate-y-0"
      }`}
    >
      <div className="h-full overflow-y-auto bg-white">
        <div className="flex h-full flex-col justify-between">
          <ul>
            {isMobile && (
              <h1 className="text-2xl text-center">
                DEMO <span className="text-blue-600">HOTEL</span>
              </h1>
            )}

            <NavLink to="actual-data">
              {({ isActive }) => (
                <li
                  className={`${
                    isActive ? "bg-blue-600 text-white" : "text-black"
                  } m-[10px] rounded p-[5px] text-center`}
                  onClick={onClickToggleMobile}
                >
                  Actual Data
                </li>
              )}
            </NavLink>
            <NavLink to="reservation-forecast">
              {({ isActive }) => (
                <li
                  className={`${
                    isActive ? "bg-blue-600 text-white" : "text-black"
                  } m-[10px] rounded p-[5px] text-center`}
                  onClick={onClickToggleMobile}
                >
                  Reservation Forecast
                </li>
              )}
            </NavLink>
            <NavLink to="period-detail">
              {({ isActive }) => (
                <li
                  className={`${
                    isActive ? "bg-blue-600 text-white" : "text-black"
                  } m-[10px] rounded p-[5px] text-center`}
                  onClick={onClickToggleMobile}
                >
                  Period Detail
                </li>
              )}
            </NavLink>
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
