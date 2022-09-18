import type { NextPage } from "next";
import Layout from "../components/Layout";
import { ReactElement, useState, useEffect } from "react";
import { NextPageWithLayout } from "./_app";
import Link from "next/link";
import Map from "../components/map/Map";
import dynamic from "next/dynamic";

type Astronaut = {
  name: string;
  craft: string;
};
type Astronauts = Array<Astronaut>;


const issPosition: NextPageWithLayout = () => {
  const [onBoard, setOnBoard] = useState<Astronauts>(); // SET TYPE
  const MapWithNoSSR = dynamic(() => import("../components/map/Map"), {
    ssr: false,
  });
  const fetchData = () => {
    fetch('http://api.open-notify.org/astros.json', {
      method: 'GET'
    })
    .then(r => r.json())
    .then(res => {
      //console.log(res.people.find((elem:any) => elem.craft === "ISS"));
      const astronauts = res.people.filter((elem:any) => elem.craft === "ISS")
      console.log(astronauts)
      setOnBoard(astronauts);
    })
    .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, [])

  console.log();
  return (
    <section className="sm:mt-16 xs:mt-32 text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 mx-auto mb-14">
      <h2 className="text-white text-3xl mb-2 font-medium title-font mb-3">
            International Space Station
          </h2>
          <p className="leading-relaxed mb-5">
          The International Space Station is the largest modular space station currently in low Earth orbit. 
          It is a multinational collaborative project involving five participating space agencies: NASA, Roscosmos, JAXA, ESA, and CSA.
          </p>
      </div>
      <div className="container px-5 py-5 mx-auto -mt-10 flex sm:flex-nowrap flex-wrap">
        <div className="lg:w-2/3 md:w-1/2 bg-gray-900 rounded-lg sm:mr-10 justify-start">
          <div className="xs:absolute xs:-ml-8 relative w-full mt-0">
            <MapWithNoSSR />
          </div>
          
        </div>
        <div className="xs:mt-590px lg:w-1/3 md:w-1/2 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
          
          <div className="flex justify-between flex-wrap">
          <h2 className="bg-gray-800 bg-opacity-60 h-fit pl-3 py-1.5 text-white text-md mb-2 font-medium title-font w-4242">
            Speed on orbit: 7.66 km/s
          </h2>
          <h2 className="bg-gray-800 bg-opacity-60 h-fit pl-3 py-1.5 text-white text-md mb-2 font-medium title-font w-4242">
            Launch date: Nov 20th, 1998
          </h2>
          <h2 className="bg-gray-800 bg-opacity-60 h-fit pl-3 py-1.5 text-white text-md mb-2 font-medium title-font w-4242">
            Max speed: 28,000 km/h
          </h2>
          <h2 className="bg-gray-800 bg-opacity-60 h-fit pl-3 py-1.5 text-white text-md mb-2 font-medium title-font w-4242">
            Cost: 150 billion USD
          </h2>
          <h2 className="bg-gray-800 bg-opacity-60 h-fit pl-3 py-1.5 text-white text-md mb-2 font-medium title-font w-4242">
            Orbit height: 408 km
          </h2>
          
          </div>
          <h2 className=" h-fit pl-3 py-1.5 text-white text-xl mb-2 font-medium title-font w-4242">
            Astronauts aboard:
          </h2>
          <div className="flex flex-wrap">
            {onBoard && (
              onBoard.map(astronaut => {
                return (
                  <div className="flex items-center w-1/2">
                    <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-gray-800 text-sky-700 mb-4">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-6 h-6" viewBox="0 0 24 24">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <h2 className="h-fit pl-3 py-1.5 text-white text-md mb-2 font-medium title-font">
                      {astronaut.name}
                    </h2>
                  </div>
                )
              })
            )}
          </div>
          
          <a href="https://en.wikipedia.org/wiki/International_Space_Station" className="text-white text-center bg-sky-700 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Wikipedia
          </a>
          <p className="text-xs text-gray-400 text-opacity-90 mt-3">
            Data from NORA, NASA and open-notify API.
          </p>
        </div>
      </div>
    </section>
  );
};

issPosition.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="ISS position">{page}</Layout>;
};

export default issPosition;
