import { useEffect, useState } from "react";
import { BigNumber } from "bignumber.js";
import { BIG_TEN, BIG_ZERO } from "../utils/bg";
import useActiveWeb3React from "./useActiveWeb3React";
import { Vault } from "../models/vault";

export const useActiveDeposit = (vault: Vault) => {
	const { account, chainId } = useActiveWeb3React();
	const [userDeposit, setUserDeposit] = useState<number>(0);
	const [userBalance, setUserBanalce] = useState<BigNumber>(BIG_ZERO);

	useEffect(() => {
		if (!account || !chainId) return;
		Promise.all([vault.fetchUserDepositeOf(account), vault.fetchPrice()]).then(
			(res) => {
				const balance = res[0].dividedBy(BIG_TEN.pow(18));
				const price = res[1];

				setUserDeposit(res[0].dividedBy(10 ** 18).toNumber());
				setUserBanalce(balance.multipliedBy(price!));
			}
		);
	}, [account, chainId, setUserBanalce, vault]);

	return { userDeposit, userBalance };
};
