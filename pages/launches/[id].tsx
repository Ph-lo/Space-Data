import type { NextPage } from "next";
import Layout from "../../components/Layout";

import { gql, useQuery } from "@apollo/client";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

interface LaunchData {
  id: string;
  mission_name: string;
  launch_date_local: string;
  launch_site: {
    site_name_long: string;
  };
  links: {
    article_link: string;
    video_link: string;
    wikipedia: string | null;
    mission_patch: string | null;
  };
  rocket: {
    rocket_name: string;
  };
  ships: [{
    name: string;
    home_port: string;
    image: string;
  }];
  details: string | null;
}

interface LaunchResult {
    launch: LaunchData;
}

const query = `
mission_name
launch_date_local
launch_site {
    site_name_long
}
links {
    article_link
    video_link
    wikipedia
    mission_patch
}
rocket {
    rocket_name
    first_stage {
        cores {
            flight
            core {
              reuse_count
              status
            }
          }
        }
        second_stage {
          payloads {
            payload_type
            payload_mass_kg
            payload_mass_lbs
          }
        }
      }
      ships {
        name
        home_port
        image
      }
      id
      details
`

const Launch: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const ROCKETS = gql`
  query {
    launch(id: "${id}") {
      ${query}
    }
  }
`;
  const { loading, error, data } = useQuery<LaunchResult>(ROCKETS);

  const toEmbed = (url: string) => {
    const tmpUrl = url.split("youtu.be");
    const embedded = "https://www.youtube.com/embed/" + tmpUrl[1];
    return embedded;
  };

  console.log(data);
  return (
    <div>
      <main>
        <>
          <section className="text-gray-400 bg-gray-900 body-font pt-5">
            <h1 className="text-4xl text-white text-center mt-10">Launch</h1>
            {loading || !data ? (
              <p>Data loading...</p>
            ) : (
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                  <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10">
                    {data.launch.links.video_link ? (
                        <iframe className="object-cover object-center lg: w-full rounded" src={toEmbed(data.launch.links.video_link)}
                        allow='autoplay; encrypted-media'
                        width={500}
                        height={300}
                        title='video'
                        />
                    ) : (
                        <img className="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600" />
                    )}
                    
                  </div>
                  <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">Mission : {data.launch.mission_name}
                      <br className="hidden lg:inline-block" />Rocket : {data.launch.rocket.rocket_name}
                    </h1>
                    <p className=" leading-relaxed">Date : {data.launch.launch_date_local}</p>
                    <p className="mb-5 leading-relaxed">Site : {data.launch.launch_site.site_name_long}</p>
                    <p className="mb-5 leading-relaxed">{data.launch.details ? data.launch.details : "No details."}</p>
                    {data.launch.links.article_link && <p className="mb-5 leading-relaxed">Read this <a className="text-sky-600 underline" href={data.launch.links.article_link}>article &#8594;</a></p> }
                    <div className="flex justify-between w-1/2">
                        {data.launch.links.wikipedia && 
                      <a href={data.launch.links.wikipedia} className="inline-flex h-12 mt-3 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">See the wiki page</a>}
                        {data.launch.links.mission_patch && 
                      <Image src={data.launch.links.mission_patch} width={64} height={64}  />}
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

Launch.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="Index">{page}</Layout>;
};

export default Launch;
