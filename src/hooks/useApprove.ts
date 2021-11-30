import { GuaVault } from "../contracts";
import { BigNumber } from "bignumber.js";
import { useEffect, useMemo, useState } from "react";
import useRefCallback from "./useRefCallback";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { getERC20WithSigner } from "../utils/web3";

export const useApprove = (
	address: string,
	tokenAddress: string,
	vault: GuaVault | null
) => {
	const { account, library } = useWeb3React();

	const [isApproved, setIsApproved] = useState(false);

	const token = useMemo(() => {
		if (!library) {
			return null;
		}
		const provider = new ethers.providers.Web3Provider(library);
		return getERC20WithSigner(provider, tokenAddress);
	}, [tokenAddress, library]);

	const fetch = useRefCallback(async () => {
		if (!token || !vault || !account) {
			console.error(`Contract is not defined ${token} ${vault}`);
			return;
		}
		const response = await token.allowance(account, vault.address);
		const currentAllowance = new BigNumber(response.toString());
		setIsApproved(currentAllowance.gt(0));
	});

	const approveAction = useRefCallback(async () => {
		if (!token) {
			return;
		}
		const tx = await token.approve(address, ethers.constants.MaxUint256);
		const recipt = await tx.wait();
		if (recipt.status) {
			setIsApproved(true);
		} else {
			setIsApproved(false);
		}
	});

	useEffect(() => {
		fetch();
	}, [account, fetch, token, vault]);

	return { isApproved, approveAction };
};
