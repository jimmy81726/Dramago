import React from "react";
import SearchIcon from "./icons/SearchIcon";
import { Link } from "react-router-dom";
import UserIcon from "./icons/UserIcon";
import { motion, MotionConfig } from "motion/react";

const MobileMenu = ({
  currentUser,
  userData,
  handleLogout,
  openLoginModal,
  isMobileMenuOpen,
}) => {
  return (
    <>
      {isMobileMenuOpen && (
        <MotionConfig transition={{ duration: 0.3, ease: "easeInOut" }}>
          <motion.div
            className="flex flex-col pt-4 pb-6 px-3 gap-4 fixed h-full w-full bg-brand-50 lg:hidden items-center "
            style={{
              top: "var(--header-h)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative w-full mx-auto">
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
                <div className="flex items-center space-x-4 ">
                  <button
                    onClick={openLoginModal}
                    className="flex items-center cursor-pointer px-5 py-3 space-x-2 rounded-[100px] bg-brand-core text-white hover:bg-orange-500 hover:shadow-sm transition"
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
          </motion.div>
        </MotionConfig>
      )}
    </>
  );
};

export default MobileMenu;
