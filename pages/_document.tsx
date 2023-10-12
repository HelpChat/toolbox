import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.ico" />
          <meta
            property="og:image"
            content="https://helpch.at/includes/img/HC.png"
          />
          <meta name="theme-color" content="#40a1d5" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <footer />
      </Html>
    );
  }
}
