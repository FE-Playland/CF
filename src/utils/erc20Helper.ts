import { BigNumber as BN } from "bignumber.js";
import { getERC20 } from "./web3";
import { bignumberToBnAsync, BIG_TEN } from "./bg";
import { simpleRpcProvider } from "./providers";

export class Token {
	readonly address: string;
	private lib: any;

	get erc() {
		return getERC20(this.lib, this.address);
	}

	public constructor(address: string, lib?: any) {
		this.address = address;
		this.lib = lib || simpleRpcProvider;
	}

	async balanceOf(account: string): Promise<BN> {
		return bignumberToBnAsync(this.erc.balanceOf(account));
	}

	async getBalanceNumber(pool: string): Promise<number> {
		return Promise.all([this.balanceOf(pool), this.erc.decimals()]).then(
			([total, decimal]) => {
				return total.dividedBy(BIG_TEN.pow(decimal)).toNumber();
			}
		);
	}
}
