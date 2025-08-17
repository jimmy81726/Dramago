import { signOut } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import FullPageSpinner from "./FullPageSpinner";
import logo from "../assets/images/logo.svg";
import UserIcon from "./icons/UserIcon";
import SearchIcon from "./icons/SearchIcon";
import HambergurMenu from "./HambergurMenu";
import { forwardRef } from "react";

const Header = forwardRef(function Header(
  { openLoginModal, toggleMobileMenu, isMobileMenuOpen },
  ref
) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  const { currentUser, isLoading, userData } = useAuth();
  if (isLoading) {
    return <FullPageSpinner />;
  }

  return (
    <>
      <header ref={ref} className="bg-white px-3 ">
        <div className="flex items-center  md:my-5 my-2 max-w-[1296px] mx-auto  ">
          <Link to="/" className="mr-16">
            <img
              src={logo}
              alt="logo"
              className="h-[44px] sm:h-[68px] w-auto max-w-none"
            />
          </Link>
          {/* 桌面版 */}
          <div className="hidden lg:flex items-center w-full ">
            <div className="relative w-full max-w-[400px] mx-auto">
              <SearchIcon className="absolute text-brand-core w-5 h-5 right-5 top-3" />
              <input
                aria-label="search"
                type="text"
                placeholder="搜尋劇會"
                className="w-full h-[48px] py-3 pl-6 border border-brand-core focus:border-brand-500 focus:border-2 focus:outline-none rounded-full cursor-text"
              />
            </div>
            <Link
              to="/list"
              className="text-gray-950 hover:text-brand-core text-[18px] transition-colors"
            >
              劇會總覽
            </Link>
            <div className="flex items-center space-x-4">
              {currentUser ? (
                <div className="flex items-center space-x-4 ml-15">
                  <p className="text-gray-600">歡迎 {userData?.displayName}</p>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                  >
                    登出
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4 ml-15">
                  <button
                    onClick={openLoginModal}
                    className="hidden md:flex items-center cursor-pointer px-5 py-3 space-x-2 rounded-[100px] bg-brand-core text-white hover:bg-orange-500 hover:shadow-sm transition"
                  >
                    <UserIcon />
                    <span>登入/註冊</span>
                  </button>
                  {/* <button
                  onClick={openRegisterModal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  註冊
                </button> */}
                </div>
              )}
            </div>
          </div>

          <div className="block lg:hidden ml-auto">
            <HambergurMenu
              toggleMobileMenu={toggleMobileMenu}
              isMobileMenuOpen={isMobileMenuOpen}
            />
          </div>
        </div>
      </header>
    </>
  );
});

export default Header;
