import { useWeb3React } from "@web3-react/core";
import { BigNumberish, ethers } from "ethers";
import { useMemo, useState } from "react";
import { getGuaVaultWithSigner } from "../utils/web3";
import useHandleTransactionReceipt from "./useHandleTransactionReceipt";
import useRefCallback from "./useRefCallback";

export enum WriteStatus {
	UNKNOWN,
	PENDING,
	SUCCESS,
}

export const useDeposit = (vaultAddress: string) => {
	const { library } = useWeb3React();
	const [status, setStatus] = useState(WriteStatus.UNKNOWN);

	const handle = useHandleTransactionReceipt();

	const vault = useMemo(() => {
		if (!library) {
			return null;
		}
		const provider = new ethers.providers.Web3Provider(library);
		return getGuaVaultWithSigner(provider, vaultAddress);
	}, [library, vaultAddress]);

	const deposit = useRefCallback(async (amount: BigNumberish) => {
		if (!vault) {
			return;
		}
		setStatus(WriteStatus.UNKNOWN);
		const aboutGas = await vault.estimateGas.deposit(amount);
		return handle(
			vault.deposit(amount, {
				gasLimit: Math.round(aboutGas.toNumber() * 1.3),
			})
		)
			.then(() => {
				setStatus(WriteStatus.SUCCESS);
			})
			.then(() => {
				setStatus(WriteStatus.UNKNOWN);
			});
	});

	return { status, deposit };
};
