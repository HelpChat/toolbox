import Head from "next/head";
import tw, { css } from "twin.macro";
import { TextBox } from "./TextBox";
import { useEffect, useState } from "react";
import { ConversionError } from "../converters/converter";

const Converter = ({
  inputConfigs,
  outputConfigs,
  title,
  description,
  parser,
}: {
  inputConfigs: Record<
    string,
    {
      language: string;
      name: string;
    }
  >;
  outputConfigs: Record<
    string,
    {
      name: string;
    }
  >;
  title: string;
  description: string;
  parser: (
    input: Record<string, string>
  ) => ConversionError | { error: false; data: Record<string, string> };
}) => {
  const [configs, setConfigs] = useState<Record<string, string>>(
    Object.assign(
      Object.keys(inputConfigs).map((key) => ({
        [key]: "",
      }))
    )
  );
  const [parsedConfigs, setParsedConfigs] = useState<
    undefined | Record<string, string>
  >({});
  const [error, setError] = useState<false | string>(false);

  useEffect(() => {
    const parsed = parser(configs);
    if (parsed.error) {
      setError(parsed.message);
      setParsedConfigs(undefined);
    } else {
      setError(false);
      setParsedConfigs(parsed.data);
    }
  }, [configs]);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <main
        css={css`
          ${tw`flex flex-col md:min-height[calc(100vh - 3.5rem)]`}
        `}
      >
        <div css={tw`w-full md:px-8 p-16 h-48 text-center`}>
          <p css={tw`text-3xl font-bold`}>HelpChat</p>
          <p css={tw`text-lg`}>{title}</p>
        </div>
        <div
          css={tw`p-4 m-2 md:mx-6 lg:mx-12 bg-white/20 backdrop-blur-sm drop-shadow-lg rounded-lg`}
        >
          <div css={tw`flex flex-col md:flex-row flex-grow flex-shrink h-full`}>
            <div
              css={css`
                height: calc(100vh - 18.5em);
                ${tw`md:w-1/2 p-4 pt-1 md:pr-2 md:max-width[50vw] flex flex-col`}
              `}
            >
              {Object.keys(inputConfigs).map((key) => {
                const config = inputConfigs[key];
                return (
                  <div
                    key={key}
                    css={css`
                      ${tw`h-full`};
                      @media (min-width: 768px) {
                        height: ${Math.floor(
                          100 / Object.keys(inputConfigs).length
                        )}%;
                      }
                    `}
                  >
                    <TextBox
                      title={config.name}
                      language={config.language}
                      code={configs ? configs[key] ?? "" : ""}
                      editor={(config: string) => {
                        setConfigs({
                          ...configs,
                          [key]: config,
                        });
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div
              css={css`
                height: calc(100vh - 18.5em);
                ${tw`md:w-1/2 p-4 pt-1 md:pr-2 md:max-width[50vw] flex flex-col`}
              `}
            >
              {error || !parsedConfigs ? (
                <div css={tw`flex flex-col h-full w-full pt-1`}>
                  <div css={tw`flex flex-row md:pl-2`}>
                    <p css={tw`text-xl font-semibold mx-auto mb-2`}>
                      Validation Errors
                    </p>
                  </div>
                  <div
                    css={css`
                      ${tw`rounded-md overflow-auto h-full`} background-color: #2a2734
                    `}
                  >
                    <div css={tw`py-2 px-4 text-base`}>
                      <span
                        css={css`
                          ${tw`text-base whitespace-pre`}
                          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
                        `}
                      >
                        {error}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                Object.keys(outputConfigs).map((key) => {
                  const config = outputConfigs[key];
                  return (
                    <div
                      key={key}
                      css={css`
                        ${tw`h-full`};
                        @media (min-width: 768px) {
                          height: ${Math.floor(
                            100 / Object.keys(outputConfigs).length
                          )}%;
                        }
                      `}
                    >
                      <TextBox
                        key={config.name}
                        title={config.name}
                        language={"yaml"}
                        code={parsedConfigs ? parsedConfigs[key] ?? "" : ""}
                      />
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Converter;
