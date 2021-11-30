import { ethers } from "ethers";
import { Erc20 } from "../contracts";
import { getERC20 } from "../utils/web3";
import { bignumberToBN, BIG_TEN } from "../utils/bg";
import { simpleRpcProvider } from "../utils/providers";

export class ERC20Token {
	address: string;

	constructor(address: string) {
		this.address = address;
	}

	public get erc20(): Erc20 | null {
		return getERC20(
			simpleRpcProvider as ethers.providers.Web3Provider,
			this.address
		);
	}

	public balanceOf(account: string) {
		let erc20 = this.erc20;
		if (erc20 !== null) {
			return erc20.balanceOf(account).then((bal) => bignumberToBN(bal));
		}
		return Promise.reject(new Error("balance is not defined"));
	}

	public decimals() {
		if (this.erc20 !== null) {
			return this.erc20.decimals().then((dec) => dec);
		}
		return Promise.reject(new Error("decimals invalid"));
	}

	public tokenCountOf(account: string) {
		return Promise.all([this.balanceOf(account), this.decimals()]).then(
			(res) => {
				const balanceOf = res[0];
				const decimal = res[1];
				return balanceOf.dividedBy(BIG_TEN.pow(decimal));
			}
		);
	}
}
