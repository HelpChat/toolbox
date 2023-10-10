import tw, { css } from "twin.macro";
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

const textBoxStyle = tw`flex-grow flex-shrink border-none outline-none focus:outline-none max-h-full`;

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
      <div css={tw`flex flex-col h-full w-full pt-1 text-white`}>
        <div css={tw`flex flex-row pl-8`}>
          <p css={tw`text-xl font-semibold mx-auto mb-2`}>{title}</p>
          <div css={tw`flex flex-row h-8 w-8`}>
            <div
              css={tw`py-1 px-2 bg-green-400 rounded-md hover:cursor-pointer`}
              onClick={() => {
                navigator.clipboard.writeText(code);
              }}
            >
              <FontAwesomeIcon icon={faCopy} size="1x" />
            </div>
          </div>
        </div>
        <div
          css={css`
            ${tw`rounded-md overflow-auto h-full`} background-color: #2a2734
          `}
        >
          <div css={tw` py-2 px-4`}>{highlight(code, language)}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div css={tw`flex flex-col h-full w-full pt-1 text-white`}>
        <p css={tw`text-xl font-semibold mx-auto mb-2`}>{title}</p>
        <div
          css={css`
            ${tw`rounded-md overflow-auto h-full flex flex-col`} background-color: #2a2734
          `}
        >
          <div css={tw`py-2 px-4 flex-grow flex-shrink`}>
            <Editor
              value={code}
              onValueChange={editor}
              highlight={(v) => highlight(v, language)}
              css={css`
                ${textBoxStyle}
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
    );
  }
};

export function highlight(code: string, language: string) {
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
