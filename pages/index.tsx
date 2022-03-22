import Head from "next/head";
import tw, {css} from "twin.macro";

function Home() {
    return (<div>
        <Head>
            <title>HelpChat Tools</title>
            <meta name="description" content="HelpChat Tools"/>
        </Head>

        <main css={css`${tw`flex flex-col`} height: calc(100vh - 3.5rem)`}>
            <div css={tw`text-white bg-blue-500 w-full md:px-8 p-16 h-48 text-center`}>
                <p css={tw`text-3xl font-bold`}>HelpChat</p>
                <p css={tw`text-lg`}>Home</p>
            </div>
        </main>
    </div>);
}

export default Home;
