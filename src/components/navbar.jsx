import { useState } from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "../hooks/useFirebase";
import Dropdown from "./common/DropDown";
import Eduaide_cube from "../assets/eduaide_cube.png";
import { AvatarWithText } from "../components/common/AvatarGroup";

const NAV_ITEMS = [
  { text: "Home", link: "/" },
  { text: "About", link: "/about" },
  { text: "Prices", link: "/Prices" },
  { text: "Quick Quiz", link: "/QuickQuiz" },
  { text: "How it works", link: "/Work" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const Firebase = useFirebase();
  const user = Firebase.userLoggedIn;

  const LoginsignupButton = () => {
    return user ? (
      <Dropdown
        items={[
          { key: "edit", label: "Edit" },
          {
            key: "logout",
            label: "logout",
            danger: true,
            onClick: () => Firebase.handleLogout(),
          },
        ]}
        triggerContent={<AvatarWithText useremail={user?.email} />}
        className="cursor-pointer text-sm font-semibold text-white border border-white  rounded-full px-2 py-1 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-300"
      />
    ) : (
      <DesktopLogin />
    );
  };

  return (
    <header>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8">
        <Logo />

        <DesktopMenu />
        <div className="flex gap-3">
          <LoginsignupButton />

          <MobileMenuButton
            isOpen={isOpen}
            toggleMenu={() => setIsOpen(!isOpen)}
          />
        </div>
      </nav>
      <MobileDrawer
        show={user}
        isOpen={isOpen}
        closeMenu={() => setIsOpen(false)}
      />
      {isOpen && <Overlay closeMenu={() => setIsOpen(false)} />}
    </header>
  );
};

const Logo = () => (
  <div className="flex ">
    <img
      className="h-8 w-auto sm:h-10 transition-all duration-300 group-hover:scale-105"
      src={Eduaide_cube}
    />
  </div>
);

const AuthButton = () => {
  return (
    <div className=" flex justify-center items-center gap-2">
      <Link
        to="/login"
        className="text-sm font-semibold text-gray-900  bg-white rounded-full px-3 py-1.5 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-300"
      >
        Log in <span aria-hidden="true">&rarr;</span>
      </Link>
      <Link
        to="/signUp"
        className="text-sm font-semibold text-gray-900  bg-white rounded-full px-3 py-1.5 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-300"
      >
        Sign up
      </Link>
    </div>
  );
};

const MobileMenuButton = ({ isOpen, toggleMenu }) => (
  <div className="flex lg:hidden">
    <button
      onClick={toggleMenu}
      type="button"
      className="relative z-20 cursor-pointer -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white transition-transform duration-300"
    >
      <span className="sr-only">Open main menu</span>
      <svg
        className={`size-6 transition-transform duration-300 ${
          isOpen ? "hidden" : ""
        }`}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </button>
  </div>
);

const DesktopMenu = () => (
  <div className="hidden flex gap-2 items-center bg-white p-[5px] rounded-full lg:flex">
    {NAV_ITEMS.map((item) => (
          <a
            key={item.link}
            href={item.link}
            className="text-sm flex font-semibold nav-hover text-gray-900"
          >
            {item.text}
          </a>
        ))}
  </div>
);

const DesktopLogin = () => (
  <div className="hidden items-center gap-2 lg:flex  lg:justify-end">
    <AuthButton />
  </div>
);

const MobileDrawer = ({ isOpen, closeMenu, show }) => (
  <div
    className={`fixed inset-y-0 right-0 z-10 w-full max-w-sm bg-white shadow-xl transition-transform duration-300 ease-in-out transform ${
      isOpen ? "translate-x-0" : "translate-x-full"
    }`}
  >
    <div className="px-6 py-6">
      <div className="flex justify-end">
        <button
          onClick={closeMenu}
          type="button"
          className="-m-2.5 cursor-pointer rounded-md text-gray-700 transition-transform duration-300 hover:rotate-90"
        >
          <span className="sr-only">Close menu</span>
          <svg
            className="size-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="mt-6 mb-6 space-y-4">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.link}
            href={item.link}
            className="text-sm flex font-semibold nav-hover text-gray-900"
          >
            {item.text}
          </a>
        ))}
      </div>
      {show ? "" : <AuthButton />}
    </div>
  </div>
);

const Overlay = ({ closeMenu }) => (
  <div className="fixed inset-0 bg-black/50 z-5" onClick={closeMenu} />
);

export default Navbar;
