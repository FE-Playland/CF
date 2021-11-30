import { Box, BoxProps, LinkOverlay, useCallbackRef } from "@chakra-ui/react";
import { LinkBox } from "@chakra-ui/react";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { BigNumber } from "bignumber.js";
import { DefaultPoolPublicInfo, Vault } from "../../models/vault";
import { BIG_TEN, BIG_ZERO } from "../../utils/bg";
import { usePoolInfoStore } from "../../store/poolInfoStore";

import "./style.css";
import { useStateSafe } from "../../utils/useSafeEffect";
import { useInterval } from "../../hooks/useInterval";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { runInAction } from "mobx";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

interface IPoolCardCustom {
	vault: Vault;
}

type IPoolCard = BoxProps & IPoolCardCustom;

export const PoolCard: React.FunctionComponent<IPoolCard> = observer(
	(props) => {
		const { vault } = props;
		const { account, chainId } = useActiveWeb3React();
		const poolInfoStore = usePoolInfoStore();

		const poolPublicInfo =
			poolInfoStore.poolPublicInfo.get(vault.nameId) ?? DefaultPoolPublicInfo;
		const { apr, apy } = poolPublicInfo;

		const fetchPublicInfo = useCallbackRef(async () => {
			const info = await vault.fetchPoolPublicInfo();
			runInAction(() => {
				poolInfoStore.updatePoolPublicInfo(vault.nameId, info);
			});
		});

		useEffect(() => {
			fetchPublicInfo();
		}, [fetchPublicInfo]);

		useInterval(() => {
			fetchPublicInfo();
		}, 5000);

		const [userBalance, setUserBanalce] = useStateSafe<BigNumber>(BIG_ZERO);
		React.useEffect(() => {
			if (!account || !chainId) return;
			Promise.all([vault.depositeOf(account), vault.fetchPrice()]).then(
				(res) => {
					const balance = res[0].dividedBy(BIG_TEN.pow(18));
					const price = res[1];
					setUserBanalce(balance.multipliedBy(price!));
				}
			);
		}, [account, chainId, setUserBanalce, vault]);

		return (
			<LinkBox key={vault.nameId}>
				<LinkOverlay as={RouterLink} to={`pool/${vault.nameId}`}>
					<Box className="poolcard-container clickable">
						<Box
							sx={{
								gridArea: "icon",
								placeSelf: "center start",
								display: "flex",
							}}
						>
							<img src={vault.logo ?? ""} width="35px" alt="logo" />
						</Box>
						<Box
							sx={{
								gridArea: "label",
								placeSelf: "center start",
								display: "flex",
								alignSelf: "center",
								flexDirection: "column",
								marginLeft: "8px",
							}}
						>
							<span
								style={{
									fontSize: "16px",
									fontWeight: "bolder",
									color: "#ec6998",
								}}
							>
								{vault.name.toUpperCase()}
							</span>
							<span
								style={{
									fontSize: "13px",
									fontWeight: "bolder",
									color: "#f087ad",
								}}
							>
								{vault.poolName}
							</span>
						</Box>
						<Box
							sx={{
								gridArea: "rates",
								alignItems: "center",
								placeSelf: "center",
								display: "flex",
								flexDirection: "column",
							}}
						>
							<Box className="poolcard-detail-apy">{apy.toFixed(2)}%</Box>
							<Box className="poolcard-detail-apy-desc">
								{apr ? `APR ${apr.toFixed(2)}%` : ""}
							</Box>
							<Box className="poolcard-detail-apy-desc">Auto-Compuounding</Box>
						</Box>
						<Box
							sx={{
								gridArea: "return",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<span className="poolcard-detail-label">Earn</span>
							<span className="poolcard-detail-value">
								{vault.earnToken.toUpperCase()}
							</span>
						</Box>

						<Box
							sx={{
								gridArea: "balance",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<span className="poolcard-detail-label">Balance</span>
							<span className="poolcard-detail-value">
								${userBalance.toNumber().toFixed(2)}
							</span>
						</Box>

						<Box
							style={{
								gridArea: "total",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<span className="poolcard-detail-label">Total Deposit</span>
							<span className="poolcard-detail-value">
								$
								{poolInfoStore.poolPublicInfo
									.get(vault.nameId)
									?.tvl?.toFixed(2) ?? 0}
							</span>
						</Box>
					</Box>
				</LinkOverlay>
			</LinkBox>
		);
	}
);
