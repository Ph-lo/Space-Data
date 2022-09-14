import type { NextPage } from "next";
import Layout from "../components/Layout";

import { gql, useQuery } from "@apollo/client";
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import Link from "next/link";

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

const Home: NextPageWithLayout = () => {
  const { loading, error, data } = useQuery<RocketsResult>(ROCKETS);

  console.log(data);
  return (
    <div>
      <main>
        <>
          <section className="text-gray-400 bg-gray-900 body-font overflow-hidden">
            <h1 className="text-5xl text-white ml-8 my-10">Rockets</h1>
            {loading || !data ? (
              <p>Data loading...</p>
            ) : (
              data.rockets.map((rocket) => (
                <div
                  key={rocket.id}
                  className="container px-5 py-10 mx-auto border-t-2 border-gray-800"
                >
                  <div className="-my-8 divide-y-2 divide-gray-800">
                    <div className="py-8 flex flex-wrap md:flex-nowrap">
                      <div className="md:flex-grow">
                        <h2 className="text-2xl font-medium text-white title-font mb-2">
                          {rocket.name}
                        </h2>
                        <p className="leading-relaxed">{rocket.description}</p>
                        <Link href={`/rockets/${rocket.id}`} className="text-indigo-400 inline-flex items-center mt-4">
                          Learn More
                          
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </section>
        </>
      </main>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="Index">{page}</Layout>;
};

export default Home;
