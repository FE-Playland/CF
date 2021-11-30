/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useMemo } from "react";
import {
	Box,
	Button,
	Input,
	Link,
	useToast,
	useCallbackRef,
	useInterval,
} from "@chakra-ui/react";
import { RouteComponentProps } from "react-router";
import { useVaultStore } from "../../config/valuts";
import { DefaultPoolPublicInfo } from "../../models/vault";
import { formattedAddress } from "../../utils/wallet";
import { BigNumber } from "bignumber.js";
import { BIG_ZERO } from "../../utils/bg";
import { ERC20Token } from "../../models/erc20";
import { parseUnits } from "ethers/lib/utils";

import { useStateSafe } from "../../utils/useSafeEffect";
import { useApprove } from "../../hooks/useApprove";
import { useActiveTokenCount } from "../../hooks/useActiveTokenCount";
import { useActiveDeposit } from "../../hooks/useActiveDeposit";
import { useHarvest } from "../../hooks/useHarvest";
import { useDeposit } from "../../hooks/useDeposit";
import { useWithdraw } from "../../hooks/useWithdraw";
import { observer } from "mobx-react-lite";
import { usePoolInfoStore } from "../../store/poolInfoStore";

import useActiveWeb3React from "../../hooks/useActiveWeb3React";

import "./style.css";

export interface IPoolDetail extends RouteComponentProps {}

