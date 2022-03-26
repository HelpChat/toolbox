import Head from "next/head";
import tw, { css } from "twin.macro";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { ToolboxTool, Tools } from "../components/nav";

function Home() {
  return (
    <div>
      <Head>
        <title>HelpChat ToolBox</title>
        <meta name="description" content="A collection of tools and solutions you might find useful for you and your server." />
      </Head>
      <main
        css={css`
          ${tw`flex flex-col md:height[calc(100vh - 3.5rem)]`}
        `}
      >
        <div css={tw`text-white w-full md:px-8 p-16 h-64 text-center`}>
          <p css={tw`text-lg text-brightblue`}>Introducing the all new</p>
          <br></br>
          <p css={tw`text-5xl font-bold`}>HelpChat ToolBox</p>
          <br></br><br></br>
          <p css={tw`text-base text-lightgray`}>A collection of tools and solutions you might find useful<br></br> for you and your server.</p>
        </div>
        <div
          css={css`
            ${tw`h-full flex-grow flex-shrink`}
          `}
        >
          <div
            css={css`
              ${tw`block mx-auto w-max mt-8`}
            `}
          >
            <div
              css={tw`bg-white/10 backdrop-blur-sm drop-shadow-lg rounded-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6 sm:p-8 md:p-6 md:px-6 w-full`}
            >
              {(() => {
                const tools: JSX.Element[] = [];
                Object.keys(Tools).forEach((key) => {
                  if (Array.isArray(Tools[key])) {
                    tools.push(...toolsToCard(Tools[key] as ToolboxTool[]));
                  } else {
                    Object.keys(Tools[key]).forEach((key2) => {
                      tools.push(
                        ...toolsToCard(
                          (Tools[key] as Record<string, ToolboxTool[]>)[key2]
                        )
                      );
                    });
                  }
                });
                return tools;
              })()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function toolsToCard(tools: ToolboxTool[]) {
  return tools.map((tool) => (
    <ToolboxCard
      key={tool.short}
      name={tool.name}
      icon={tool.icon}
      description={tool.description}
      link={tool.link}
    />
  ));
}

function ToolboxCard({
  name,
  icon,
  description,
  link,
}: {
  name: string;
  icon: IconProp;
  description: string;
  link: string;
}) {
  return (
    <Link href={link} passHref>
      <div
        css={tw`p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white hover:cursor-pointer width[15rem] h-48 block grid grid-cols-1 place-items-center mix-blend-multiply`}
      >
        <FontAwesomeIcon icon={icon} size={"3x"} />
        <p css={tw`font-bold text-lg margin-bottom[-1rem]`}>{name}</p>
        <p css={tw`text-center text-sm margin-top[-0.5rem]`}>{description}</p>
      </div>
    </Link>
  );
}

export default Home;
