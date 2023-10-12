import Head from "next/head";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { ToolboxTool, Tools } from "../components/nav";

function Home() {
  return (
    <div>
      <Head>
        <title>HelpChat Toolbox</title>
        <meta
          name="description"
          content="A collection of tools and solutions you might find useful for you and your server."
        />
      </Head>
      <main className="flex flex-col [min-height:calc(100vh - 3.5rem)]">
        <div className="text-white w-full md:px-8 p-16 md:h-64 text-center space-y-7">
          <p className="text-lg text-brightblue">Introducing the all new</p>
          <div className="text-white text-center space-y-12">
            <p className="text-5xl font-bold overflow-hidden">
              HelpChat Toolbox Beta™
            </p>
            <p className="text-base text-lightgray">
              A collection of tools and solutions you might find useful for you
              and your server.
            </p>
          </div>
        </div>
        <div className="h-full min-h-screen flex-grow flex-shrink">
          <div className="block mx-auto w-max mt-8 mb-8 md:mb-0">
            <div className="bg-white/10 backdrop-blur-sm drop-shadow-lg rounded-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6 sm:p-8 md:p-6 md:px-6 w-full [max-width:90vw] overflow-hidden">
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
    // eslint-disable-next-line react/jsx-key
    <ToolboxCard
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
    <Link href={link} prefetch={false} passHref>
      <div className="gap-0.5 p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white hover:cursor-pointer max-w-full break-words [min-height:12rem] w-56 grid grid-cols-1 place-items-center mix-blend-multiply">
        <FontAwesomeIcon icon={icon} size={"3x"} />
        <p className="font-bold text-lg md:text-base">{name}</p>
        <p className="text-center text-sm">{description}</p>
      </div>
    </Link>
  );
}

export default Home;
