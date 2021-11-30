import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useMemo, useState } from "react";
import { getGuaVaultWithSigner } from "../utils/web3";
import useHandleTransactionReceipt from "./useHandleTransactionReceipt";
import useRefCallback from "./useRefCallback";
import { BigNumber } from "bignumber.js";
import { bignumberToBN, BIG_TEN } from "../utils/bg";

export enum WriteStatus {
	UNKNOWN,
	PENDING,
	SUCCESS,
}

export const useWithdraw = (vaultAddress: string) => {
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

	const withdraw = useRefCallback(async (amount: BigNumber) => {
		if (!vault) {
			return;
		}

		const gwei = amount.multipliedBy(BIG_TEN.pow(18));
		const [balanceBigNumber, totalBigNumber] = await Promise.all([
			vault.balance(),
			vault.totalSupply(),
		]);

		const balance = bignumberToBN(balanceBigNumber);
		const total = bignumberToBN(totalBigNumber);

		if (balance.isEqualTo(0)) {
			return;
		}

		const amountGuaVault = gwei
			.div(balance)
			.multipliedBy(total)
			.toFixed(0)
			.toString();
		const aboutGas = await vault.estimateGas.withdraw(amountGuaVault);

		return handle(
			vault.withdraw(amountGuaVault, {
				gasLimit: Math.round(aboutGas.toNumber() * 1.3),
			})
		)
			.then(() => setStatus(WriteStatus.SUCCESS))
			.then(() => setStatus(WriteStatus.UNKNOWN));
	});

	return { status, withdraw };
};
