import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useMemo, useState } from "react";
import { getGuaStrategyWithSigner } from "../utils/web3";
import useHandleTransactionReceipt from "./useHandleTransactionReceipt";
import useRefCallback from "./useRefCallback";

export enum WriteStatus {
	UNKNOWN,
	PENDING,
	SUCCESS,
}
export const useHarvest = (strategyAddress: string) => {
	const { library } = useWeb3React();

	const [status, setStatus] = useState<WriteStatus>(WriteStatus.UNKNOWN);
	const handle = useHandleTransactionReceipt();

	const strategy = useMemo(() => {
		if (!library) {
			return null;
		}
		const provider = new ethers.providers.Web3Provider(library);
		return getGuaStrategyWithSigner(provider, strategyAddress);
	}, [library, strategyAddress]);

	const harvest = useRefCallback(async () => {
		setStatus(WriteStatus.PENDING);
		if (strategy === null) {
			setStatus(WriteStatus.UNKNOWN);
			Promise.reject(new Error("strategy is unknown"));
			return;
		}
		const abountGas = await strategy.estimateGas.harvest();
		return handle(
			strategy.harvest({ gasLimit: Math.round(abountGas.toNumber() * 1.3) })
		)
			.then(() => {
				setStatus(WriteStatus.SUCCESS);
			})
			.then(() => {
				setStatus(WriteStatus.UNKNOWN);
			});
	});

	return { status, harvest };
};
