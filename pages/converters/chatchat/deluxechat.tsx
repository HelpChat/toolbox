import type {NextPage} from 'next'
import Head from 'next/head'
import tw, {css} from 'twin.macro'
import {TextBox} from "../../../components/TextBox";
import {useEffect, useState} from "react";
import ChatChatDeluxeChatConverter from "../../../converters/chatchat/deluxechat";
import {ConversionError} from "../../../converters/converter";


const Home: NextPage = () => {

    const [config, setConfig] = useState("");
    const [parsedConfig, setParsedConfig] = useState<false | { format: string, settings: string }>(false);
    const [error, setError] = useState<false | string>(false);

    useEffect(() => {
        const newConfig = ChatChatDeluxeChatConverter.convert(config);
        if (Object.keys(newConfig).includes("error")) {
            setError((newConfig as ConversionError).message);
            setParsedConfig(false);
        } else {
            setError(false);
            setParsedConfig(newConfig as { format: string, settings: string });
        }
    }, [config])

    return (
        <div>
            <Head>
                <title>DeluxeChat to ChatChat Converter</title>
                <meta name="description" content="Convert DeluxeChat Configs to ChatChat"/>
            </Head>

            <main css={css`${tw`flex flex-col`} height: calc(100vh - 2.75rem)`}>
                <div css={tw`text-white bg-blue-500 w-full md:px-8 p-16 h-48 text-center`}>
                    <p css={tw`text-3xl font-bold`}>HelpChat</p>
                    <p css={tw`text-lg`}>DeluxeChat Config Converter</p>
                </div>
                <div css={tw`flex flex-col md:flex-row flex-grow flex-shrink h-full max-w-full`}>
                    <div css={css`
                      ${tw`w-full md:w-1/2 p-4 pt-1 pr-2`}
                      height: calc(100vh - 14.75em);
                      max-width: calc(50vw - 6rem);
                    `}>
                        <TextBox title={"DeluxeChat Config"} code={config} editor={setConfig}/>
                    </div>
                    <div css={css`
                      ${tw`w-full md:w-1/2 p-4 pl-2 pt-1 flex flex-col`}
                      height: calc(100vh - 14.75em);
                      max-width: calc(50vw - 6rem);
                    `}>
                        {
                            error ? (<TextBox title={"Conversion Error"} code={error}/>) : (
                                <>
                                    <div css={tw`h-1/2`}>
                                        <TextBox title={"ChatChat formats.yml"}
                                                 code={!parsedConfig ? "" : parsedConfig.format}/>
                                    </div>
                                    <div css={tw`h-1/2`}>
                                        <TextBox title={"ChatChat settings.yml"}
                                                 code={!parsedConfig ? "" : parsedConfig.settings}/>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Home
