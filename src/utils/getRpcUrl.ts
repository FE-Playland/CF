import sample from "lodash/sample";

// 10+ nodes balanced, US/EU
const REACT_APP_NODE_1 = "https://bsc-dataseed1.ninicoin.io";

// 10+ nodes balanced, US/EU
const REACT_APP_NODE_2 = "https://bsc-dataseed1.defibit.io";

// 10+ nodes balanced in each region, global
const REACT_APP_NODE_3 = "https://bsc-dataseed.binance.org";

// Array of available nodes to connect to
export const nodes = [REACT_APP_NODE_1, REACT_APP_NODE_2, REACT_APP_NODE_3];

const getNodeUrl = () => {
	return sample(nodes);
};

export default getNodeUrl;
