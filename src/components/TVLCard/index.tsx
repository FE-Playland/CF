import React from "react";
import { observer } from "mobx-react";
import { usePoolInfoStore } from "../../store/poolInfoStore";
import { useMemo } from "react";

export interface ITVLStateView {}

export const TVLStateView = observer(() => {
	// global datas
	let globalStore = usePoolInfoStore();

	const tvl = useMemo(() => {
		return globalStore.totalTvl.toFormat(3);
	}, [globalStore.totalTvl]);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<span
				style={{
					fontWeight: 600,
					fontSize: "1.125rem",
				}}
			>
				CakeBot helps $coin lovers get more $coin
			</span>
			<span
				style={{
					fontWeight: 600,
					fontSize: "3.125rem",
					margin: "0.75rem 0px 0px",
					textShadow: "0 0 12px #4ed8de",
					color: "#4ed8de",
				}}
			>
				${tvl}
			</span>

			<span
				style={{
					margin: "0.25rem 0px 2rem",
					color: "#c8c8c8",
					fontWeight: 600,
					fontSize: "0.875rem",
				}}
			>
				Total deposited at CakeBot.finance
			</span>
		</div>
	);
});
