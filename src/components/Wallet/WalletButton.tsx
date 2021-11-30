import { Button, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useWallet } from "use-wallet";

const WalletButton = () => {
	const wallet = useWallet();
	const toast = useToast();

	useEffect(() => {
		wallet.connect("injected");
	}, []);

	useEffect(() => {
		if (!wallet.error) {
			return;
		}
		if (wallet.error.name === "ChainUnsupportedError") {
			toast({
				position: "top",
				title: "Wrong Network",
				description: "Please switch to Binance Smart Chain(BSC)",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		} else if (wallet.error.name === "ConnectorUnsupportedError") {
			toast({
				position: "top",
				title: "Wallet Connect Error",
				description: "Unsupported connector",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		} else if (wallet.error.name === "ConnectionRejectedError") {
			toast({
				position: "top",
				title: "Wallet Connect Error",
				description: "The activation has been rejected by the provider.",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		} else {
			toast({
				position: "top",
				title: "Wallet Connect Error",
				description: "Unknown Error",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
	}, [toast, wallet.error]);

	const formattedAccount = (address: string) => {
		if (!address || address.length < 5) {
			return "";
		}
		const prefix = address.substr(0, 4);
		const suffix = address.substr(-4);

		return `${prefix}...${suffix}`;
	};

	return (
		<>
			{wallet.status === "connected" ? (
				<Button
					onClick={() => {
						wallet.reset();
					}}
				>
					{formattedAccount(wallet.account)}
				</Button>
			) : (
				<Button
					isLoading={wallet.status === "connecting"}
					onClick={() => {
						wallet.connect();
					}}
				>
					Connect Wallet
				</Button>
			)}
		</>
	);
};

export default WalletButton;
