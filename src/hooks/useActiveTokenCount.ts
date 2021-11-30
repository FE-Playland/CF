import { useEffect, useState } from "react";
import { BigNumber } from "bignumber.js";
import { BIG_ZERO } from "../utils/bg";
import useActiveWeb3React from "./useActiveWeb3React";
import { ERC20Token } from "../models/erc20";

export const useActiveTokenCount = (token: ERC20Token) => {
	const [tokenCount, setTokenCount] = useState<BigNumber>(BIG_ZERO);
	const { account, chainId } = useActiveWeb3React();

	useEffect(() => {
		if (!account || !chainId) return;
		token.tokenCountOf(account).then((res) => {
			setTokenCount(res);
		});
	}, [account, chainId, token]);

	return { tokenCount };
};
