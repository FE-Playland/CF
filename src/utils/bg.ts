import { BigNumberish } from "ethers";
import { BigNumber as BN } from "bignumber.js";

export const BIG_ZERO = new BN(0);
export const BIG_ONE = new BN(1);
export const BIG_TWO = new BN(2);
export const BIG_THREE = new BN(3);
export const BIG_FOUR = new BN(4);
export const BIG_FIVE = new BN(5);
export const BIG_NINE = new BN(9);
export const BIG_TEN = new BN(10);
export const BIG_HUNDRED = new BN(100);

export const bignumberToBN = (bg: BigNumberish): BN => {
	return new BN(bg.toString());
};

export const bignumberToBnAsync = async (bg: Promise<BigNumberish>) => {
	return bg.then((val) => bignumberToBN(val));
};
