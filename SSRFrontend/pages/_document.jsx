// _document.js
/**
 * It is important to note here that we will add Head component to every page
 * for fields such as title and description. Only the global tags go here.
 */
import {Head, Html, Main, NextScript} from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta charSet="utf-8"/>
                <link rel="icon" href="favicon.ico"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="theme-color" content="#000000"/>
                <link rel="stylesheet" href="fix.css"/>
                <link rel="stylesheet" href="App.css"/>

                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css"/>
                <link rel="stylesheet"
                      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
                    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
                    crossOrigin="anonymous"
                />

                <script src="https://unpkg.com/jquery@3.3.1/dist/jquery.js"></script>
                <link rel="stylesheet" type="text/css" href="https://unpkg.com/fomantic-ui@2.8.8/dist/semantic.min.css"/>
                    <script src="https://unpkg.com/fomantic-ui@2.8.8/dist/semantic.min.js"></script>

                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width"
                    />

                    <meta
                        name="description"
                        content="Web site created using create-react-app"
                    />
                    <link rel="apple-touch-icon" href="logo192.png"/>

                    <link rel="manifest" href="manifest.json"/>

                    <title>React App</title>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
)
}
