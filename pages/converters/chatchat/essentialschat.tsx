import type {NextPage} from 'next'
import Head from 'next/head'
import tw, {css} from 'twin.macro'
import {TextBox} from "../../../components/TextBox";
import {useEffect, useState} from "react";
import ChatChatEssentialsChatConverter from "../../../converters/chatchat/essentialschat";
import {ConversionError} from "../../../converters/converter";
import Properties from "@js.properties/properties";

const Home: NextPage = () => {

    const [config, setConfig] = useState("");
    const [lang, setLang] = useState("");
    const [parsedConfig, setParsedConfig] = useState<false | { format: string, settings: string }>(false);
    const [error, setError] = useState<false | string>(false);

    useEffect(() => {
        let propertiesConfig: any = {};
        try {
            const propertiesList = Properties.parseToEntries(lang, {
                all: false
            });
            propertiesList.forEach(properties => {
                if (!properties.key) return;
                propertiesConfig[properties.key] = properties.element ?? "";
            });
        } catch (e: any) {
            setError(e?.message ?? "Error parsing properties file");
            setParsedConfig(false);
        }
        const newConfig = ChatChatEssentialsChatConverter.convert({config, language: propertiesConfig});
        if (Object.keys(newConfig).includes("error")) {
            setError((newConfig as ConversionError).message);
            setParsedConfig(false);
        } else {
            setError(false);
            setParsedConfig(newConfig as { format: string, settings: string });
        }
    }, [config, lang])

    return (
        <div>
            <Head>
                <title>EssentialsChat to ChatChat Converter</title>
                <meta name="description" content="Convert EssentialsChat Configs to ChatChat"/>
            </Head>

            <main css={css`${tw`flex flex-col`} height: calc(100vh - 2.75rem)`}>
                <div css={tw`text-white bg-blue-500 w-full md:px-8 p-16 h-48 text-center`}>
                    <p css={tw`text-3xl font-bold`}>HelpChat</p>
                    <p css={tw`text-lg`}>EssentialsChat Config Converter</p>
                </div>
                <div css={tw`flex flex-col md:flex-row flex-grow flex-shrink h-full max-w-full`}>
                    <div css={css`
                      ${tw`w-full md:w-1/2 p-4 pt-1 pr-2`}
                      height: calc(100vh - 14.75em);
                      max-width: calc(50vw - 6rem);
                    `}>
                        <div css={tw`h-1/2`}>
                        <TextBox title={"EssentialsChat Config"} code={config} editor={setConfig} language={"yaml"}/>
                        </div>
                        <div css={tw`h-1/2`}>
                            <TextBox title={"EssentialsChat Language File"} code={lang} editor={setLang} language={"properties"}/>
                        </div>
                    </div>
                    <div css={css`
                      ${tw`w-full md:w-1/2 p-4 pl-2 pt-1 flex flex-col`}
                      height: calc(100vh - 14.75em);
                      max-width: calc(50vw - 6rem);
                    `}>
                        {
                            error || !parsedConfig ? (<div css={tw`flex flex-col h-full w-full pt-1`}>
                                <div css={tw`flex flex-row pl-2`}>
                                    <p css={tw`text-xl font-semibold mx-auto mb-2`}>YAML Validation Errors</p>
                                </div>
                                <div css={css`${tw`rounded-md overflow-auto h-full`} background-color: #2a2734`}>
                                    <div css={tw` py-2 px-4`}>
                                    <span css={
                                        css`
                                          ${tw`text-base text-white whitespace-pre`}
                                          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
                                        `}>{error}</span>
                                    </div>
                                </div>
                            </div>) : (
                                <>
                                    <div css={tw`flex flex-col flex-grow flex-shrink h-full max-w-full`}>
                                        <div css={tw`h-1/2`}>
                                            <TextBox title={"ChatChat formats.yml"}
                                                     code={!parsedConfig ? "" : parsedConfig.format}
                                                     language={"yaml"}/>
                                        </div>
                                        <div css={tw`h-1/2`}>
                                            <TextBox title={"ChatChat settings.yml"}
                                                     code={!parsedConfig ? "" : parsedConfig.settings}
                                                     language={"yaml"}/>
                                        </div>
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
