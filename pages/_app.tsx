import type {AppProps} from 'next/app'
import GlobalStyles from "../components/GlobalStyles";
import tw, {css} from "twin.macro";
import Link from 'next/link'
import {ReactNode, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronDown, faChevronRight} from "@fortawesome/free-solid-svg-icons";

function Converter({Component, pageProps}: AppProps) {
    return (
        <div>
            <GlobalStyles/>
            <div css={tw`flex flex-row`}>
                <div css={tw`w-48 bg-gray-700 flex flex-col text-white py-4 px-4`}>
                    <Link href={'/'}>
                        <div css={tw`text-lg font-bold mr-auto hover:cursor-pointer mx-auto mb-8`}>HelpChat Tools</div>
                    </Link>
                    <Collapsable name={"Config Converters"}>
                        <Collapsable name={"ChatChat"}>
                            <Link href={'/converters/chatchat/deluxechat'}>
                                <p>DeluxeChat</p>
                            </Link>
                            <Link href={'/converters/chatchat/essentialschat'}>
                                <p>EssentialsChat</p>
                            </Link>
                            <Link href={'/converters/chatchat/venturechat'}>
                                <p>VentureChat</p>
                            </Link>
                        </Collapsable>
                    </Collapsable>
                    <Collapsable name={'Validators'}>
                        <Link href={'/validators/yaml'}>
                            Yaml Validator
                        </Link>
                    </Collapsable>
                </div>
                <div css={tw`flex-grow flex-shrink`}>
                    <div css={tw`text-white bg-blue-500 w-full md:px-8 p-2 h-11 flex flex-row`} />
                    <Component {...pageProps} /></div>
            </div>
        </div>
    )
}

function Collapsable({children, name}: { children: ReactNode, name: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div css={tw`flex flex-col mb-2`}>
            <div css={tw`flex flex-row`}>
                {name}
                <div onClick={() => setOpen(!open)} css={tw`ml-auto hover:cursor-pointer`}>
                    {open ? <FontAwesomeIcon icon={faChevronDown}/> : <FontAwesomeIcon icon={faChevronRight}/>}
                </div>
            </div>
            <div css={css`
              display: ${open ? 'block' : 'none'};
              ${tw`ml-3`}
            `}>
                {children}
            </div>
        </div>
    )
}

export default Converter