export const PoolDetail: React.FunctionComponent<IPoolDetail> = observer(
	(props: IPoolDetail) => {
		const { account, chainId } = useActiveWeb3React();
		const currentPoolName: string = props.match.params["poolName"];
		const vaultStore = useVaultStore();
		const poolInfoStore = usePoolInfoStore();

		const toast = useToast();

		const vault = useMemo(() => {
			return vaultStore.getVault(currentPoolName)!;
		}, [currentPoolName, vaultStore]);

		const poolPublicInfo =
			poolInfoStore.poolPublicInfo.get(vault.nameId) ?? DefaultPoolPublicInfo;
		const { apr, apy, price } = poolPublicInfo;

		const fetchPublicInfo = useCallbackRef(async () => {
			const info = await vault.fetchPoolPublicInfo();
			poolInfoStore.updatePoolPublicInfo(vault.nameId, info);
		});

		// 币种转化路径
		const [route, setRoute] = useStateSafe<string>("");
		useEffect(() => {
			vault.route().then((route) => {
				const res = route.reduce((prev, cur, ind) => {
					if (ind === 0) {
						return cur;
					} else {
						return `${prev} → ${cur}`;
					}
				});
				setRoute(res);
			});
		}, [setRoute, vault]);

		// 计算预估收益
		const [estimateProfit, setEstimateProfit] =
			useStateSafe<BigNumber>(BIG_ZERO);
		const [guaProfit, setGuaProfit] = useStateSafe<BigNumber>(BIG_ZERO);
		const fetchEstimateProfit = useCallbackRef(async () => {
			const estimateProfitObj = vault.fetchEstimateProfit;
			if (!account || !chainId || !!!estimateProfitObj) return;
			estimateProfitObj(account).then(
				([userProfit, guaProfit, estimateTot]) => {
					setEstimateProfit(estimateTot);
					setGuaProfit(guaProfit);
				}
			);
		});

		useEffect(() => {
			fetchPublicInfo();
			fetchEstimateProfit();
		}, [fetchEstimateProfit, fetchPublicInfo]);

		useInterval(() => {
			fetchPublicInfo();
			fetchEstimateProfit();
		}, 8000);

		const token = useMemo(() => {
			return new ERC20Token(vault.depositTokenAddress);
		}, [vault.depositTokenAddress]);

		const { tokenCount } = useActiveTokenCount(token);

		// UserDeposit
		const { userDeposit, userBalance } = useActiveDeposit(vault);

		// 计算日均赚币
		const [profitPerDay, setProfitPerDay] = useStateSafe<number>(0);
		useEffect(() => {
			const profitPerDay = (userDeposit * apr) / 100 / 365;
			setProfitPerDay(profitPerDay);
		}, [apr, setProfitPerDay, userDeposit]);

		const [operationType, setOperationType] = useStateSafe<
			"Deposit" | "Withdraw"
		>("Deposit");

		// approved
		const { isApproved, approveAction } = useApprove(
			vault.address,
			vault.depositTokenAddress,
			vault.guaVault
		);

		// Deposit 部分
		const [depositTokenCount, setDepositTokenCount] = useStateSafe<string>("0");
		const [isDepositInputInvalid, setIsDepositInputInvalid] =
			useStateSafe<boolean>(false);

		const { status: depositStatus, deposit } = useDeposit(vault.address);

		// Withdraw 部分
		const [withdrawTokenCount, setWithdrawTokenCount] =
			useStateSafe<string>("0");
		const [isWithdrawInputInvalid, setIsWithdrawInputInvalid] =
			useStateSafe<boolean>(false);

		const { status: withDrawStatus, withdraw } = useWithdraw(vault.address);

		const { status: harvestStatus, harvest: harvestAction } = useHarvest(
			vault.strategyAddress
		);

		// 计算赚没赚
		const [isGuaMakeProfit, setIsGuaMakeProfit] = useStateSafe<boolean>(false);
		const [compoundIndex, setCompoundIndex] = useStateSafe<BigNumber>(BIG_ZERO);

		useEffect(() => {
			if (!account || chainId === undefined) return;
			vault.fetchHasGuaMadeProfit(guaProfit).then((res) => {
				const { isMakeProfit, progress } = res;
				console.log("is compound", isMakeProfit);
				console.log("compound progress", progress.toNumber());
				setIsGuaMakeProfit(isMakeProfit);
				setCompoundIndex(progress);
			});
		}, [
			account,
			chainId,
			guaProfit,
			setCompoundIndex,
			setIsGuaMakeProfit,
			vault,
		]);

		const OperationInputs = () => {
			if (operationType === "Deposit") {
				return (
					<BalanceInput
						balanceTips="Wallet Balance: "
						balanceValue={`${tokenCount.toFixed(5)} ${vault.name}`}
						isInvalid={isDepositInputInvalid}
						inputValue={depositTokenCount}
						inputOnChange={(event) => {
							let cur = event.target.value;
							setDepositTokenCount(cur);
							let curNum = Number(cur);
							if (isNaN(curNum) || curNum > tokenCount.toNumber()) {
								setIsDepositInputInvalid(true);
							} else {
								setIsDepositInputInvalid(false);
							}
						}}
						maxButtonOnClick={() => {
							setDepositTokenCount(tokenCount.toString());
						}}
						token={vault.name}
					/>
				);
			} else {
				return (
					<BalanceInput
						balanceTips="Withdrawable: "
						balanceValue={`${userDeposit.toFixed(5)} ${vault.name}`}
						isInvalid={isWithdrawInputInvalid}
						inputValue={withdrawTokenCount}
						inputOnChange={(event) => {
							let cur = event.target.value;
							setWithdrawTokenCount(cur);
							let curNum = Number(cur);
							if (isNaN(curNum) || curNum > userDeposit) {
								setIsWithdrawInputInvalid(true);
							} else {
								setIsWithdrawInputInvalid(false);
							}
						}}
						maxButtonOnClick={() => {
							setWithdrawTokenCount(userDeposit.toString());
						}}
						token={vault.name}
					/>
				);
			}
		};

		const OperationButtons = () => {
			if (!isApproved) {
				return (
					<OperationButton
						title={`Approve ${vault.earnToken}`}
						isDisabled={false}
						onClick={approveAction}
						isLoading={false}
					/>
				);
			}
			if (operationType === "Deposit") {
				return (
					<OperationButton
						title="Deposit"
						onClick={() => {
							const willDepositTokenCount = Number(depositTokenCount);
							if (isNaN(willDepositTokenCount)) {
								setIsDepositInputInvalid(true);
								return;
							}
							console.log(willDepositTokenCount);
							const tot = parseUnits(
								depositTokenCount,
								vault.decimals
							).toString();
							console.log(tot, "new");
							deposit(tot).then(() => {});
						}}
						isDisabled={isDepositInputInvalid}
					/>
				);
			} else {
				return (
					<OperationButton
						title="Withdraw"
						isDisabled={isWithdrawInputInvalid}
						onClick={() => {
							const willWithDrawTokenCount = Number(withdrawTokenCount);
							if (isNaN(willWithDrawTokenCount)) {
								setIsWithdrawInputInvalid(true);
								return;
							}
							const re = /^\d+(?:\.\d{0,5})?/;
							const res = withdrawTokenCount.match(re);
							if (res !== null && res.length > 0) {
								const amountEstimate = res[0];
								const amount = new BigNumber(amountEstimate);
								console.log("amount", amount.toString());
								withdraw(amount).then(() => {});
							} else {
								toast({
									position: "top",
									title: "Withdraw amount number wrong",
									description: "Please check the balance.",
									status: "error",
									duration: 9000,
									isClosable: true,
								});
							}
						}}
					/>
				);
			}
		};

		return (
			<Box
				sx={{
					maxWidth: "600px",
					width: "100%",
				}}
			>
				<Box className="pooldetail-container">
					{/*  Token Detail */}
					<Box className="pooldetail-header-container">
						<Box
							sx={{
								width: "100%",
								display: "flex",
								justifyContent: "center",
							}}
						>
							<img src={vault.logo} width="56px" alt="logo" />
						</Box>

						<Box className="pooldetail-header-title">{vault.poolName}</Box>
						<Box className="pooldetail-header-subtitle">{vault.poolDesc}</Box>
					</Box>

					{/* Pool Data */}
					<Box
						sx={{
							width: "100%",
						}}
					>
						<DetailData
							title="Compounding"
							value="🚀 Automatic"
							isFirst={true}
						/>
						<DetailData
							title="APY"
							value={`${apy.toFixed(2)}% (APR ${apr.toFixed(2)}%)`}
						/>
						{profitPerDay >= 0.0000005 ? (
							<DetailData
								title="Unit Profit"
								value={`${profitPerDay.toFixed(5)} ${vault.earnToken} / Day`}
							/>
						) : null}

						<DetailData
							title="Contract"
							value={vault.address}
							isContract={true}
						/>
						<DetailData
							title="Token Price"
							value={price.toFixed(4) + " USD" + ` (${vault.earnToken})`}
						/>
						{!!vault.fetchEstimateProfit ? (
							<>
								<DetailData title="Route" value={route} />

								<DetailData
									title="Compound Index"
									value={`${compoundIndex.multipliedBy(100).toFixed(2)}%`}
									withButton
									buttonOnClick={harvestAction}
									isGuaMakeProfit={isGuaMakeProfit}
								/>
								<DetailData
									title="Estimate"
									value={`${estimateProfit.toFixed(5)} ${vault.earnToken}`}
								/>
							</>
						) : null}

						<DetailData
							title="Deposit (Compound)"
							value={`${userDeposit.toFixed(5)} ${vault.earnToken}`}
						/>
						<DetailData
							title="Balance"
							value={`≈ ${userBalance.toNumber().toFixed(5)} USD`}
						/>
					</Box>

					{/* Farm Control */}
					<Box
						sx={{
							paddingTop: "16px",
							paddingBottom: "10px",
						}}
					>
						<Box className="pooldetail-fram-switch">
							<Box
								className={`pooldetail-farm-switch-button${
									operationType === "Deposit" ? " switch-button-select" : ""
								}`}
								onClick={() => {
									setOperationType("Deposit");
								}}
							>
								Deposit
							</Box>
							<Box
								className={`pooldetail-farm-switch-button${
									operationType === "Withdraw" ? " switch-button-select" : ""
								}`}
								onClick={() => {
									setOperationType("Withdraw");
								}}
							>
								Withdraw
							</Box>
						</Box>
					</Box>

					{/* Wallet Control */}
					<Box>{OperationInputs()}</Box>

					{/* Operation Buttons Group */}
					<Box
						sx={{
							paddingTop: "10px",
							paddingBottom: "20px",
						}}
					>
						{OperationButtons()}
					</Box>
				</Box>
			</Box>
		);
	}
);

