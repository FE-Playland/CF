import { makeAutoObservable } from "mobx";
import React, { useContext } from "react";

export interface ISyrupInfo {
	pool: string;
	rewardToken: string;
	rewardTokenName: string;
	lpPool: string;
	lpPriceReciprocal: boolean;
}

export class MagicWhitelistStore {
	babyMagicWhitelist = new Map<string, ISyrupInfo>();

	constructor() {
		makeAutoObservable(this);

		// baby initial
		this.initialBabyMagicWhitelist();
	}

	initialBabyMagicWhitelist() {
		const kala: ISyrupInfo = {
			pool: "0xfbb4e24E6caC093cd72C032A1C128196e5162478",
			rewardToken: "0x32299c93960bB583A43c2220Dc89152391A610c5",
			rewardTokenName: "Kala",
			lpPool: "0x30a579c537d95699C88Ef0BdC38907dF0BEfE1f0",
			lpPriceReciprocal: false,
		};

		const hunny: ISyrupInfo = {
			pool: "0x6ea61231d572B4Ec474492f435dE460478F54533",
			rewardToken: "0x565b72163f17849832A692A3c5928cc502f46D69",
			rewardTokenName: "HUNNY",
			lpPool: "0xdA65BF4CaC4EaED1885867dcbc4b26Ae202b6E44",
			lpPriceReciprocal: true,
		};

		this.babyMagicWhitelist.set(kala.pool, kala);
		this.babyMagicWhitelist.set(hunny.pool, hunny);
	}

	findSyrupInfo(
		type: "BABY" | "CAKE",
		poolAddress: string
	): ISyrupInfo | undefined {
		if (type === "BABY") {
			return this.babyMagicWhitelist.get(poolAddress);
		} else if (type === "CAKE") {
			/// TODO:
			return undefined;
		}
		return undefined;
	}
}

const createStores = () => {
	return {
		magicWhitelistStore: new MagicWhitelistStore(),
	};
};

const stores = createStores();

export const StoreContext = React.createContext(stores);

const useStores = () => useContext(StoreContext);

const useMagicWhitelistStore = () => {
	const { magicWhitelistStore } = useStores();
	return magicWhitelistStore;
};

const { magicWhitelistStore } = createStores();

export { stores, useMagicWhitelistStore, magicWhitelistStore };
