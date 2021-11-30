import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from "ethers";
import {
	BiswapBswPool__factory,
	Erc20__factory,
	GuaMagicStrategy__factory,
	GuaStrategy__factory,
	GuaVault__factory,
	PancakeCakePool__factory,
	PancakeLp__factory,
} from "../contracts";

export const injected = new InjectedConnector({ supportedChainIds: [56] });

// LP Token 通用 contracts
export const getPancakeLp = (
	provider: ethers.providers.Provider,
	address: string
) => {
	return PancakeLp__factory.connect(address, provider);
};

// Gua 铸币 contracts
export const getGuaVault = (
	provider: ethers.providers.Web3Provider,
	address: string
) => {
	return GuaVault__factory.connect(address, provider);
};

export const getGuaVaultWithSigner = (
	provider: ethers.providers.Web3Provider,
	address: string
) => {
	return GuaVault__factory.connect(address, provider.getSigner());
};

// Gua 策略 contracts
export const getGuaStrategy = (
	provider: ethers.providers.Web3Provider,
	address: string
) => {
	return GuaStrategy__factory.connect(address, provider);
};

export const getGuaMagicStrategy = (
	provider: ethers.providers.Web3Provider,
	address: string
) => {
	return GuaMagicStrategy__factory.connect(address, provider);
};

export const getGuaStrategyWithSigner = (
	provider: ethers.providers.Web3Provider,
	address: string
) => {
	return GuaStrategy__factory.connect(address, provider.getSigner());
};

// BSW 单币池
export const getBswStakingPool = (
	provider: ethers.providers.Provider,
	address: string
) => {
	return BiswapBswPool__factory.connect(address, provider);
};

// erc20 接口
export const getERC20 = (
	provider: ethers.providers.Web3Provider,
	address: string
) => {
	return Erc20__factory.connect(address, provider);
};

export const getERC20WithSigner = (
	provider: ethers.providers.Web3Provider,
	address: string
) => {
	return Erc20__factory.connect(address, provider.getSigner());
};
