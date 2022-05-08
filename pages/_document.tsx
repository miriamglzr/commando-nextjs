import Document, {
	DocumentContext,
	Html,
	DocumentInitialProps,
	Head,
	Main,
	NextScript,
} from "next/document";
import { ServerStyleSheet } from "styled-components";
import Script from "next/script";

export default class MyDocument extends Document {
	static async getInitialProps(
		ctx: DocumentContext
	): Promise<DocumentInitialProps> {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						sheet.collectStyles(<App {...props} />),
				});

			const initialProps = await Document.getInitialProps(ctx);
			return {
				...initialProps,
				styles: [
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>,
				],
			};
		} finally {
			sheet.seal();
		}
	}
	render() {
		return (
			<Html lang="en">
				<Head>
					<meta name="description" content="Generated by create next app" />
					<link rel="icon" href="/mando.svg" />
					<link
						rel="stylesheet"
						href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"
					/>
					{/* <!--GOOGLE FONTS for Inter--> */}
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin=""
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@700&family=Inter:wght@100;200;300;400;500;700&display=swap"
						rel="stylesheet"
					/>
					{/* <!-- BOOTSTRAP--> */}
					<link
						rel="stylesheet"
						href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
						integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
						// crossorigin="anonymous"
					/>
					{/*<!-- FONT AWESOME --> */}
					<Script
						src="https://kit.fontawesome.com/856c5d3b66.js"
						//crossorigin="anonymous"
					></Script>
					{/* <meta
					  name="viewport"
					  content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1"
				  /> */}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
