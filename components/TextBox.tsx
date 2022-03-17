import tw, {css} from "twin.macro";
import Highlight, {defaultProps} from "prism-react-renderer";
import {Dispatch, SetStateAction} from "react";
import Editor from 'react-simple-code-editor'

const textBoxStyle = tw`flex-grow flex-shrink p-2 rounded-md border-none outline-none focus:outline-none`;

export const TextBox = ({
                            title,
                            code,
                            editor
                        }: { title: string, code: string, editor?: Dispatch<SetStateAction<string>> }) => {
    if (!editor) {
        return (
            <div css={tw`flex flex-col h-full w-full pt-1`}>
                <p css={tw`text-xl font-semibold mx-auto mb-2`}>{title}</p>
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
                    <div {...getLineProps({line, key: i})}>
                        {line.map((token, key) => (
                            <span {...getTokenProps({token, key})} />
                        ))}
                    </div>
                ))}
            </pre>
        )}
    </Highlight>)
}
