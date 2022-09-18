import React, { ReactNode } from "react";
import Router, { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Logo from "../assets/shuttle.png";
import spaceX from "../assets/image2vector.svg";
import spacex from "../assets/kindpng_6781215.png";
import "./Layout.module.css";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "default" }: Props) => (
  <div className="relative h-screen bg-gray-900">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header id="header-fixed" className="fixed z-100 w-full text-gray-400 bg-gray-900 body-font" style={{zIndex: "1000"}}>
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href={"/"} className="flex title-font font-medium text-white mb-4 md:mb-0">
          <Image className="cursor-pointer ml-5" src={Logo} alt="logo space shuttle" width={40} height={40} />
        </Link>
        <Link href={"/"} className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <h1 className="flex -mt-3 ml-5 title-font font-medium items-center text-white md:mb-0">
          <Image className="cursor-pointer" src={spacex} alt="logo spacex" />
          <span className="-ml-4 mt-2 text-slate-400 text-3xl">- Data</span>
          </h1>
        </Link>
       {/*  <Link href={"/"} className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <span className="cursor-pointer ml-3 text-3xl text-white font-semibold">SpaceX data</span>
        </Link> */}
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-white">Missions</a>
          <a className="mr-5 hover:text-white">Upcoming launches</a>
          <Link href={"/launches/pastLaunches"} className="mr-5 hover:text-white"><p className="mr-5 hover:text-white cursor-pointer">Past launches</p></Link>
          <Link href={"/issPosition"} className="mr-5 hover:text-white">ISS position</Link>
        </nav>
        <Link href={"/rockets/rockets"}>
          <p className="cursor-pointer inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">Rockets &#8594;</p>
        </Link>
      </div>
    </header>
    <main className="z-0 pt-16">{children}</main>
  </div>
);

export default Layout;
