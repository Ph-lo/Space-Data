import React, { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Logo from "../assets/shuttle.png";
import "./Layout.module.css";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "default" }: Props) => (
  <>
    <div className="relative flex flex-col min-h-screen bg-gray-900">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header
        id="header-fixed"
        className="fixed z-100 w-full text-gray-400 bg-gray-900 body-font"
        style={{ zIndex: "1000" }}
      >
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            href={"/"}
            className="flex title-font font-medium text-white mb-4 md:mb-0"
          >
            <Image
              className="cursor-pointer ml-5"
              src={Logo}
              alt="logo space shuttle"
              width={40}
              height={40}
            />
          </Link>
          <Link
            href={"/"}
            className="flex title-font font-medium items-center text-white mb-4 md:mb-0"
          >
            <h1 className="flex cursor-pointer ml-5 title-font text-xl items-center text-white md:mb-0">
              Space-Data
            </h1>
          </Link>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <Link href={"/missions"}>
              <p className="cursor-pointer mr-5 hover:text-white">Mission</p>
            </Link>
            <Link
              href={"/launches/upcomingLaunches"}
              className="mr-5 hover:text-white"
            >
              Upcoming launches
            </Link>
            <Link
              href={"/launches/pastLaunches"}
              className="mr-5 hover:text-white"
            >
              <p className="mx-5 hover:text-white cursor-pointer">
                Past launches
              </p>
            </Link>
            <Link href={"/issPosition"} className="mr-5 hover:text-white">
              ISS position
            </Link>
          </nav>
          <Link href={"/rockets/rockets"}>
            <p className="cursor-pointer inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
              Rockets &#8594;
            </p>
          </Link>
        </div>
      </header>
      <main className="z-0 pt-16 flex-grow">{children}</main>
      <footer className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-5 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left md:mt-0 mt-10">
            <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
              <Link
                href={"/"}
                className="flex title-font font-medium text-white mb-4 md:mb-0"
              >
                <Image
                  className="cursor-pointer ml-5"
                  src={Logo}
                  alt="logo space shuttle"
                  width={30}
                  height={30}
                />
              </Link>
              <Link href={"/"}>
                <span className="cursor-pointer ml-3 text-xl">Space-data</span>
              </Link>
            </a>
            <p className="mt-2 text-sm text-gray-500">
              A project to start working with Next.js and Graphql
            </p>
          </div>
          <div className="flex-grow flex flex-wrap md:pr-20 -mb-10 md:text-left text-center order-first">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
                SPACEX DATA
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a
                    href="https://api.spacex.land/graphql/"
                    className="text-gray-400 hover:text-white"
                  >
                    Graphql API
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.spacex.com"
                    className="text-gray-400 hover:text-white"
                  >
                    Website
                  </a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
                OTHERS
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a
                    href="http://open-notify.org/Open-Notify-API/People-In-Space/"
                    className="text-gray-400 hover:text-white"
                  >
                    People in space
                  </a>
                </li>
                <li>
                  <a
                    href="http://open-notify.org/Open-Notify-API/ISS-Location-Now/"
                    className="text-gray-400 hover:text-white"
                  >
                    ISS positions
                  </a>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 bg-opacity-75">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              © 2022 Space-data — all sources credited above
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
              <a
                href="https://www.facebook.com/spacenewsx/"
                className="text-gray-400"
              >
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a
                href="https://twitter.com/SpaceX?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
                className="ml-3 text-gray-400"
              >
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/spacex/?hl=en"
                className="ml-3 text-gray-400"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
    <script src="../path/to/flowbite/dist/flowbite.js"></script>
  </>
);

export default Layout;
