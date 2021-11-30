import { ethers } from "ethers";
import { BigNumber } from "bignumber.js";
import type { GuaStrategy, GuaVault } from "../contracts";
import { getGuaStrategy, getGuaVault } from "../utils/web3";
import {
	bignumberToBN,
	BIG_ONE,
	BIG_TEN,
	BIG_TWO,
	BIG_ZERO,
} from "../utils/bg";
import { getBNBValue } from "../utils/value";
import { simpleRpcProvider } from "../utils/providers";
import { ISyrupInfo } from "../store/magicWhitelistStore";

export enum WriteStatus {
	UNKNOWN,
	PENDING,
	SUCCESS,
}

const PROFIT_RATE = 0.6;

export const DefaultPoolPublicInfo: PoolPublicInfo = {
	price: BIG_ZERO,
	apy: 0,
	apr: 0,
	tvl: BIG_ZERO,
};

export interface PoolPublicInfo {
	price: BigNumber;
	apr: number;
	apy: number;
	tvl: BigNumber;
}

interface IVault {
	name: string;
	address: string;
	decimals: number;

	depositTokenAddress: string;
	depositTokenLPContract?: string;

	poolName: string;
	poolDesc: string;
	stakingContract?: string;
	tokenPerBlock?: () => Promise<number>;
	nameId: string;

	earnToken: string;
	earnTokenAddress: string;
	earnTokenLPContract?: string;

	logo: string;
	strategyAddress: string;
	route: () => Promise<string[]>;
	safeLevel: "high" | "medium" | "low";
	buyLink?: string;

	fetchPrice: () => Promise<BigNumber>;
	fetchPoolPublicInfo: () => Promise<PoolPublicInfo>;
	fetchEstimateProfit?: (account: string) => Promise<BigNumber[]>;
}

interface IBestRouteInfo {
	syrupInfo: ISyrupInfo;
	apr: number;
	apy: number;
	estimateApr: number;
	estimateApy: number;
}

// Gua Pool - vault 模型
export class Vault implements IVault {
	name: string;
	address: string;
	decimals: number;

	depositTokenAddress: string;
	depositTokenLPContract?: string;

	poolName: string;
	poolDesc: string;
	stakingContract?: string;
	tokenPerBlock?: () => Promise<number>;
	nameId: string;

	earnToken: string;
	earnTokenAddress: string;
	earnTokenLPContract?: string;

	logo: string;
	strategyAddress: string;
	route: () => Promise<string[]>;
	safeLevel: "high" | "medium" | "low";

	fetchPrice: () => Promise<BigNumber>;
	fetchPoolPublicInfo: () => Promise<PoolPublicInfo>;
	fetchEstimateProfit?: (account: string) => Promise<BigNumber[]>;
	fetchRoutes?: (account: string) => Promise<IBestRouteInfo[]>;

	public get guaVault(): GuaVault | null {
		return getGuaVault(
			simpleRpcProvider as ethers.providers.Web3Provider,
			this.address
		);
	}

	public get strategy(): GuaStrategy {
		return getGuaStrategy(
			simpleRpcProvider as ethers.providers.Web3Provider,
			this.strategyAddress
		);
	}

	constructor(props: IVault) {
		this.name = props.name;
		this.address = props.address;
		this.decimals = props.decimals;
		this.depositTokenAddress = props.depositTokenAddress;
		this.depositTokenLPContract = props.depositTokenLPContract;

		this.earnToken = props.earnToken;
		this.earnTokenAddress = props.earnTokenAddress;
		this.earnTokenLPContract = props.earnTokenLPContract;

		this.poolName = props.poolName;
		this.poolDesc = props.poolDesc;
		this.stakingContract = props.stakingContract;
		this.tokenPerBlock = props.tokenPerBlock;
		this.nameId = props.nameId;
		this.logo = props.logo;
		this.strategyAddress = props.strategyAddress;
		this.safeLevel = props.safeLevel;

		this.route = props.route;
		this.fetchPoolPublicInfo = props.fetchPoolPublicInfo;
		this.fetchPrice = props.fetchPrice;
		this.fetchEstimateProfit = props.fetchEstimateProfit;
	}

	public async fetchBalanceOf(address: string) {
		const res = await this.guaVault?.balanceOf(address);
		if (res) {
			return bignumberToBN(res);
		} else {
			return BIG_ZERO;
		}
	}

	public async fetchBalance() {
		const res = await this.guaVault?.balance();
		if (res) {
			return bignumberToBN(res);
		} else {
			return BIG_ZERO;
		}
	}

	public async fetchTotalSupply() {
		const res = await this.guaVault?.totalSupply();
		if (res) {
			return bignumberToBN(res);
		} else {
			return BIG_ZERO;
		}
	}

	// read - 用户当前存入 + 收益量
	public depositeOf(accountAddress: string) {
		return Promise.all([
			this.fetchBalanceOf(accountAddress),
			this.fetchBalance(),
			this.fetchTotalSupply(),
		]).then((vals) => {
			const balanceOf = vals[0];
			const balance = vals[1];
			const totalSupply = vals[2];
			if (totalSupply.isEqualTo(0)) {
				return new BigNumber(0);
			}
			return balance.multipliedBy(balanceOf).div(totalSupply);
		});
	}

	public fetchUserDepositeOf(accountAddress: string) {
		return Promise.all([
			this.fetchBalanceOf(accountAddress),
			this.fetchBalance(),
			this.fetchTotalSupply(),
		]).then((vals) => {
			const balanceOf = vals[0];
			const balance = vals[1];
			const totalSupply = vals[2];
			if (totalSupply.isEqualTo(0)) {
				return new BigNumber(0);
			}
			return balance.multipliedBy(balanceOf).div(totalSupply);
		});
	}

	public async fetchEstimateHarvestGasToBNB() {
		let strategy = this.strategy;
		if (!strategy) {
			return BIG_ZERO;
		}
		const abountGas = await strategy.estimateGas.harvest();
		return bignumberToBN(abountGas)
			.multipliedBy(new BigNumber(1.3))
			.dividedBy(BIG_TWO)
			.dividedBy(BIG_TEN.pow(8));
	}

	public async fetchHasGuaMadeProfit(guaProfit: BigNumber) {
		const gasBNB = await this.fetchEstimateHarvestGasToBNB();
		const bnbPrice = await getBNBValue(simpleRpcProvider);
		const gasBNBValue = gasBNB.multipliedBy(bnbPrice);
		const guaProfitValue = guaProfit.div(BIG_TEN.pow(18));

		const isMakeProfit = gasBNBValue.isLessThanOrEqualTo(
			guaProfitValue.multipliedBy(new BigNumber(PROFIT_RATE))
		);
		let progress = guaProfitValue
			.multipliedBy(new BigNumber(PROFIT_RATE))
			.div(gasBNBValue);
		if (progress.isGreaterThanOrEqualTo(BIG_ONE)) {
			progress = BIG_ONE;
		}
		return { isMakeProfit, progress };
	}
}
