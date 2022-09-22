import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import shuttle from "../assets/shuttle3.png";

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

type LaunchesResult = Array<LaunchesData>;

type Props = {
    launches: LaunchesResult;
    offset: number;
    setOffset: (val: number) => void;
}

const Launches = ({ launches, offset, setOffset }: Props) => {
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
  return (
    <>
      <div className="container px-5 pt-16 mx-auto flex flex-wrap">
        <div className="flex flex-wrap -m-4">
          {launches.map((launch) => (
            <div key={launch.id} className="p-4 lg:w-1/2 md:w-full">
              <div className="flex border-2 rounded-lg border-gray-800 p-8 sm:flex-row flex-col">
                <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-gray-800 text-indigo-400 flex-shrink-0">
                  <Image
                    layout="fixed"
                    className="relative z-0"
                    src={
                      launch.links.mission_patch_small
                        ? launch.links.mission_patch_small
                        : shuttle
                    }
                    alt="shuttle"
                    width={32}
                    height={32}
                  />
                </div>
                <div className="flex-grow">
                  <Link href={`/launches/${launch.id}`}>
                    <h2 className="text-white text-lg title-font font-medium mb-3 cursor-pointer">
                      Mission : {launch.mission_name}
                    </h2>
                  </Link>
                  <p className="leading-relaxed text-base">
                    {launch.launch_date_local}
                  </p>
                  <p className="leading-relaxed text-base mb-3">
                    At {launch.launch_site.site_name_long}
                  </p>
                  <Link href={`/launches/${launch.id}`}>
                    <p className="text-sky-600 inline-flex items-center cursor-pointer">
                      Learn More &#8594;
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={
          offset > 0
            ? "flex mx-auto justify-around p-5 pb-16 mt-3"
            : "flex w-5/6 justify-end p-5 pb-16 mt-3"
        }
      >
        {offset > 0 && (
          <button
            onClick={() => previousPage()}
            className="text-2xl bg-sky-900 px-3 py-1 rounded-sm"
          >
            &larr; Prev
          </button>
        )}
        {launches.length === 10 && (
          <button
            onClick={() => nextPage()}
            className="text-2xl bg-sky-900 px-3 py-1 rounded-sm"
          >
            Next &rarr;
          </button>
        )}
      </div>
    </>
  );
};

export default Launches;
