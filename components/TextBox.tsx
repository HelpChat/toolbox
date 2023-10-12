import Highlight, { defaultProps, Language } from "prism-react-renderer";
import Prism from "prismjs";
import { Dispatch, SetStateAction } from "react";
import Editor from "react-simple-code-editor";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-toml";
import "prismjs/components/prism-properties";
import "prismjs/components/prism-json";
import "prismjs/components/prism-xml-doc";

const textBoxStyle =
  "flex-grow flex-shrink border-none outline-none focus:outline-none max-h-full";

export const TextBox = ({
  title,
  code,
  editor,
  language,
}: {
  title: string;
  code: string;
  editor?: Dispatch<SetStateAction<string>> | ((config: string) => void);
  language: string;
}) => {
  if (!editor) {
    return (
      <div className="flex flex-col h-full w-full pt-1 text-white">
        <div className="flex flex-row pl-8">
          <p className="text-xl font-semibold mx-auto mb-2">{title}</p>
          <div className="flex flex-row h-8 w-8">
            <div
              className="py-1 px-2 bg-green-400 rounded-md hover:cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(code);
              }}
            >
              <FontAwesomeIcon icon={faCopy} size="1x" />
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#2a2734",
          }}
          className="rounded-md overflow-auto h-full"
        >
          <div className="py-2 px-4">{highlight(code, language)}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col h-full w-full pt-1 text-white">
        <p className="text-xl font-semibold mx-auto mb-2">{title}</p>
        <div
          style={{
            backgroundColor: "#2a2734",
          }}
          className="rounded-md overflow-auto h-full flex flex-col"
        >
          <div className="py-2 px-4 flex-grow flex-shrink">
            <Editor
              value={code}
              onValueChange={editor}
              highlight={(v) => highlight(v, language)}
              className={`h-full ${textBoxStyle}`}
              style={{
                fontFamily:
                  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              }}
            >
              <pre className="h-full w-full">
                <pre className="h-full w-full">
                  <textarea
                    style={{
                      zIndex: 1,
                      caretColor: "whitesmoke",
                    }}
                    className="hover:outline-none focus:outline-none h-full"
                  />
                </pre>
              </pre>
            </Editor>
          </div>
        </div>
      </div>
    );
  }
};

function highlight(code: string, language: string) {
  return (
    <Highlight
      {...defaultProps}
      Prism={Prism as any}
      code={code}
      language={language as Language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style} css={textBoxStyle}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
