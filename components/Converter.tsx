import Head from "next/head";
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

      <main className="flex flex-col [min-height:calc(100vh - 3.5rem)]">
        <div className="w-full md:px-8 p-16 h-48 text-center">
          <p className="text-3xl font-bold">HelpChat</p>
          <p className="text-lg">{title}</p>
        </div>
        <div className="p-4 m-2 md:mx-6 lg:mx-12 bg-white/20 backdrop-blur-sm drop-shadow-lg rounded-lg">
          <div className="flex flex-col md:flex-row flex-grow flex-shrink h-full">
            <div
              style={{
                height: "calc(100vh - 18.5em)",
              }}
              className="md:w-1/2 p-4 pt-1 md:pr-2 md:max-w-[50vw] flex flex-col"
            >
              {Object.keys(inputConfigs).map((key) => {
                const config = inputConfigs[key];
                return (
                  <div
                    key={key}
                    style={{
                      height: "100%",
                    }}
                    className="h-full md:h-[calc(100%/4)]" // TODO fix?
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
              style={{
                height: "calc(100vh - 18.5em)",
              }}
              className="md:w-1/2 p-4 pt-1 md:pr-2 md:max-w-[50vw] flex flex-col"
            >
              {error || !parsedConfigs ? (
                <div className="flex flex-col h-full w-full pt-1">
                  <div className="flex flex-row md:pl-2">
                    <p className="text-xl font-semibold mx-auto mb-2">
                      Validation Errors
                    </p>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#2a2734",
                    }}
                    className="rounded-md overflow-auto h-full"
                  >
                    <div className="py-2 px-4 text-base">
                      <span
                        style={{
                          fontFamily:
                            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                        }}
                        className="text-base whitespace-pre"
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
                      style={{
                        height: "100%",
                      }}
                      className="h-full md:h-[calc(100% div object-keys-length)]" // TODO fix?
                    >
                      <TextBox
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
