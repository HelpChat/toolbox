import tw, {css} from "twin.macro";
import Highlight, {defaultProps} from "prism-react-renderer";
import {Dispatch, SetStateAction} from "react";
import Editor from 'react-simple-code-editor'
import {faCopy} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const textBoxStyle = tw`flex-grow flex-shrink p-2 rounded-md border-none outline-none focus:outline-none overflow-x-auto`;

export const TextBox = ({
                            title,
                            code,
                            editor
                        }: { title: string, code: string, editor?: Dispatch<SetStateAction<string>> }) => {
    if (!editor) {
        return (
            <div css={tw`flex flex-col h-full w-full pt-1`}>
                <div css={tw`flex flex-row pl-2`}>
                    <p css={tw`text-xl font-semibold mx-auto mb-2`}>{title}</p>
                    <div css={tw`flex flex-row h-8`}>
                        <div css={tw`py-1 px-2 bg-green-400 rounded-md hover:cursor-pointer`} onClick={() => {
                            navigator.clipboard.writeText(code);
                        }}>
                            <FontAwesomeIcon icon={faCopy} size="1x"/>
                        </div>
                    </div>
                </div>
                {highlight(code)}
            </div>
        );
    } else {
        return (
            <div css={tw`flex flex-col h-full w-full pt-1`}>
                <p css={tw`text-xl font-semibold mx-auto mb-2`}>{title}</p>
                <Editor
                    value={code}
                    onValueChange={editor}
                    highlight={highlight}
                    css={css`
                      ${textBoxStyle}
                      > pre {
                        ${tw`h-full`}
                      }

                      > pre > pre {
                        ${tw`h-full`}
                      }
                    `}
                />
            </div>
        );
    }
}

function highlight(code: string) {
    return (<Highlight {...defaultProps} code={code} language="yaml">
        {({className, style, tokens, getLineProps, getTokenProps}) => (
            <pre className={className} style={style} css={textBoxStyle}>
                {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({line, key: i})}>
                        {line.map((token, key) => (
                            <span key={key} {...getTokenProps({token, key})} />
                        ))}
                    </div>
                ))}
            </pre>
        )}
    </Highlight>)
}
