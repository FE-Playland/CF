import placeholder_token_img from "../asserts/img/token/token-cakebot.svg";
import { makeAutoObservable } from "mobx";
import React, { useContext } from "react";

import { Vault } from "../models/vault";
import { getCakeVault } from "./cakePoolConfig";
import { getHunnyVault } from "./hunnyPoolConfig";
import { getBSWVault } from "./bswPoolConfig";
import { getUsdtUsdcLpVault } from "./usdtusdcLpPoolConfig";
import { getCakeBpVault } from "./cakeBpPoolConfig";
import { getBabyVault } from "./babyPoolConfig";
import { getBabyMagicVault } from "./babyMagicPoolConfig";

export { placeholder_token_img };

export class VaultsStore {
	pools: Vault[] = [];
	poolDict: Map<string, Vault> = new Map<string, Vault>([]);

	constructor() {
		makeAutoObservable(this);
		this.initialPools();
		this.buildPoolsIndex();
	}

	private initialPools() {
		this.pools.push(getCakeVault());
		this.pools.push(getCakeBpVault());
		this.pools.push(getBabyVault());
		this.pools.push(getBabyMagicVault());
		this.pools.push(getHunnyVault());
		this.pools.push(getBSWVault());
		this.pools.push(getUsdtUsdcLpVault());
	}

	private buildPoolsIndex() {
		for (let v of this.pools) {
			this.poolDict.set(v.nameId, v);
		}
	}

	public getVault(idName: string): Vault | null {
		if (this.poolDict.has(idName)) {
			return this.poolDict.get(idName) ?? null;
		}
		return null;
	}
}

const store = new VaultsStore();
export const VaultsStoreContext = React.createContext(store);

const useVaultStore = () => {
	return useContext(VaultsStoreContext);
};

export { store, useVaultStore };