interface IOperationButton {
	title: string;
	onClick: () => void;
	isDisabled: boolean;
	isLoading?: boolean;
}

const OperationButton: React.FunctionComponent<IOperationButton> = (props) => {
	return (
		<Button
			colorScheme="pink"
			variant="solid"
			sx={{
				width: "100%",
				height: "46px",
				color: "white",
			}}
			onClick={props.onClick}
			isDisabled={props.isDisabled}
			isLoading={!!props.isLoading}
		>
			{props.title}
		</Button>
	);
};

const DetailLine = () => {
	return (
		<Box
			sx={{
				borderTop: "1px solid rgb(170, 149, 133)",
				height: "1px",
				width: "100%",
				opacity: 0.1,
			}}
		></Box>
	);
};

interface IDetailData {
	title: string;
	value: string;
	isFirst?: boolean;
	isContract?: boolean;
	withButton?: boolean;
	buttonOnClick?: () => void;
	isGuaMakeProfit?: boolean;
}

const DetailData: React.FunctionComponent<IDetailData> = (props) => {
	return (
		<>
			{props.isFirst ? <DetailLine /> : null}

			<div
				className={`pooldetail-data-container${
					props.withButton ? "-button" : ""
				}`}
			>
				<div className="pooldetail-data-label">{props.title}</div>
				{props.isContract ? (
					<Link href={`https://bscscan.com/address/${props.value}`} isExternal>
						<div
							className="pooldetail-data-value"
							style={{
								color: "rgb(226, 214, 207)",
								textDecoration: "underline",
							}}
						>
							{formattedAddress(props.value, 6)}
						</div>
					</Link>
				) : (
					<div className="pooldetail-data-value">{props.value}</div>
				)}

				{props.withButton ? (
					<div className="pooldetail-data-button">
						<Button
							onClick={props.buttonOnClick}
							colorScheme={!!props.isGuaMakeProfit ? "pink" : undefined}
						>
							Harvest
						</Button>
					</div>
				) : null}
			</div>
			<DetailLine />
		</>
	);
};

