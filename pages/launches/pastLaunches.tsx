import type { NextPage } from "next";
import Layout from "../../components/Layout";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import Image from "next/image";
import shuttle from "../../assets/shuttle3.png";
import Link from "next/link";
import Launches from "../../components/Launches";
import Loader from "../../components/Loader";

type Props = {
  title: string;
  query: string;
};

interface LaunchesData {
  id: string;
  mission_name: string;
  launch_date_local: string;
  launch_site: {
    site_name_long: string;
  };
  links: {
    wikipedia: string | null;
    mission_patch_small: string | null;
  };
  rocket: {
    rocket_name: string;
  };
}

interface LaunchesResult {
  launchesPast: Array<LaunchesData>;
}

const query = `
mission_name
launch_date_local
launch_site {
  site_name_long
}
links {
  video_link
  wikipedia
  article_link
  mission_patch_small
}
rocket {
  rocket_name
}
id
`;

const pastLaunches: NextPageWithLayout = () => {
  const [offset, setOffset] = useState(0)
  const LAUNCHES = gql`
  query {
    launchesPast(limit: 10, offset: ${offset}) {
      ${query}
    }
  }
`;
  const { loading, error, data } = useQuery<LaunchesResult>(LAUNCHES);

  console.log(data);
  return (
    <div>
      <main>
        <>
          <section className="text-gray-400 bg-gray-900 body-font">
            <div className="container mx-auto pl-5">
              <h1 className="text-5xl text-white mt-16">Past launches</h1>
            </div>
            {loading || !data ? (
              <Loader />
            ) : (
              <>
                <Launches launches={data.launchesPast} offset={offset} setOffset={setOffset} />
              </>
            )}
          </section>
        </>
      </main>
    </div>
  );
};

pastLaunches.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="Index">{page}</Layout>;
};


export default pastLaunches;
