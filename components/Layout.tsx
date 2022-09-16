import React, { ReactNode } from "react";
import Router, { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Logo from "../assets/shuttle.png";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "default" }: Props) => (
  <div className="relative h-screen">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header className="fixed z-100 w-full text-gray-400 bg-gray-900 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <Image src={Logo} alt="logo space shuttle" />
          <span className="ml-3 text-xl">SpaceX data</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-white">Missions</a>
          <a className="mr-5 hover:text-white">Upcoming launches</a>
          <Link href={"/launches/pastLaunches"} className="mr-5 hover:text-white"><p className="mr-5 hover:text-white cursor-pointer">Past launches</p></Link>
          <a className="mr-5 hover:text-white">ISS position</a>
        </nav>
        <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
          Button
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
    <main className="pt-16">{children}</main>
  </div>
);

export default Layout;
