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
        <title>HelpChat Tools</title>
        <meta name="description" content="HelpChat Tools" />
      </Head>
      <main
        css={css`
          ${tw`flex flex-col md:height[calc(100vh - 3.5rem)]`}
        `}
      >
        <div css={tw`text-white w-full md:px-8 p-16 h-48 text-center`}>
          <p css={tw`text-3xl font-bold`}>HelpChat</p>
          <p css={tw`text-lg`}>Home</p>
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
              css={tw`bg-white/20 backdrop-blur-sm drop-shadow-lg rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6 sm:p-8 md:p-12 md:px-16 w-full`}
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
    <Link href={link}>
      <div
        css={tw`p-3 rounded-md bg-white/20 text-white hover:cursor-pointer width[13rem] h-48 block grid grid-cols-1 place-items-center`}
      >
        <FontAwesomeIcon icon={icon} size={"3x"} />
        <p css={tw`font-bold text-lg margin-bottom[-1rem]`}>{name}</p>
        <p css={tw`text-center text-sm margin-top[-0.5rem]`}>{description}</p>
      </div>
    </Link>
  );
}

export default Home;
