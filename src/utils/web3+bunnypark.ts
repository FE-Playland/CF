import { ethers } from "ethers";
import { BunnyparkPool__factory } from "../contracts";

export const getBunnyParkPool = (
	provider: ethers.providers.Provider,
	address: string
) => {
	return BunnyparkPool__factory.connect(address, provider);
};
