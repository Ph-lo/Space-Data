import type { NextPage } from "next";
import Layout from "../components/Layout";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import twitter from "../assets/twitter-logo.png";
import wikipedia from "../assets/wikipedia.png";
import Image from "next/image";
import Link from "next/link";
import Loader from "../components/Loader";

interface MissionsData {
  description: string;
  id: string;
  name: string;
  twitter: string;
  wikipedia: string;
  website: string;
}

type MissionsResult = {
  missions: Array<MissionsData>;
};

const query = `
  description
  id
  name
  twitter
  wikipedia
  website
`;

const getTotalPages = () => {};

const Missions: NextPageWithLayout = () => {
  const [offset, setOffset] = useState(0);
  const [dropDown, setDropDown] = useState<{toggle: boolean, elem: string}>({toggle: false, elem: ""});
  const MISSIONS = gql`
  query {
    missions(limit: 10, offset: ${offset}) {
      ${query}
    }
  }
`;
  const { loading, error, data } = useQuery<MissionsResult>(MISSIONS);

  const nextPage = () => {
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: "smooth",
    });
    setOffset(offset + 10);
  };

  const previousPage = () => {
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: "smooth",
    });
    setOffset(offset - 10);
  };

  const toggleDropDown = (elemId: string) => {
    if (elemId === dropDown.elem) {
      setDropDown({toggle: (dropDown.toggle ? false : true), elem: elemId})
    } else {
      setDropDown({toggle: true, elem: elemId})
    }
  };

//  console.log(data);
  return (
    <div>
      <main>
        <>
          <section className="text-gray-400 bg-gray-900 body-font">
            <div className="container mx-auto pl-5">
              <h1 className="text-5xl text-white mt-16">Missions</h1>
            </div>
            {loading || !data ? (
              <Loader />
            ) : (
              <>
                <section className="text-gray-400 bg-gray-900 body-font overflow-hidden">
                  <div className="container px-5 py-24 mx-auto">
                    {data.missions.map((mission) => (
                      <div className="-my-8 divide-y-2 divide-gray-800">
                        <div className="py-8 flex border-t-2 border-gray-800 flex-wrap md:flex-nowrap">
                          <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex">
                            <span className="mb-4 font-semibold title-font text-white">
                                <a href={mission.wikipedia}>
                                <Image src={wikipedia} alt='wikipedia logo' />
                                </a>
                            </span>
                            <span className="ml-5 text-gray-500 text-sm">
                                <a href={mission.twitter}>
                                <Image src={twitter} alt='twitter logo' />
                                </a>
                            </span>
                          </div>
                          <div className="md:flex-grow">
                            <h2 className="text-2xl font-medium text-white title-font mb-2">
                              {mission.name}
                            </h2>
                            <div className="flex">
                              {(dropDown.toggle && dropDown.elem === mission.id) ? (
                                <p className="leading-relaxed">
                                  {mission.description}
                                </p>
                              ) : (
                                <p className="leading-relaxed line-clamp-4">
                                  {mission.description}
                                </p>
                              )}
                              <div className="flex flex-col justify-end ml-3">
                                <button onClick={() => toggleDropDown(mission.id)} className="border-2 border-sky-800 text-sky-800 hover:text-sky-600 hover:border-sky-600 rounded-xl h-6 w-6"> {(dropDown.toggle && dropDown.elem === mission.id) ? <p className="mt-0.5">^</p> : <p className="-mt-1.5">⌄</p> } </button>
                              </div>
                            </div>
                            <a title="Official website" href={mission.website} className="mb-8 mt-9 text-sky-600 inline-flex items-center mt-4">
                              Official website
                              &#8594;
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}
          </section>
        </>
      </main>
    </div>
  );
};

Missions.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="Index">{page}</Layout>;
};

export default Missions;
