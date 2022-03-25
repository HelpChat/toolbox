import type { AppProps } from "next/app";
import GlobalStyles from "../components/GlobalStyles";
import tw, { css } from "twin.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faToolbox } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { ToolboxTool, Tools } from "../components/nav";

function Toolbox({ Component, pageProps }: AppProps) {
  return (
    <div css={tw`bg-dark text-white`}>
      <div css={tw`bg-dark absolute h-full z-10`}>
        {(
          [
            {
              color: "#224b4b", // green
              x: 47,
              y: 42,
              size: 9,
            },
            {
              color: "#224b4b",
              x: 54,
              y: 74,
              size: 7,
            },
            {
              color: "#224b4b",
              x: 18,
              y: 20,
              size: 6,
            },
            {
              color: "#571b60", // purple
              x: 23,
              y: 65,
              size: 11,
            },
            {
              color: "#571b60",
              x: 83,
              y: 50,
              size: 10,
            },
          ] as ColorSplotch[]
        ).map((splotch, i) => (
          <div
            key={i}
            css={css`
              ${tw`fixed`}
              left: ${splotch.x}vw;
              top: ${splotch.y}vh;
              width: 1px;
              height: 1px;
              border-radius: 50%;
              background-color: ${splotch.color};
              box-shadow: 0 0 150px calc(${splotch.size}vw + ${splotch.size}vh)
                ${splotch.color};
            `}
          />
        ))}
      </div>
      <GlobalStyles />
      <div css={tw`backdrop-blur-sm relative z-20`}>
        <div
          css={tw`text-white w-full md:px-8 p-2 h-14 flex flex-row text-white md:px-12`}
        >
          <div css={tw`flex flex-row w-full`}>
            <Link href={"/"} passHref>
              <div css={tw`flex flex-row hover:cursor-pointer`}>
                <div css={tw`my-auto`}>
                  <FontAwesomeIcon icon={faToolbox} size={"2x"} />
                </div>
                <div css={tw`ml-2 my-auto font-bold text-center`}>
                  <p
                    css={css`
                      margin-bottom: -0.2rem;
                    `}
                  >
                    HelpChat
                  </p>
                  <p
                    css={css`
                      margin-top: -0.2rem;
                      ${tw`text-xs`}
                    `}
                  >
                    ToolBox
                  </p>
                </div>
              </div>
            </Link>
            <div css={tw`flex flex-row flex-grow flex-shrink`}>
              <Link href={"/"} passHref>
                <p
                  css={tw`px-3 mx-1 py-2 my-auto ml-auto hover:cursor-pointer`}
                >
                  Home
                </p>
              </Link>
              <Link
                href={"https://www.spigotmc.org/members/helpchat.1491649/"}
                passHref
              >
                <p css={tw`px-3 mx-1 py-2 my-auto hover:cursor-pointer`}>
                  Spigot
                </p>
              </Link>
              <Link href={"https://github.com/HelpChat"} passHref>
                <p css={tw`px-3 mx-1 py-2 my-auto hover:cursor-pointer`}>
                  Github
                </p>
              </Link>
              <div
                css={css`
                  ${tw`my-auto hover:cursor-pointer inline-block relative py-2 rounded-t-md`}
                  :hover {
                    ${tw`bg-gray-800`}
                    > .dropdown {
                      ${tw`block`}
                    }
                  }
                `}
              >
                <p css={tw`pl-3 ml-1 inline`}>More Tools</p>
                <div css={tw`ml-1 pr-3 mr-1 inline`}>
                  <FontAwesomeIcon icon={faChevronDown} size={"1x"} />
                </div>
                <div
                  css={tw`hidden absolute bg-gray-800 w-full rounded-b-md z-30 pb-2`}
                  className={"dropdown"}
                >
                  {Object.keys(Tools).map((key) => {
                    const children: JSX.Element[] = [];
                    if (Array.isArray(Tools[key])) {
                      (Tools[key] as ToolboxTool[]).forEach((tool) => {
                        children.push(
                          <Link href={tool.link} key={tool.short} passHref>
                            <p
                              css={tw`px-3 ml-2 pt-3 pb-1 hover:cursor-pointer`}
                            >
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
                              <Link href={tool.link} key={tool.short} passHref>
                                <p
                                  css={tw`px-3 ml-3 pt-3 pb-1 hover:cursor-pointer`}
                                >
                                  {tool.short}
                                </p>
                              </Link>
                            );
                          });
                          return (
                            <div key={key1}>
                              <p
                                css={tw`px-3 ml-2 pt-3 font-bold pb-1 hover:cursor-default`}
                              >
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
                        <p
                          css={tw`px-3 ml-1 pt-3 font-bold pb-1 hover:cursor-default`}
                        >
                          {key}
                        </p>
                        {children}
                      </div>
                    );
                  })}
                </div>
              </div>
              <Link href={"https://discord.gg/helpchat"} passHref>
                <p
                  css={tw`px-3 mx-1 py-2 my-auto hover:cursor-pointer bg-white text-black rounded-md`}
                >
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
