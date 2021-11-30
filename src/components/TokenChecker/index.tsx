import { Input } from "@chakra-ui/input";
import { Box, Button } from "@chakra-ui/react";
import Web3 from "web3";
import React from "react";

import "./style.css";

interface ITokenChecker {}

export const TokenChecker: React.FunctionComponent<ITokenChecker> = (props) => {
	const [lpContract, setLpContract] = React.useState<string>("");
	const [price, setPrice] = React.useState<number>(0);
	const [date, setDate] = React.useState<string>("");
	return (
		<Box>
			<Input
				placeholder="token lp contract"
				value={lpContract}
				onChange={(e) => setLpContract(e.target.value)}
			></Input>

			<Button
				onClick={() => {
					// initial web3
					const MAINNET_URL = "https://exchainrpc.okex.org/";
					const web3 = new Web3(new Web3.providers.HttpProvider(MAINNET_URL));

					const CHERRY_LP_CONTRACT_ADDRESS = lpContract;
					const lp_abi = [
						{
							constant: true,
							inputs: [],
							name: "getReserves",
							outputs: [
								{ internalType: "uint112", name: "_reserve0", type: "uint112" },
								{ internalType: "uint112", name: "_reserve1", type: "uint112" },
								{
									internalType: "uint32",
									name: "_blockTimestampLast",
									type: "uint32",
								},
							],
							payable: false,
							stateMutability: "view",
							type: "function",
						},
					];
					const cherry_lp = new web3.eth.Contract(
						lp_abi as any,
						CHERRY_LP_CONTRACT_ADDRESS
					);
					const run = () => {
						cherry_lp.methods
							.getReserves()
							.call()
							.then((rev) => {
								const price = rev[0] / rev[1];
								const date = new Date();
								console.log(`[${date.toLocaleTimeString()}] CHERRY : ${price}`);
								setPrice(price);
								setDate(date.toLocaleTimeString());
							});
					};

					setInterval(run, 1000 * 1);
				}}
			>
				Set LP Contract
			</Button>
			<Box className="pooldetail-header-title">$ {price.toFixed(8)}</Box>
			<Box className="pooldetail-header-title">{date}</Box>
		</Box>
	);
};
