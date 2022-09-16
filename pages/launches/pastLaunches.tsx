import type { NextPage } from "next";
import Layout from "../../components/Layout";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import Image from "next/image";
import shuttle from "../../assets/shuttle3.png";
import Link from "next/link";

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

const getTotalPages = () => {

};

const Launches: NextPageWithLayout = () => {
  const [offset, setOffset] = useState(0)
  const LAUNCHES = gql`
  query {
    launchesPast(limit: 10, offset: ${offset}) {
      ${query}
    }
  }
`;
  const { loading, error, data } = useQuery<LaunchesResult>(LAUNCHES);

  const nextPage = () => {
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: 'smooth'
    });
    setOffset(offset+10);
  };

  const previousPage = () => {
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: 'smooth'
    });
    setOffset(offset-10);
  };

  console.log(data);
  return (
    <div>
      <main>
        <>
          <section className="text-gray-400 bg-gray-900 body-font">
            <h1 className="text-5xl text-white text-center mt-10">Past launches</h1>
            {loading || !data ? (
              <p>Data loading...</p>
            ) : (
              <>
                <div className="container px-5 py-24 mx-auto flex flex-wrap">
                  <div className="flex flex-wrap -m-4">
                    {data.launchesPast.map((launch) => (
                      <div key={launch.id} className="p-4 lg:w-1/2 md:w-full">
                        <div className="flex border-2 rounded-lg border-gray-800 p-8 sm:flex-row flex-col">
                          <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-gray-800 text-indigo-400 flex-shrink-0">
                            <Image layout="fixed" className="relative z-0" src={launch.links.mission_patch_small ? launch.links.mission_patch_small : shuttle} alt='shuttle' width={32} height={32} />
                          </div>
                          <div className="flex-grow">
                            <Link href={`/launches/${launch.id}`} ><h2 className="text-white text-lg title-font font-medium mb-3 cursor-pointer">Mission : {launch.mission_name}</h2></Link>
                            <p className="leading-relaxed text-base">{launch.launch_date_local}</p>
                            <p className="leading-relaxed text-base mb-3">At {launch.launch_site.site_name_long}</p>
                            <Link href={`/launches/${launch.id}`}>
                                <p className="text-sky-600 inline-flex items-center cursor-pointer" >Learn More &#8594;</p>
                              </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                  </div>
                </div>
                <div className={offset > 0 ? "flex justify-between p-5" : "flex justify-end p-5"}>
                  {offset > 0 && <button onClick={() => previousPage()} className="text-2xl bg-slate-700 px-3 py-1 rounded-sm">&larr; Previous</button>}
                  <button onClick={() => nextPage()} className="text-2xl bg-slate-700 px-3 py-1 rounded-sm">Next &rarr;</button>
                </div>
              </>
            )}
          </section>
          <section className="text-gray-400 bg-gray-900 body-font">
            <div className="container px-5 py-24 mx-auto flex flex-wrap">
              <div className="flex flex-wrap -m-4">
                
                
              </div>
            </div>
          </section>
        </>
      </main>
    </div>
  );
};

Launches.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="Index">{page}</Layout>;
};

export default Launches;
