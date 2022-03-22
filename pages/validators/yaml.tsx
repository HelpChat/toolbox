import type {NextPage} from 'next'
import Head from 'next/head'
import tw, {css} from 'twin.macro'
import {TextBox} from "../../components/TextBox";
import {useEffect, useState} from "react";
import {parse} from 'yaml'
import dynamic from "next/dynamic";
import duotoneDark from 'prism-react-renderer/themes/duotoneDark';
import {useRouter} from "next/router";

const ReactJson = dynamic(import('react-json-view'), {ssr: false});

const Home: NextPage = () => {

    const router = useRouter();

    const [config, setConfig] = useState("");
    const [parsedConfig, setParsedConfig] = useState<any>({});
    const [error, setError] = useState<false | string>(false);

    useEffect(() => {
        if (!router.query.data) return;
        if (!(typeof router.query.data === 'string')) return;
        try {
            const yaml = Buffer.from(router.query.data, 'base64');
            setConfig(yaml.toString())
        } catch (e) {
            return;
        }
    }, [router.query.yaml]);

    useEffect(() => {
        let configObject;
        try {
            configObject = parse(config);
            if (!configObject || !(configObject instanceof Object)) {
                setError("must be object");
                setParsedConfig({})
            } else {
                setError(false);
                setParsedConfig(configObject);
            }
        } catch (e: any) {
            setError(e.message);
            setParsedConfig({})
        }
    }, [config])

    return (
        <div>
            <Head>
                <title>Yaml Validator</title>
                <meta name="description" content="Validate Yml Files"/>
            </Head>

            <main css={css`${tw`flex flex-col`} height: calc(100vh - 3.5rem)`}>
                <div css={tw`text-white bg-blue-500 w-full md:px-8 p-16 h-48 text-center`}>
                    <p css={tw`text-3xl font-bold`}>HelpChat</p>
                    <p css={tw`text-lg`}>Yaml Validator</p>
                </div>
                <div css={tw`flex flex-col md:flex-row flex-grow flex-shrink h-full`}>
                    <div css={css`
                      height: calc(100vh - 15.5em);
                      ${tw`md:w-1/2 p-4 pt-1 pr-2 md:max-width[50vw]`}
                    `}>
                        <TextBox title={"Yaml Config"} code={config} editor={setConfig} language={"yaml"}/>
                    </div>
                    <div css={css`
                      height: calc(100vh - 15.5em);
                      ${tw`w-full md:w-1/2 p-4 pl-2 pt-1 flex flex-col md:max-width[50vw]`}
                    `}>
                        <div css={tw`flex flex-col h-full w-full pt-1`}>
                            <div css={tw`flex flex-row pl-2`}>
                                <p css={tw`text-xl font-semibold mx-auto mb-2`}>Json Object Dump</p>
                            </div>
                            <div css={css`${tw`rounded-md overflow-auto h-full`} background-color: #2a2734`}>
                                <div css={tw`py-2 px-4 text-base`}>
                                    {!(error || !parsedConfig) ? <ReactJson src={parsedConfig} theme={{
                                            base00: duotoneDark.plain.backgroundColor ?? "",
                                            base01: duotoneDark.styles[2].style.color ?? "",
                                            base02: duotoneDark.styles[1].style.color ?? "",
                                            base03: duotoneDark.styles[2].style.color ?? "",
                                            base04: duotoneDark.styles[4].style.color ?? "",
                                            base05: duotoneDark.styles[4].style.color ?? "",
                                            base06: duotoneDark.styles[5].style.color ?? "",
                                            base07: duotoneDark.styles[3].style.color ?? "",
                                            base08: duotoneDark.styles[7].style.color ?? "",
                                            base09: duotoneDark.styles[6].style.color ?? "",
                                            base0A: duotoneDark.styles[9].style.color ?? "",
                                            base0B: duotoneDark.styles[10].style.color ?? "",
                                            base0C: duotoneDark.styles[4].style.color ?? "",
                                            base0D: duotoneDark.styles[2].style.color ?? "",
                                            base0E: duotoneDark.styles[2].style.color ?? "",
                                            base0F: duotoneDark.styles[2].style.color ?? "",
                                        }}/> :
                                        <span css={
                                            css`
                                              ${tw`text-base text-white whitespace-pre`}
                                              font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
                                            `}>{error}</span>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Home
