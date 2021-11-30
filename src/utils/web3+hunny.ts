import { ethers } from "ethers";
import { HunnyChef__factory, HunnyVault__factory } from "../contracts";

export const getHunnyVaultC = (
	provider: ethers.providers.Provider,
	address: string
) => {
	return HunnyVault__factory.connect(address, provider);
};

export const getHunnyChef = (
	provider: ethers.providers.Provider,
	address: string
) => {
	return HunnyChef__factory.connect(address, provider);
};
