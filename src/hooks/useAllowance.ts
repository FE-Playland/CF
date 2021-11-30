import { useCallback, useEffect, useState } from "react";

import { BigNumber } from "ethers";
import { Erc20 } from "../contracts";
import { useWeb3React } from "@web3-react/core";
import { BIG_ZERO } from "../utils/bg";

const useAllowance = (
	token: Erc20,
	spender: string,
	pendingApproval?: boolean
) => {
	const [allowance, setAllowance] = useState<BigNumber | null>(null);
	const { account } = useWeb3React();

	const fetchAllowance = useCallback(async () => {
		const allowance = await token.allowance(account!!, spender);
		console.log(
			`Allowance: ${allowance.toString()} ${token.address} for ${spender}`
		);
		setAllowance(allowance);
	}, [account, spender, token]);

	useEffect(() => {
		if (account && spender && token) {
			fetchAllowance().catch((err) => {
				console.log(`Failed to fetch allowance: ${err.stack}`);
			});
		}
	}, [account, spender, token.address, pendingApproval, token, fetchAllowance]);

	return allowance;
};

export default useAllowance;
