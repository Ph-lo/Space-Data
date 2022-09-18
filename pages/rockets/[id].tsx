import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

interface RocketData {
  id: string;
  name: string;
  wikipedia: string;
  description: string;
  cost_per_launch: number;
  country: string;
  first_flight: string;
  height: {
    meters: number;
  };
  mass: {
    kg: number;
  };
  success_rate_pct: number;
  type: string;
}

interface RocketsResult {
  rocket: RocketData;
}

const Rocket: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  const ROCKET = gql`
    query {
        rocket(id: "${id}") {
          cost_per_launch
          country
          description
          first_flight
          height {
            meters
          }
          mass {
            kg
          }
          name
          success_rate_pct
          type
          wikipedia
          id
        }
      }
    `;

  const { loading, error, data } = useQuery<RocketsResult>(ROCKET);
  const [rocketInfos, setRocketInfos] = useState<RocketData>();

  useEffect(() => {
    if (data) {
      console.log(data.rocket.height.meters)

      setRocketInfos(data.rocket);
    }
  }, [id, data]);

  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-24 mx-auto">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="text-center mb-20">
              <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-white mb-4">
                {rocketInfos?.name}
              </h1>
              <p className="mb-2">Type : {rocketInfos?.type}</p>
              <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
                {rocketInfos?.description}
              </p>
            </div>
            <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
              <div className="p-2 sm:w-1/2 w-full">
                <div className="bg-gray-800 rounded flex p-4 h-full items-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke-width="3"
                    className="text-sky-600 w-6 h-6 flex-shrink-0 mr-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                  <span className="title-font font-medium text-white">
                    Country : {rocketInfos?.country}
                  </span>
                </div>
              </div>
              <div className="p-2 sm:w-1/2 w-full">
                <div className="bg-gray-800 rounded flex p-4 h-full items-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke-width="3"
                    className="text-sky-600 w-6 h-6 flex-shrink-0 mr-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                  <span className="title-font font-medium text-white">
                    First flight : {rocketInfos?.first_flight}
                  </span>
                </div>
              </div>
              <div className="p-2 sm:w-1/2 w-full">
                <div className="bg-gray-800 rounded flex p-4 h-full items-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke-width="3"
                    className="text-sky-600 w-6 h-6 flex-shrink-0 mr-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                  <span className="title-font font-medium text-white">
                    Height : {rocketInfos?.height.meters} m
                  </span>
                </div>
              </div>
              <div className="p-2 sm:w-1/2 w-full">
                <div className="bg-gray-800 rounded flex p-4 h-full items-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke-width="3"
                    className="text-sky-600 w-6 h-6 flex-shrink-0 mr-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                  <span className="title-font font-medium text-white">
                    Mass : {rocketInfos?.mass.kg} kg
                  </span>
                </div>
              </div>
              <div className="p-2 sm:w-1/2 w-full">
                <div className="bg-gray-800 rounded flex p-4 h-full items-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke-width="3"
                    className="text-sky-600 w-6 h-6 flex-shrink-0 mr-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                  <span className="title-font font-medium text-white">
                    Cost per launch : $ {rocketInfos?.cost_per_launch}
                  </span>
                </div>
              </div>
              <div className="p-2 sm:w-1/2 w-full">
                <div className="bg-gray-800 rounded flex p-4 h-full items-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke-width="3"
                    className="text-sky-600 w-6 h-6 flex-shrink-0 mr-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                  <span className="title-font font-medium text-white">
                    Success rate percentage : {rocketInfos?.success_rate_pct}%
                  </span>
                </div>
              </div>
            </div>
            <a href={rocketInfos?.wikipedia} className="flex w-36 justify-center mx-auto mt-16 text-white bg-sky-700 border-0 py-2 px-8 focus:outline-none hover:bg-sky-800 rounded text-lg">
              Wikipedia
            </a>
          </>
        )}
      </div>
    </section>
  );
};

Rocket.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="Rocket">{page}</Layout>;
};

export default Rocket;
