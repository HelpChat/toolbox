import type {AppProps} from 'next/app'
import GlobalStyles from "../components/GlobalStyles";

function Converter({Component, pageProps}: AppProps) {
    return (
        <div>
            <GlobalStyles/>
            <Component {...pageProps} />
        </div>
    )
}

export default Converter
