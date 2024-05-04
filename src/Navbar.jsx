import { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Outlet, useNavigate } from "react-router-dom";
import auth from "./auth";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Cart", href: "/cart", current: false },
];

export default function Navbar({ isLoggedIn }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.setItem("logedIn", false);
    localStorage.setItem("logedInUser", "");
    localStorage.setItem("accessToken", "");

    navigate("/signedout");
  };

  const login = async () => {
    const CLIENT_ID = "14168416091898906021";
    // const redirectURL = 'http://127.0.0.1:3000'
    // const redirectURL = "https://varietyheaven.vercel.app";
    const redirectURL = 'https://varietyheaven.vercel.app'
    const AUTH_URL = `https://auth.phone.email/log-in?client_id=${CLIENT_ID}&redirect_url=${redirectURL}`;

    window.open(
      AUTH_URL,
      "VARIETY HEAVEN",
      "toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0, width=500, height=560, top=" +
        (window.screen.height - 600) / 2 +
        ", left=" +
        (window.screen.width - 500) / 2
    );
  };

  const searchParams = new URLSearchParams(window.location.search);
  const accessToken = searchParams.get("access_token");

  // console.log(localStorage.getItem("accessToken") )
  if (searchParams.get("access_token")) {
    localStorage.setItem("accessToken", accessToken);
    // setLoggedInState(true);
    // navigate(0)
  }

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Link to={"/"}>
                    <img
                      className="h-14 w-auto self-center"
                      src="/logo.png"
                      alt="VARIETY HEAVEN"
                    />
                    </Link>
                  </div>
                  <div className="hidden self-center sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {!isLoggedIn ? (
                    <button
                      onClick={() => login()}
                      className="bg-gray-700 hover:bg-gray-950 px-3 py-2 rounded-md text-white"
                    >
                      Log In
                    </button>
                  ) : (
                    <>
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src="https://ik.imagekit.io/dqn1rnabh/user-icon.gif?updatedAt=1711192427330"
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            <Link
                              to={`/profile`}
                              className="block px-4 py-2 text-sm text-gray-700"
                            >
                              Your Profile
                            </Link>
                          </Menu.Item>
                          <Menu.Item>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700"
                            >
                              Settings
                            </a>
                          </Menu.Item>
                          <Menu.Item>
                            <button
                              onClick={() => logout()}
                              className="block px-4 py-2 text-sm text-gray-700"
                            >
                              Log Out {localStorage.getItem("logedInUser")}
                            </button>
                          </Menu.Item>
                        </Menu.Items>
                      </Menu>
                    </>
                  )}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Outlet />
    </>
  );
}
