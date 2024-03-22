import { useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import { MdOutlineReorder } from "react-icons/md";
import { IPropNav } from "../../../types/nav.model";
function Nav(props: IPropNav) {
  const { onClickToggleMobile } = props;
  const isTablet = useMediaQuery("(min-width: 726px)");
  const isMobile = useMediaQuery("(max-width: 426px)");
  const [isActiveDropdown, setIsActiveDropdown] = useState(false);
  const navigate = useNavigate();
  // active dropdown avatar
  const handleAcitveDropdown = () => {
    setIsActiveDropdown(!isActiveDropdown);
  };
  // logout
  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <nav className="fixed bg-white h-[64px] w-full z-40 top-0">
      <div className="flex justify-between items-center h-full px-[10px] border border-gray-300">
        {isTablet && (
          <div>
            <h1 className="text-2xl">
              DEMO <span className="text-blue-600">HOTEL</span>
            </h1>
          </div>
        )}
        {isMobile && (
          <button onClick={onClickToggleMobile}>
            <MdOutlineReorder size={20} />
          </button>
        )}
        <div
          className="flex items-center gap-[5px] relative"
          onClick={handleAcitveDropdown}
        >
          UserName
          <RxAvatar size={20} />
        </div>
      </div>
      {/* <!-- Dropdown menu --> */}
      <div
        className={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-auto absolute right-0 top-12 px-8 ${
          !isActiveDropdown && "hidden"
        }`}
      >
        <ul className="py-2 text-sm text-gray-700">
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
