import Layout from "../../components/Layout";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import Launches from "../../components/Launches";

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
  launchesUpcoming: Array<LaunchesData>;
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

const upcomingLaunches: NextPageWithLayout = () => {
  const [offset, setOffset] = useState(0);
  const LAUNCHES = gql`
  query {
    launchesUpcoming(limit: 10, offset: ${offset}) {
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
              <h1 className="text-5xl text-white mt-16">Upcoming launches</h1>
            </div>
            {loading || !data ? (
              <p>Data loading...</p>
            ) : (
              <>
                <Launches launches={data.launchesUpcoming} offset={offset} setOffset={setOffset} />
              </>
            )}
          </section>
        </>
      </main>
    </div>
  );
};

upcomingLaunches.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="Index">{page}</Layout>;
};

export default upcomingLaunches;
