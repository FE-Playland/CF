import { Container } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { PoolDetail } from "../../components/PoolDetail";
import { TokenChecker } from "../../components/TokenChecker";
import Pools from "../Pools";

const Main = () => {
	return (
		<Container maxW={850} centerContent>
			<Route path="/" exact component={Pools} />
			<Route path="/pool/:poolName" component={PoolDetail} />
			<Route path="/gao/checker" component={TokenChecker} />
		</Container>
	);
};

export default Main;
