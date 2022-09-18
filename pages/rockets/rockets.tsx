import type { NextPage } from "next";
import Layout from "../../components/Layout";

import { gql, useQuery } from "@apollo/client";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import Link from "next/link";
import Image from 'next/image';

import rocketFamily from '../../assets/Falcon_rocket_family6.svg.png';
import falcon1 from '../../assets/falcon1.jpeg';
import falcon9 from '../../assets/falcon9.jpeg';
import falconheavy from '../../assets/falconheavy.jpeg';
import starship from '../../assets/starship.jpeg';

interface RocketData {
  id: string;
  name: string;
  wikipedia: string;
  description: string;
}

interface RocketsResult {
  rockets: Array<RocketData>;
}

const ROCKETS = gql`
  query {
    rockets {
      id
      name
      wikipedia
      description
    }
  }
`;

const rocketsImages = {
    falcon1: falcon1,
    falcon9: falcon9,
    falconheavy: falconheavy,
    starship: starship
};
type rocketsImgKey = keyof typeof rocketsImages;

const Rockets: NextPageWithLayout = () => {
  const { loading, error, data } = useQuery<RocketsResult>(ROCKETS);

  console.log(data);
  //className="container px-5 py-10 mx-auto border-t-2 border-gray-800"
  return (
    <div>
      <main>
        <>
          <section className="text-gray-400 bg-gray-900 body-font">
            <div className="container mx-auto pl-5">
              <h1 className="text-5xl text-white mt-16 mb-10">Rockets</h1>
              <p className="lg:w-2/3 2xl:w-10/12 leading-relaxed text-base">
              SpaceX manufactures launch vehicles to operate its launch provider services 
              and to execute its various exploration goals. SpaceX currently manufactures 
              and operates the Falcon 9 Full Thrust family of medium-lift launch vehicles 
              and the Falcon Heavy family of heavy-lift launch vehicles – both of which 
              powered by SpaceX Merlin engines and employing VTVL technologies to reuse 
              the first stage. As of 2020, the company is also developing the fully 
              reusable Starship launch system, which will replace the Falcon 9 and Falcon 
              Heavy.
              </p>
            </div>
            {loading || !data ? (
              <p>Data loading...</p>
            ) : (
                <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-wrap -m-4">
                <div className="lg:w-2/3 xl:mr-52 xl:w-6/12 2xl:w-9/12 2xl:mx-auto p-4">
                <Image src={rocketFamily}
                      alt="gallery"
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                </div>
                {data.rockets.map((rocket) => (
                <div className="lg:w-1/3 sm:w-1/2 p-4">
                  <div className="flex relative">
                    <Image
                      alt="gallery"
                      className="absolute inset-0 w-full h-full object-cover object-center"
                      src={rocketsImages[rocket.id as rocketsImgKey]}
                      layout='fill'
                    />
                    <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-800 bg-gray-900 bg-opacity-75 backdrop-blur-sm opacity-0 hover:opacity-100">
                      <Link href={`/rockets/${rocket.id}`}>
                        <h2 className="cursor-pointer tracking-widest text-sm title-font font-medium text-indigo-400 mb-2">
                            Learn more &#8594;
                        </h2>
                      </Link>
                      <h1 className="title-font text-lg font-medium text-white mb-3">
                        {rocket.name}
                      </h1>
                      <p className="leading-relaxed h-25 line-clamp-4">
                        {rocket.description}
                      </p>
                    </div>
                  </div>
                </div>
                ))}
                <div className="p-6 flex 2xl:ml-16">
                  <a href="https://en.wikipedia.org/wiki/SpaceX_launch_vehicles" className="w-44 mt-auto h-14 pt-3 text-white bg-sky-700 border-0 px-8 focus:outline-none hover:bg-sky-800 rounded text-lg">See the wiki</a>
                </div>
                </div>
                </div>
            )}
          </section>
        </>
      </main>
    </div>
  );
};

Rockets.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="Index">{page}</Layout>;
};

export default Rockets;
