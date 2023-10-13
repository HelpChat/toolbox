import {NextPage} from "next";
import Head from "next/head";
import tw, {css} from "twin.macro";
import {useState} from "react";

const UUIDConverter: NextPage = () => {
    const [input, setInput] = useState("");
    return (
        <div>
            <Head>
                <title>UUID Converter</title>
                <meta name="description" content={`Convert UUIDs`}/>
            </Head>

            <main
                css={css`
                  ${tw`flex flex-col min-height[calc(100vh - 3.5rem)] flex-col`}
                `}
            >
                <div css={tw`w-full md:px-8 p-16 h-48 text-center`}>
                    <p css={tw`text-3xl font-bold`}>HelpChat</p>
                    <p css={tw`text-lg`}>UUID Converter</p>
                </div>
                <div>
                    <textarea css={css`
                      transition: width 0.3s, height 0.3s;
                      ${tw`text-black width[50vw]`}
                      ${input.length > 36 ? tw`width[50vw] h-full` : tw`w-full h-6`}
                    `} value={input} onChange={(v) => setInput(v.target.value)}/>
                </div>
            </main>
        </div>
    );
};

async function getUserData(id: string): Promise<({ error: string } | {
    id: string;
    name: string;
    properties?: ({
        name: string;
        value: string;
        signature: string;
    })[];
})> {
    const data = await fetch(`https://crafthead.net/profile/${id}`)
    if (data.ok || data.status === 404) {
        return data.json()
    } else {
        return {
            error: "Failed to fetch user data"
        }
    }
}

export default UUIDConverter;
