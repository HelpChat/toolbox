import type { AppProps } from "next/app";
import "../styles/global.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronDown,
  faToolbox,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { ToolboxTool, Tools } from "../components/nav";
import { useState } from "react";

function Toolbox({ Component, pageProps }: AppProps) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="bg-dark text-white">
      <div className="bg-dark absolute h-full z-10">
        {(
          [
            {
              color: "#1c5e45", // green
              x: 37,
              y: 50,
              size: 9,
            },
            {
              color: "#0f284c", // blue
              x: 26,
              y: 70,
              size: 7,
            },
            {
              color: "#0f284c", // blue
              x: 50,
              y: 50,
              size: 7,
            },
            {
              color: "#1c5e45", // green
              x: 18,
              y: 30,
              size: 6,
            },
            {
              color: "#69137e", // purple
              x: 1,
              y: 110,
              size: 13,
            },
            {
              color: "#69137e", // purple
              x: 110,
              y: 100,
              size: 13,
            },
            {
              color: "#69137e",
              x: 83,
              y: 50,
              size: 10,
            },
          ] as ColorSplotch[]
        ).map((splotch, i) => (
          <div
            key={i}
            className="fixed"
            style={{
              left: `${splotch.x}vw`,
              top: `${splotch.y}vh`,
              filter: "blur(100px)",
              width: "1px",
              height: "1px",
              borderRadius: "50%",
              backgroundColor: splotch.color,
              boxShadow: `0 0 150px calc(${splotch.size}vw + ${splotch.size}vh) ${splotch.color}`,
            }}
          />
        ))}
      </div>
      <div className="backdrop-blur-xl relative z-20">
        <div className="text-white w-full md:px-8 p-2 md:h-14 flex flex-row text-white md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row w-full">
            <Link href={"/"} prefetch={false} passHref>
              <div className="flex flex-row hover:cursor-pointer m-4 md:m-0">
                <div className="my-auto">
                  <FontAwesomeIcon icon={faToolbox} size={"2x"} />
                </div>
                <div className="ml-2 my-auto font-bold text-center">
                  <p
                    style={{
                      marginBottom: "-0.2rem",
                    }}
                  >
                    HelpChat
                  </p>
                  <p
                    style={{
                      marginTop: "-0.2rem",
                    }}
                    className="text-xs"
                  >
                    Toolbox
                  </p>
                </div>
                <div
                  className="block md:hidden ml-auto hover:cursor-pointer"
                  onClick={() => setNavOpen(!navOpen)}
                >
                  <FontAwesomeIcon icon={faBars} size={"2x"} />
                </div>
              </div>
            </Link>
            <div
              className={`${
                navOpen ? "h-max-content" : "h-0"
              } flex flex-col md:flex-row flex-grow flex-shrink ${
                !navOpen ? "overflow-hidden md:overflow-visible" : ""
              }`}
            >
              <Link href={"/"} prefetch={false} passHref>
                <p className="px-3 mx-2 py-2 my-auto md:ml-auto hover:cursor-pointer">
                  Home
                </p>
              </Link>
              <Link
                href={"https://www.spigotmc.org/members/helpchat.1491649/"}
                prefetch={false}
                passHref
              >
                <p className="px-3 mx-2 py-2 my-auto hover:cursor-pointer">
                  SpigotMC
                </p>
              </Link>
              <Link
                href={"https://github.com/HelpChat/toolbox"}
                prefetch={false}
                passHref
              >
                <p className="px-3 mx-2 py-2 my-auto hover:cursor-pointer">
                  GitHub
                </p>
              </Link>
              <div className="my-auto hover:cursor-pointer inline-block relative mx-2 py-2 rounded-t-md">
                <p className="pl-3 mr-2 inline">More Tools</p>
                <div className="ml-0 pr-3 mr-1 inline">
                  <FontAwesomeIcon icon={faChevronDown} size={"1x"} />
                </div>
                <div
                  className={
                    "hidden absolute bg-gray-800 w-full rounded-b-md z-30 pb-2"
                  }
                >
                  {Object.keys(Tools).map((key) => {
                    const children: JSX.Element[] = [];
                    if (Array.isArray(Tools[key])) {
                      (Tools[key] as ToolboxTool[]).forEach((tool) => {
                        children.push(
                          <Link
                            href={tool.link}
                            prefetch={false}
                            key={tool.short}
                            passHref
                          >
                            <p className="px-3 ml-2 pt-3 pb-1 hover:cursor-pointer hover:bg-gray-600">
                              {tool.short}
                            </p>
                          </Link>
                        );
                      });
                    } else {
                      children.push(
                        ...Object.keys(Tools[key]).map((key1) => {
                          const children: JSX.Element[] = [];
                          (Tools[key] as Record<string, ToolboxTool[]>)[
                            key1
                          ].forEach((tool) => {
                            children.push(
                              <Link
                                href={tool.link}
                                prefetch={false}
                                key={tool.short}
                                passHref
                              >
                                <p className="px-3 ml-3 pt-3 pb-1 hover:cursor-pointer hover:bg-gray-600">
                                  {tool.short}
                                </p>
                              </Link>
                            );
                          });
                          return (
                            <div key={key1}>
                              <p className="px-3 ml-2 pt-3 font-bold pb-1 hover:cursor-default">
                                {key1}
                              </p>
                              {children}
                            </div>
                          );
                        })
                      );
                    }
                    return (
                      <div key={key}>
                        <p className="px-3 ml-1 pt-3 font-bold pb-1 hover:cursor-default">
                          {key}
                        </p>
                        {children}
                      </div>
                    );
                  })}
                </div>
              </div>
              <Link
                href={"https://discord.gg/helpchat"}
                prefetch={false}
                passHref
              >
                <p className="px-3 mx-2 py-2 my-auto hover:cursor-pointer hover:bg-gray-800 hover:text-white bg-white text-black rounded-md">
                  Join our Discord
                </p>
              </Link>
            </div>
          </div>
        </div>
        <Component {...pageProps} />
      </div>
    </div>
  );
}

type ColorSplotch = {
  color: string;
  size: number;
  x: number;
  y: number;
};

export default Toolbox;
