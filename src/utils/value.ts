import { BigNumber } from "bignumber.js";
import { bignumberToBN } from "./bg";
import { getPancakeLp } from "./web3";

export const getTokenValueUseUSD = async (UsdLpAddress: string, lib: any) => {
	const pair = getPancakeLp(lib, UsdLpAddress);
	const reserves = await pair.getReserves();
	return bignumberToBN(reserves[1]).div(bignumberToBN(reserves[0]));
};

export const getTokenValueUseBNB = async (BNBLpAddress: string, lib: any) => {
	const tokenToBNB = getPancakeLp(lib, BNBLpAddress);
	const busdToBNB = getPancakeLp(
		lib,
		"0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16"
	);
	const rev1 = await tokenToBNB.getReserves();
	const rev2 = await busdToBNB.getReserves();
	const x = bignumberToBN(rev1[1]).div(bignumberToBN(rev1[0]));
	const y = bignumberToBN(rev2[1]).div(bignumberToBN(rev2[0]));
	return x.multipliedBy(y);
};

export const getBNBValue = async (lib: any) => {
	return getTokenValueUseUSD("0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16", lib);
};

// https://ethfans.org/posts/a-safe-way-to-get-the-prices-of-lp-tokens
export const getLpTokenPrice = async (
	lpAddress: string,
	lib: any,
	price0: BigNumber,
	price1: BigNumber
) => {
	const lpToken = getPancakeLp(lib, lpAddress);
	let [r0, r1] = (await lpToken.getReserves()).map((n) => bignumberToBN(n));
	let totalSupply = bignumberToBN(await lpToken.totalSupply());
	return r0
		.multipliedBy(price0)
		.plus(r1.multipliedBy(price1))
		.dividedBy(totalSupply);
};
