import type { NextPage } from "next";
import Layout from "../components/Layout";

import { gql, useQuery } from "@apollo/client";
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import spacexLogo from "../assets/logo.png";
import Image from "next/image";
import Link from "next/link";

const Home: NextPageWithLayout = () => {
  return (
    <section className="xs:mt-16 text-gray-400 bg-gray-900 body-font">
        <div className="container w-full mx-auto">
        <h1 className="title-font mt-16 text-center sm:text-xl text-xl underline underline-offset-4 decoration-1 mb-4 font-light text-white">
          Space-Data is a projet about space vehicles and missions using mostly SpaceX data. 
        </h1>
        </div>
      <div className="container mx-auto flex px-5 py-16 lg:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full lg:w-1/2 w-5/6 mb-10 md:mb-10">
          <Image
            className="object-cover object-center rounded"
            alt="hero"
            src={spacexLogo}
          />
        </div>
        <div className="lg:flex-grow lg:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
            Space Exploration Technologies Corp.
          </h1>
          <p className="mb-8 leading-relaxed">
            (doing business as SpaceX) is an American spacecraft manufacturer,
            space launch provider, and a satellite communications corporation
            headquartered in Hawthorne, California. It was founded in 2002 by
            Elon Musk, with the goal of reducing space transportation costs to
            enable the colonization of Mars.
          </p>
          <div className="text-center">
            <span className="inline-block h-1 w-10 rounded bg-sky-700 mt-8 mb-6"></span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className=" w-4 h-4 text-gray-500 mx-auto mb-2"
              viewBox="0 0 975.036 975.036"
            >
              <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
            </svg>
            <p className="text-gray-500 text-md mb-4">
              There's a tremendous bias against taking risks. Everyone is trying
              to optimize their ass-covering.
            </p>
            <a href="https://en.wikipedia.org/wiki/Elon_Musk" className="text-white font-medium title-font tracking-wider text-sm">
              Elon Musk
            </a>
            <p className="text-xs text-gray-500">CEO</p>
          </div>
        </div>
      </div>
    </section>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="Index">{page}</Layout>;
};

export default Home;
