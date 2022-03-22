import type {AppProps} from 'next/app'
import GlobalStyles from "../components/GlobalStyles";
import tw, {css} from "twin.macro";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronDown, faToolbox} from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';

function Toolbox({Component, pageProps}: AppProps) {
    return (
        <div>
            <GlobalStyles/>
            <div css={tw`flex flex-row`}>
                <div css={tw`flex-grow flex-shrink`}>
                    <div css={tw`text-white bg-black w-full md:px-8 p-2 h-14 flex flex-row text-white md:px-12`}>
                        <div css={tw`flex flex-row w-full`}>
                            <div css={tw`flex flex-row hover:cursor-pointer`}>
                                <Link href={"/"}>
                                    <>
                                        <div css={tw`my-auto`}>
                                            <FontAwesomeIcon icon={faToolbox} size={"2x"}/>
                                        </div>
                                        <div css={tw`ml-2 my-auto font-bold text-center`}>
                                            <p css={css`
                                              margin-bottom: -0.2rem;
                                            `}>HelpChat</p>
                                            <p css={css`
                                              margin-top: -0.2rem;
                                              ${tw`text-xs`}
                                            `}>ToolBox</p>
                                        </div>
                                    </>
                                </Link>
                            </div>
                            <div css={tw`flex flex-row flex-grow flex-shrink`}>
                                <Link href={"/"}>
                                    <p css={tw`px-3 mx-1 py-2 my-auto ml-auto hover:cursor-pointer`}>Home</p>
                                </Link>
                                <Link href={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}>
                                    <p css={tw`px-3 mx-1 py-2 my-auto hover:cursor-pointer`}>Spigot</p>
                                </Link>
                                <Link href={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}>
                                    <p css={tw`px-3 mx-1 py-2 my-auto hover:cursor-pointer`}>Github</p>
                                </Link>
                                <div css={css`
                                  ${tw`my-auto hover:cursor-pointer inline-block relative py-2 rounded-t-md`}
                                  :hover {
                                  ${tw`bg-gray-800`}
                                    > .dropdown {
                                      ${tw`block`}
                                    }
                                  }
                                `}><p css={tw`pl-3 ml-1 inline`}>More Tools</p>
                                    <div css={tw`ml-1 pr-3 mr-1 inline`}><FontAwesomeIcon icon={faChevronDown}/></div>
                                    <div css={tw`hidden absolute bg-gray-800 w-full rounded-b-md`} className={"dropdown"}>
                                        <p css={tw`px-3 mx-1 pt-3 font-bold pb-1 hover:cursor-default`}>Converters</p>
                                        <p css={tw`px-3 mx-1 ml-2 pb-1 hover:cursor-default`}>ChatChat</p>
                                        <Link href={"/converters/chatchat/deluxechat"}>
                                            <p css={tw`px-3 mx-1 ml-3 pb-1 hover:cursor-pointer`}>DeluxeChat</p>
                                        </Link>
                                        <Link href={"/converters/chatchat/essentialschat"}>
                                            <p css={tw`px-3 mx-1 ml-3 pb-1 hover:cursor-pointer`}>Essentials</p>
                                        </Link>
                                        <Link href={"/converters/chatchat/venturechat"}>
                                            <p css={tw`px-3 mx-1 ml-3 hover:cursor-pointer`}>VentureChat</p>
                                        </Link>
                                        <p css={tw`px-3 mx-1 pt-3 font-bold pb-1 hover:cursor-default`}>Validators</p>
                                        <Link href={"/validators/yaml"}>
                                            <p css={tw`px-2 mx-1 ml-3 hover:cursor-pointer pb-1`}>Yaml</p>
                                        </Link>
                                    </div>
                                </div>
                                <Link href={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}>
                                    <p css={tw`px-3 mx-1 py-2 my-auto hover:cursor-pointer bg-white text-black rounded-md`}>Join
                                        our Discord</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <Component {...pageProps} /></div>
            </div>
        </div>
    )
}

export default Toolbox
