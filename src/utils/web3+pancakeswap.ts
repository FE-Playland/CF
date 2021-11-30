import { ethers, providers } from "ethers";
import { PancakeSyrupPool__factory } from "../contracts";
import { PancakeCakePool__factory } from "../contracts/factories/PancakeCakePool__factory";

// cake 单币池
export const getCakeStakingPool = (
	provider: ethers.providers.Provider,
	address: string
) => {
	return PancakeCakePool__factory.connect(address, provider);
};

// cake 糖浆池
export const getCakeSyrupPool = (
	provider: ethers.providers.Provider,
	address: string
) => {
	return PancakeSyrupPool__factory.connect(address, provider);
};
