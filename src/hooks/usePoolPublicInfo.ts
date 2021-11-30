import { BigNumber } from "bignumber.js";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { getPoolApr } from "../utils/apr";
import { getApy } from "../utils/apy";
import { bignumberToBN, BIG_TEN } from "../utils/bg";
import { Token } from "../utils/erc20Helper";
import { simpleRpcProvider } from "../utils/providers";
import { getTokenValueUseBNB, getTokenValueUseUSD } from "../utils/value";
import { getGuaStrategy } from "../utils/web3";

interface PoolToken {
	address: string;
	lpContract: string;
}

interface IGetPoolPublicInfoProps {
	stakeTokenInfo: PoolToken;
	earnTokenInfo: PoolToken;
	strategyAddress: string;
	stakeContract: string;
	earnTokenPerBlock: number;
	stakeTokenDecimals: number;
}

export const usePoolPublicInfo = (props: IGetPoolPublicInfoProps) => {
	const {
		stakeTokenInfo,
		earnTokenInfo,
		strategyAddress,
		stakeContract,
		earnTokenPerBlock,
		stakeTokenDecimals,
	} = props;

	const [priceInBUSD, setPriceInBUSD] = useState(new BigNumber(0));
	const [apr, setApr] = useState(0);
	const [apy, setApy] = useState(0);
	const [tvl, setTvl] = useState(new BigNumber(0));

	const fetch = useCallback(async () => {
		const token = new Token(stakeTokenInfo.address);
		const stakeTokenPrice = await getTokenValueUseUSD(
			stakeTokenInfo.lpContract,
			simpleRpcProvider
		);
		const stakeTokenPriceNumber = stakeTokenPrice.toNumber();

		let earnTokenPriceNumber: number;
		if (
			stakeTokenInfo.address === earnTokenInfo.address &&
			stakeTokenInfo.lpContract === earnTokenInfo.lpContract
		) {
			earnTokenPriceNumber = stakeTokenPriceNumber;
		} else {
			const earnTokenPrice = await getTokenValueUseBNB(
				earnTokenInfo.lpContract,
				simpleRpcProvider
			);
			console.log(earnTokenPrice);

			earnTokenPriceNumber = earnTokenPrice.toNumber();
		}

		const strategy = getGuaStrategy(
			simpleRpcProvider as ethers.providers.Web3Provider,
			strategyAddress
		);
		const totalStackingDeposit = await token.getBalanceNumber(stakeContract);
		const totalDeposit = await strategy.balanceOf();

		const totalDepositCount = bignumberToBN(totalDeposit).div(
			BIG_TEN.pow(stakeTokenDecimals)
		);

		const tvl = totalDepositCount.multipliedBy(stakeTokenPrice);
		const apr =
			getPoolApr(
				stakeTokenPriceNumber,
				earnTokenPriceNumber,
				totalStackingDeposit,
				earnTokenPerBlock
			) ?? 0;

		const apy = getApy(apr, stakeTokenPriceNumber);

		setPriceInBUSD(stakeTokenPrice);
		setApr(apr);
		setApy(apy);
		setTvl(tvl);
	}, [
		earnTokenInfo.address,
		earnTokenInfo.lpContract,
		earnTokenPerBlock,
		stakeContract,
		stakeTokenDecimals,
		stakeTokenInfo.address,
		stakeTokenInfo.lpContract,
		strategyAddress,
	]);

	useEffect(() => {
		fetch();
	}, [fetch]);

	return {
		priceInBUSD,
		apr,
		apy,
		tvl,
	};
};
