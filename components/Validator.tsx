import Head from "next/head";
import tw, { css } from "twin.macro";
import { highlight, TextBox } from "./TextBox";
import { useEffect, useState } from "react";
import duotoneDark from "prism-react-renderer/themes/duotoneDark";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { ConversionError } from "../converters/converter";
import dynamic from "next/dynamic";
import Editor from "react-simple-code-editor";

const JsonView = dynamic(() => import("@microlink/react-json-view"), {
  ssr: false
});

const Validator = ({
  language,
  lang,
  parser,
    jsonDump = true
}: {
  language: string;
  lang: string;
  parser: (data: string) => ConversionError | { error: false; data: any };
  jsonDump?: boolean;
}) => {
  const router = useRouter();

  const [config, setConfig] = useState("");
  const [parsedConfig, setParsedConfig] = useState<any>({});
  const [error, setError] = useState<false | string>(false);

  useEffect(() => {
    if (!router.query.data) return;
    if (!(typeof router.query.data === "string")) return;
    try {
      const data = Buffer.from(router.query.data, "base64").toString("utf8");
      setConfig(data.toString());
    } catch (e) {
      return;
    }
  }, [router.query.data]);

  useEffect(() => {
    const parsed = parser(config);
    if (parsed.error) {
      setError(parsed.message);
      setParsedConfig(false);
    } else {
      setParsedConfig(parsed.data);
      setError(false);
    }
  }, [config]);

  return (
    <div>
      <Head>
        <title>{language} Validator</title>
        <meta name="description" content={`Validate ${language} Files`} />
      </Head>

      <main
        css={css`
          ${tw`flex flex-col [min-height:calc(100vh - 3.5rem)]`}
        `}
      >
        <div css={tw`w-full md:px-8 p-16 h-48 text-center`}>
          <p css={tw`text-3xl font-bold`}>HelpChat</p>
          <p css={tw`text-lg`}>{language} Validator</p>
        </div>
        <div
          css={tw`p-4 m-2 md:mx-6 lg:mx-12 bg-white/20 backdrop-blur-sm drop-shadow-lg rounded-lg`}
        >
          <div css={tw`flex flex-col md:flex-row flex-grow flex-shrink h-full`}>
            <div
              css={css`
                height: calc(100vh - 18.5em);
                ${tw`md:w-1/2 p-4 pt-1 md:pr-2 md:[max-width:50vw]`}
              `}
            >
              <TextBox
                title={`${language} Config`}
                code={config}
                editor={setConfig}
                language={lang}
              />
            </div>
            <div
              css={css`
                height: calc(100vh - 18.5em);
                ${tw`w-full md:w-1/2 p-4 md:pl-2 pt-1 flex flex-col md:[max-width:50vw]`}
              `}
            >
                {jsonDump ? (
                    <div css={tw`flex flex-col h-full w-full pt-1`}>
                        <div css={tw`flex flex-row md:pl-2`}>
                            <p css={tw`text-xl font-semibold mx-auto mb-2`}>
                                JSON Object Dump
                            </p>
                            <div css={tw`flex flex-row h-8`}>
                                <div
                                    css={tw`py-1 px-2 bg-green-400 rounded-md hover:cursor-pointer`}
                                    onClick={() => {
                                        router.query.data =
                                            Buffer.from(config).toString("base64");
                                        router.push(router);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faLink} size="1x" />
                                </div>
                            </div>
                        </div>
                        <div
                            css={css`
                    ${tw`rounded-md overflow-auto h-full`} background-color: #2a2734
                  `}
                        >
                            <div css={tw`py-2 px-4 text-base`}>
                                {!(error || !parsedConfig) ? (
                                    <JsonView
                                        src={parsedConfig}
                                        theme={{
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
                                        }}
                                    />
                                ) : (
                                    <span
                                        css={css`
                          ${tw`text-base whitespace-pre`}
                          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
                        `}
                                    >
                        {error}
                      </span>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div css={tw`flex flex-col h-full w-full pt-1`}>
                        <div css={tw`flex flex-row md:pl-2`}>
                            <p css={tw`text-xl font-semibold mx-auto mb-2`}>
                                Validator Output
                            </p>
                            <div css={tw`flex flex-row h-8`}>
                                <div
                                    css={tw`py-1 px-2 bg-green-400 rounded-md hover:cursor-pointer`}
                                    onClick={() => {
                                        router.query.data =
                                            Buffer.from(config).toString("base64");
                                        router.push(router);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faLink} size="1x" />
                                </div>
                            </div>
                        </div>
                        <div css={css`${tw`rounded-md overflow-auto h-full`} background-color: #2a2734`}>
                            <div css={tw`py-2 px-4 text-base`}>
                                <Editor
                                    value={error || "Looks good!"}
                                    onValueChange={setError}
                                    highlight={(v) => highlight(v, language)}
                                    css={css`
                                        ${tw`h-full`}
                                                      min-width: fit-content;
                                        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco,
                                          Consolas, "Liberation Mono", "Courier New", monospace;

                                        > pre {
                                          ${tw`h-full w-full`}
                                        }

                                        > pre > pre {
                                          ${tw`h-full w-full`}
                                        }

                                        > textarea {
                                          z-index: 1;
                                          caret-color: whitesmoke;
                                          ${tw`hover:outline-none focus:outline-none h-full`}
                                        }
                                      `}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Validator;
