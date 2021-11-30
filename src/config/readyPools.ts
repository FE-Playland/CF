import { makeAutoObservable } from "mobx";
import { IPoolReadyCard } from "../components/PoolReadyCard";
import React, { useContext } from "react";

import cake_token_img from "../asserts/img/token/token-cake.svg";
import baby_token_img from "../asserts/img/token/token-baby.png";

export class ReadyPoolsStore {
	pools: IPoolReadyCard[] = [];

	constructor() {
		makeAutoObservable(this);
		this.initialPools();
	}

	private initialPools() {
		this.pools.push({
			tokenName: "CAKE",
			poolDesc: "CAKE Magic Syrup 🍯",
			img: cake_token_img,
		});
	}
}

const store = new ReadyPoolsStore();
export const ReadyPoolsStoreContext = React.createContext(store);

const useReadyPoolsStore = () => {
	return useContext(ReadyPoolsStoreContext);
};

export { store, useReadyPoolsStore };
