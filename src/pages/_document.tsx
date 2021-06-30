import Document, {Html, Head, Main, NextScript} from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="pt-BR">
                <Head>
                    <link rel="prefetch" href="https://pro.fontawesome.com/releases/v5.14.0/css/all.css" as="styles" />
                    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.14.0/css/all.css" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}