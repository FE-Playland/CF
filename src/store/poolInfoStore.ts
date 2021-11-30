import BigNumber from "bignumber.js";
import { action, computed, makeAutoObservable } from "mobx";
import React, { useContext } from "react";
import { PoolPublicInfo } from "../models/vault";

export class PoolInfoStore {
	poolPublicInfo = new Map<string, PoolPublicInfo>();

	constructor() {
		makeAutoObservable(this);
	}

	@action updatePoolPublicInfo(poolName: string, info: PoolPublicInfo) {
		this.poolPublicInfo.set(poolName, info);
	}

	@computed get totalTvl(): BigNumber {
		let total = new BigNumber(0);
		this.poolPublicInfo.forEach((info, _) => {
			total = total.plus(info.tvl);
		});
		return total;
	}
}

const createStores = () => {
	return {
		poolInfoStore: new PoolInfoStore(),
	};
};

const stores = createStores();

export const StoreContext = React.createContext(stores);

const useStores = () => useContext(StoreContext);

const usePoolInfoStore = () => {
	const { poolInfoStore } = useStores();
	return poolInfoStore;
};

export { stores, usePoolInfoStore };
