import type {NextPage} from 'next'
import Head from 'next/head'
import tw, {css} from 'twin.macro'
import {TextBox} from "../components/TextBox";
import {useEffect, useState} from "react";
import ConvertConfig from "../converter/converter";


const Home: NextPage = () => {

    const [config, setConfig] = useState("");
    const [parsedConfig, setParsedConfig] = useState<false|{format: string, settings: string}>(false);

    useEffect(() => {
        setParsedConfig(ConvertConfig(config));
    }, [config])

    return (
        <div>
            <Head>
                <title>DeluxeChat to ChatChat Converter</title>
                <meta name="description" content="Convert DeluxeChat Configs to ChatChat"/>
            </Head>

            <main>
                <div css={tw`text-white bg-blue-500 w-full md:px-8`}>
                    <div css={tw`p-2 h-8`}>
                        <a href={"https://helpch.at"} css={tw`text-lg font-bold`}>HelpChat</a>
                    </div>
                    <div css={tw`p-16 h-48 text-center`}>
                        <p css={tw`text-3xl font-bold`}>HelpChat</p>
                        <p css={tw`text-lg`}>DeluxeChat Config Converter</p>
                    </div>
                </div>
                <div css={css`
                  ${tw`bg-red-500 text-white text-xl h-8 text-center`}
                  ${!ConvertConfig(config) ? tw`block` : tw`hidden`}
                `}>Invalid Config
                </div>
                <div css={tw`flex flex-col md:flex-row`}>
                    <div css={css`
                      height: calc(100vh - ${parsedConfig ? 14 : 16}rem);
                      ${tw`md:w-1/2 p-4 pt-1 pr-2`}
                    `}>
                        <TextBox title={"DeluxeChat Config"} code={config} editor={setConfig}/>
                    </div>
                    <div css={css`
                      height: calc(100vh - ${parsedConfig ? 14 : 16}rem);
                      ${tw`w-full md:w-1/2 p-4 pl-2 pt-1 flex flex-col`}
                    `}>
                        <div css={tw`h-1/2`}>
                            <TextBox title={"ChatChat formats.yml"} code={!parsedConfig ? "" : parsedConfig.format}/>
                        </div>
                        <div css={tw`h-1/2`}>
                        <TextBox title={"ChatChat settings.yml"} code={!parsedConfig ? "" : parsedConfig.settings}/>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Home
