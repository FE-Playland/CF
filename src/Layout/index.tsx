import React from "react";
import TopBar from "./TopBar";
import Footer from "./Footer";
import { Flex } from "@chakra-ui/react";
import Main from "./Container";
import { BrowserRouter as Router, Route } from "react-router-dom";

const Layout = () => {
	return (
		<Router>
			<Flex
				direction="column"
				align="center"
				m="0 auto"
				maxW={[
					"auto", // 0-30em
					"auto", // 30em-48em
					"auto", // 48em-62em
					"1200px", // 62em+
				]}
			>
				<TopBar />
				{/* <Route path="/" exact component={Main} /> */}
				<Main />
				<Footer />
			</Flex>
		</Router>
	);
};

export default Layout;