interface IBalanceInput {
	balanceTips: string;
	balanceValue: string;
	isInvalid: boolean;
	inputValue: string;
	inputOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	maxButtonOnClick: (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => void;
	descTips?: string;
	token: string;
}

const BalanceInput: React.FunctionComponent<IBalanceInput> = (props) => {
	return (
		<>
			<Box className="pooldetail-wallet-balance">
				{props.balanceTips}
				{props.balanceValue}
			</Box>
			<Box
				className={`pooldetail-wallet-input-container${
					props.isInvalid ? " input-invalid" : ""
				}`}
			>
				<Input
					value={props.inputValue}
					inputMode="decimal"
					placeholder="0"
					className="pooldetail-wallet-input"
					variant="unstyled"
					fontSize="1.4em"
					errorBorderColor="red.300"
					sx={{
						paddingLeft: "10px",
						paddingRight: "10px",
					}}
					onChange={props.inputOnChange}
				></Input>
				<span className="pooldetail-wallet-token">{props.token}</span>
				<Button
					className="pooldetail-wallet-button"
					onClick={props.maxButtonOnClick}
				>
					MAX
				</Button>
			</Box>
			<Box
				className="pooldetail-wallet-balance"
				sx={{
					fontWeight: "bold",
					paddingTop: "5px",
					color: "rgb(243, 198, 34)",
					opacity: 0.8,
				}}
			>
				{props.descTips ? props.descTips : "Deposit Fee: 0%"}
			</Box>
		</>
	);
};
