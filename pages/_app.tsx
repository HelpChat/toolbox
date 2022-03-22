import type { AppProps } from "next/app";
import GlobalStyles from "../components/GlobalStyles";
import tw, { css } from "twin.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faToolbox } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { ToolboxTool, Tools } from "../components/nav";

function Toolbox({ Component, pageProps }: AppProps) {
  return (
    <div>
      <GlobalStyles />
      <div css={tw`flex flex-row`}>
        <div css={tw`flex-grow flex-shrink`}>
          <div
            css={tw`text-white bg-black w-full md:px-8 p-2 h-14 flex flex-row text-white md:px-12`}
          >
            <div css={tw`flex flex-row w-full`}>
              <div css={tw`flex flex-row`}>
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
              <div css={tw`flex flex-row flex-grow flex-shrink`}>
                <Link href={"/"}>
                  <p
                    css={tw`px-3 mx-1 py-2 my-auto ml-auto hover:cursor-pointer`}
                  >
                    Home
                  </p>
                </Link>
                <Link
                  href={"https://www.spigotmc.org/members/helpchat.1491649/"}
                >
                  <p css={tw`px-3 mx-1 py-2 my-auto hover:cursor-pointer`}>
                    Spigot
                  </p>
                </Link>
                <Link href={"https://github.com/HelpChat"}>
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
                    {Object.keys(Tools).map((key, index) => {
                      const children: JSX.Element[] = [];
                      if (Array.isArray(Tools[key])) {
                        (Tools[key] as ToolboxTool[]).forEach((tool) => {
                          children.push(
                            <p
                              css={tw`px-3 mx-1 pt-3 ml-1 pb-1 hover:cursor-default`}
                            >
                              {tool.short}
                            </p>
                          );
                        });
                      } else {
                        children.push(
                          ...Object.keys(Tools[key]).map((key1, index) => {
                            const children: JSX.Element[] = [];
                            (Tools[key] as Record<string, ToolboxTool[]>)[
                              key1
                            ].forEach((tool) => {
                              children.push(
                                <p
                                  css={tw`px-3 mx-1 pt-3 ml-2 pb-1 hover:cursor-default`}
                                >
                                  {tool.short}
                                </p>
                              );
                            });
                            return (
                              <div key={index}>
                                <p
                                  css={tw`px-3 mx-1 pt-3 font-bold pb-1 hover:cursor-default`}
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
                        <div key={index}>
                          <p
                            css={tw`px-3 mx-1 pt-3 font-bold pb-1 hover:cursor-default`}
                          >
                            {key}
                          </p>
                          {children}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <Link href={"https://discord.gg/helpchat"}>
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
    </div>
  );
}

export default Toolbox;
