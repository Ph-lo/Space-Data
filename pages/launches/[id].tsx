import type { NextPage } from "next";
import Layout from "../../components/Layout";
import shuttle from "../../assets/shuttle2.png"
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
    rocket: {
      id: string;
    }
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
    rocket {
      id
    }
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
          <section className="text-gray-400 bg-gray-900 body-font pt-16">
            {loading || !data ? (
              <p>Data loading...</p>
            ) : (
                <>
                <div className="container mx-auto flex px-5 py-10 md:flex-row flex-col items-center">
                  <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10">
                    {data.launch.links.video_link ? (
                        <iframe className="object-cover object-center lg: w-full rounded" src={toEmbed(data.launch.links.video_link)}
                        allow='autoplay; encrypted-media'
                        width={500}
                        height={300}
                        title='video'
                        />
                    ) : (
                        <Image className="object-cover object-center rounded" alt="hero" src={shuttle} />
                    )}
                    
                  </div>
                  <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">Mission : {data.launch.mission_name}</h1>
                    <Link href={`/rockets/${data.launch.rocket.rocket.id}`}><h1 className="cursor-pointer title-font sm:text-3xl text-3xl mb-4 font-medium text-white">Rocket : {data.launch.rocket.rocket_name}</h1></Link>
                    <p className=" leading-relaxed">Date : {data.launch.launch_date_local}</p>
                    <p className="mb-5 leading-relaxed">Site : {data.launch.launch_site.site_name_long}</p>
                    <p className="mb-5 leading-relaxed">{data.launch.details ? data.launch.details : "No details."}</p>
                    {data.launch.links.article_link && <p className="mb-5 leading-relaxed">Read this <a className="text-sky-600 underline" href={data.launch.links.article_link}>article &#8594;</a></p> }
                    <div className="flex justify-between w-full">
                        {data.launch.links.wikipedia && 
                      <a href={data.launch.links.wikipedia} className="inline-flex h-12 mt-3 text-white bg-sky-800 border-0 py-2 px-6 focus:outline-none hover:bg-sky-900 rounded text-lg ">See the wiki</a>}
                        {data.launch.links.mission_patch && 
                      <Image src={data.launch.links.mission_patch} width={64} height={64}  />}
                    </div>
                  </div>
                </div>
                {data.launch.ships.length > 0 && (
                  <div className="container mx-auto px-5">
                    <h1 className="title-font sm:text-3xl text-3xl mb-10 mt-8 font-medium text-white">Ships :</h1>
                    <div className="flex flex-wrap -m-4">
                      {data.launch.ships.map(ship => {
                        return (
                          <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-48 rounded overflow-hidden">
                              <Image layout="fill" alt="ecommerce" className="object-cover object-center w-full h-full block" src={ship.image} />
                            </a>
                            <div className="mt-4">
                              <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Home port : {ship.home_port}</h3>
                              <h2 className="text-white title-font text-lg font-medium">{ship.name}</h2>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
                </>
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
