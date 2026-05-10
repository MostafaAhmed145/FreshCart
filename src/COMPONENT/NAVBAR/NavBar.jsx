import NavBarCSS from "./NavBar.module.css";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink, useNavigate } from 'react-router-dom';
import imgLogo from "../IMAGES/dca5684de7684c9fa8b7a082a0786a90.png";

function NavBar() {

  let MyNaviggate = useNavigate();
  let tkn = localStorage.getItem("tkn");

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  function SignOut() {
    MyNaviggate("/Login");
    localStorage.removeItem("tkn");
    localStorage.removeItem("wishlist");
  }

  return (
    <Disclosure as="nav" className={NavBarCSS.nav + " fixed top-0 left-0 right-0 z-50 shadow-xl bg-[#0f2c4d]"}>

      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">

        <div className="relative flex h-16 items-center justify-between">

          {/* Mobile Button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block size-6 group-data-[open]:hidden" />
              <XMarkIcon className="hidden size-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>

          {/* Logo + Links */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

            <img alt="logo" src={imgLogo} className="h-12 w-auto mt-2" />

            <div className="hidden sm:ml-6 sm:block">

              {tkn ? (
                <div className={NavBarCSS.AllLinks + " flex space-x-4 items-center py-4"}>

                  <NavLink className="text-white hover:text-green-300" to="/Home">
                    <i className="fa-solid fa-house"></i> Home
                  </NavLink>

                  <NavLink className="text-white hover:text-green-300" to="/Categores">
                    <i className="fa-solid fa-layer-group"></i> Categories
                  </NavLink>

                  <NavLink className="text-white hover:text-green-300" to="/Brandes">
                    <i className="fa-brands fa-bandcamp"></i> Brands
                  </NavLink>

                  <NavLink className="text-white hover:text-green-300" to="/Cart">
                    <i className="fa-solid fa-cart-arrow-down"></i> Cart
                  </NavLink>

                  <NavLink className="text-white hover:text-green-300" to="/Wishlist">
                    <i className="fas fa-heart"></i> Wishlist
                  </NavLink>

                  <NavLink className="text-white hover:text-green-300" to="/allOrders">
                    <i className="fas fa-box"></i> All Orders
                  </NavLink>

                </div>
              ) : null}

            </div>
          </div>

          {/* Right Side */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

            {tkn ? (
              <Menu as="div" className="relative ml-3">

                <span
                  onClick={SignOut}
                  className="block px-4 py-2 text-sm rounded-lg bg-red-600 hover:bg-red-700 cursor-pointer"
                >
                  <i className="fa-solid fa-right-from-bracket text-white"></i>
                </span>

              </Menu>
            ) : (
              <div className="w-20 flex flex-col text-center">
                <NavLink className="text-white hover:text-green-300" to="/Register">
                  Register
                </NavLink>
                <NavLink className="text-white hover:text-green-300" to="/Login">
                  Login
                </NavLink>
              </div>
            )}

          </div>

        </div>

        {/* Mobile Menu */}
        <DisclosurePanel className="sm:hidden">

          <div className="space-y-4 px-2 pt-2 pb-3">

            <NavLink to="/Home" className="text-white block px-3 py-2 rounded-md hover:bg-green-600">
              <i className="fa-solid fa-house"></i> Home
            </NavLink>

            <NavLink to="/Categores" className="text-white block px-3 py-2 rounded-md hover:bg-green-600">
              <i className="fa-solid fa-layer-group"></i> Categories
            </NavLink>

            <NavLink to="/Brandes" className="text-white block px-3 py-2 rounded-md hover:bg-green-600">
              <i className="fa-brands fa-bandcamp"></i> Brands
            </NavLink>

            <NavLink to="/Cart" className="text-white block px-3 py-2 rounded-md hover:bg-green-600">
              <i className="fa-solid fa-cart-arrow-down"></i> Cart
            </NavLink>

            <NavLink to="/Wishlist" className="text-white block px-3 py-2 rounded-md hover:bg-green-600">
              <i className="fas fa-heart"></i> Wishlist
            </NavLink>

            <NavLink to="/allOrders" className="text-white block px-3 py-2 rounded-md hover:bg-green-600">
              <i className="fas fa-box"></i> All Orders
            </NavLink>

          </div>

        </DisclosurePanel>

      </div>
    </Disclosure>
  );
}

export default NavBar;