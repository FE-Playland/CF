import { ethers } from "ethers";
import { getPoolApr } from "../utils/apr";
import { Token } from "../utils/erc20Helper";
import { getTokenValueUseBNB } from "../utils/value";
import hunny_token_img from "../asserts/img/token/token-hunny.png";
import { PoolPublicInfo, Vault } from "../models/vault";
import { bignumberToBN, BIG_TEN } from "../utils/bg";
import { getHunnyChef, getHunnyVaultC } from "../utils/web3+hunny";
import { BigNumber } from "bignumber.js";
import { simpleRpcProvider } from "../utils/providers";
import { getGuaStrategy } from "../utils/web3";
import { getApy } from "../utils/apy";

const HUNNY_STRATEGY_CONTRACT = "0xb419c963B087a98C82195CE5f10D8fcdd57101a1";
const HUNNY_TOKEN_ADDRESS = "0x565b72163f17849832a692a3c5928cc502f46d69";
const HUNNY_TOKEN_PER_BLOCK = 0.8;

export function getHunnyVault(): Vault {
	const fetchPoolPublicInfo = async () => {
		const price = await fetchPrice();
		const priceNumber = price.toNumber();

		const strategy = getGuaStrategy(
			simpleRpcProvider as ethers.providers.Web3Provider,
			HUNNY_STRATEGY_CONTRACT
		);

		const token = new Token(HUNNY_TOKEN_ADDRESS);
		const totalStackingDeposit = await token.getBalanceNumber(
			"0x24320c20499535d0D7a8F6adFb08e5E3f5694417"
		);
		const totalDeposit = await strategy.balanceOf();
		const totalDepositCount = bignumberToBN(totalDeposit).div(BIG_TEN.pow(18));

		const tvl = totalDepositCount.multipliedBy(price);
		const apr =
			getPoolApr(
				priceNumber,
				priceNumber,
				totalStackingDeposit,
				HUNNY_TOKEN_PER_BLOCK
			) ?? 0;

		const apy = getApy(apr, priceNumber);

		return {
			price,
			apr,
			apy,
			tvl,
		} as PoolPublicInfo;
	};

	const fetchPrice = () => {
		const hunnyBnbLpContract = "0x36118142F8C21a1F3fd806D4A34F56f51F33504F";
		return getTokenValueUseBNB(hunnyBnbLpContract, simpleRpcProvider);
	};

	const fetchEstimateProfit = async (account: string) => {
		const provider = simpleRpcProvider as ethers.providers.Web3Provider;
		const hunnyVault = "0x24320c20499535d0D7a8F6adFb08e5E3f5694417";
		const hunnyChef = "0x5ac6Ca0473FA5a25278898d8b72c7c90E083b32a";
		const guaStrategy = "0xb419c963B087a98C82195CE5f10D8fcdd57101a1";
		const vault = getHunnyVaultC(provider, hunnyVault);
		const chef = getHunnyChef(provider, hunnyChef);
		let profitTotal = await chef.pendingHunny(hunnyVault, guaStrategy);

		// profit calc
		const profit = bignumberToBN(profitTotal);
		const userProfit = profit.multipliedBy(new BigNumber(0.99));
		const guaProfit = profit.multipliedBy(new BigNumber(1 - 0.99));
		const total = await vault.balanceOf(guaStrategy);
		return Promise.all([
			hunnySingleVault.fetchBalanceOf(account),
			hunnySingleVault.fetchTotalSupply(),
		]).then((vals) => {
			const estimateTot = userProfit
				.plus(bignumberToBN(total))
				.multipliedBy(vals[0])
				.div(vals[1])
				.div(BIG_TEN.pow(18));
			return [userProfit, guaProfit, estimateTot];
		});
	};

	let hunnySingleVault = new Vault({
		name: "HUNNY",
		address: "0x896b7E198fe3385EB50Ec36820059F6C06b1Ada4",
		decimals: 18,
		depositTokenAddress: "0x565b72163f17849832a692a3c5928cc502f46d69",
		poolName: "HUNNY Ace Hive ♻️",
		poolDesc: "Offical Ace Hive",
		nameId: "HUNNY-SINGLE",
		earnToken: "HUNNY",
		earnTokenAddress: "0x565b72163f17849832a692a3c5928cc502f46d69",
		logo: hunny_token_img,
		strategyAddress: HUNNY_STRATEGY_CONTRACT,
		safeLevel: "medium",
		route: async () => {
			return ["HUNNY", "HUNNY"];
		},
		fetchPoolPublicInfo: fetchPoolPublicInfo,
		fetchPrice: fetchPrice,
		fetchEstimateProfit,
	});

	return hunnySingleVault;
}
