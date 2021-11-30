import * as React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Layout from "./Layout";
import { BrowserRouter } from "react-router-dom";
import { UseWalletProvider } from "use-wallet";

const theme = extendTheme({
	components: { Button: { baseStyle: { _focus: { boxShadow: "none" } } } },
	fonts: {
		body: "Gill Sans",
	},
});

export const App = () => (
	<BrowserRouter>
		<UseWalletProvider chainId={56}>
			<ChakraProvider theme={theme}>
				<Layout />
			</ChakraProvider>
		</UseWalletProvider>
	</BrowserRouter>
);
