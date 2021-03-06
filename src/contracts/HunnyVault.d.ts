/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface HunnyVaultInterface extends ethers.utils.Interface {
  functions: {
    "balance()": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "deposit(uint256)": FunctionFragment;
    "depositAll()": FunctionFragment;
    "depositedAt(address)": FunctionFragment;
    "disableWhitelist(bool)": FunctionFragment;
    "earned(address)": FunctionFragment;
    "getReward()": FunctionFragment;
    "harvest()": FunctionFragment;
    "hunnyChef()": FunctionFragment;
    "initialize()": FunctionFragment;
    "isWhitelist(address)": FunctionFragment;
    "keeper()": FunctionFragment;
    "lastPauseTime()": FunctionFragment;
    "minter()": FunctionFragment;
    "owner()": FunctionFragment;
    "paused()": FunctionFragment;
    "pid()": FunctionFragment;
    "poolType()": FunctionFragment;
    "priceShare()": FunctionFragment;
    "principalOf(address)": FunctionFragment;
    "recoverToken(address,uint256)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "rewardsToken()": FunctionFragment;
    "setHunnyChef(address)": FunctionFragment;
    "setKeeper(address)": FunctionFragment;
    "setMinter(address)": FunctionFragment;
    "setPaused(bool)": FunctionFragment;
    "setWhitelist(address,bool)": FunctionFragment;
    "sharesOf(address)": FunctionFragment;
    "stakingToken()": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "withdraw(uint256)": FunctionFragment;
    "withdrawAll()": FunctionFragment;
    "withdrawableBalanceOf(address)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "balance", values?: undefined): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "depositAll",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "depositedAt", values: [string]): string;
  encodeFunctionData(
    functionFragment: "disableWhitelist",
    values: [boolean]
  ): string;
  encodeFunctionData(functionFragment: "earned", values: [string]): string;
  encodeFunctionData(functionFragment: "getReward", values?: undefined): string;
  encodeFunctionData(functionFragment: "harvest", values?: undefined): string;
  encodeFunctionData(functionFragment: "hunnyChef", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "isWhitelist", values: [string]): string;
  encodeFunctionData(functionFragment: "keeper", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "lastPauseTime",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "minter", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(functionFragment: "pid", values?: undefined): string;
  encodeFunctionData(functionFragment: "poolType", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "priceShare",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "principalOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "recoverToken",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rewardsToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setHunnyChef",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "setKeeper", values: [string]): string;
  encodeFunctionData(functionFragment: "setMinter", values: [string]): string;
  encodeFunctionData(functionFragment: "setPaused", values: [boolean]): string;
  encodeFunctionData(
    functionFragment: "setWhitelist",
    values: [string, boolean]
  ): string;
  encodeFunctionData(functionFragment: "sharesOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "stakingToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawAll",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawableBalanceOf",
    values: [string]
  ): string;

  decodeFunctionResult(functionFragment: "balance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "depositAll", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "depositedAt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "disableWhitelist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "earned", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getReward", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "harvest", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hunnyChef", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isWhitelist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "keeper", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "lastPauseTime",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "minter", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pid", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "poolType", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "priceShare", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "principalOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "recoverToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rewardsToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setHunnyChef",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setKeeper", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setMinter", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setPaused", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setWhitelist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "sharesOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "stakingToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawableBalanceOf",
    data: BytesLike
  ): Result;

  events: {
    "Deposited(address,uint256)": EventFragment;
    "DisableWhitelist()": EventFragment;
    "EnableWhitelist()": EventFragment;
    "Harvested(uint256)": EventFragment;
    "HunnyPaid(address,uint256,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "PauseChanged(bool)": EventFragment;
    "ProfitPaid(address,uint256,uint256)": EventFragment;
    "Recovered(address,uint256)": EventFragment;
    "Whitelisted(address,bool)": EventFragment;
    "Withdrawn(address,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Deposited"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DisableWhitelist"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EnableWhitelist"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Harvested"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "HunnyPaid"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PauseChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProfitPaid"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Recovered"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Whitelisted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdrawn"): EventFragment;
}

export class HunnyVault extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: HunnyVaultInterface;

  functions: {
    balance(overrides?: CallOverrides): Promise<[BigNumber]>;

    balanceOf(account: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    deposit(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    depositAll(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    depositedAt(
      account: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    disableWhitelist(
      disable: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    earned(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    getReward(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    harvest(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    hunnyChef(overrides?: CallOverrides): Promise<[string]>;

    initialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isWhitelist(
      _address: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    keeper(overrides?: CallOverrides): Promise<[string]>;

    lastPauseTime(overrides?: CallOverrides): Promise<[BigNumber]>;

    minter(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    paused(overrides?: CallOverrides): Promise<[boolean]>;

    pid(overrides?: CallOverrides): Promise<[BigNumber]>;

    poolType(overrides?: CallOverrides): Promise<[number]>;

    priceShare(overrides?: CallOverrides): Promise<[BigNumber]>;

    principalOf(
      account: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    recoverToken(
      tokenAddress: string,
      tokenAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    rewardsToken(overrides?: CallOverrides): Promise<[string]>;

    setHunnyChef(
      _chef: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setKeeper(
      _keeper: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setMinter(
      newMinter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setPaused(
      _paused: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setWhitelist(
      _address: string,
      _on: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    sharesOf(account: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    stakingToken(overrides?: CallOverrides): Promise<[string]>;

    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawAll(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawableBalanceOf(
      account: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;
  };

  balance(overrides?: CallOverrides): Promise<BigNumber>;

  balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

  deposit(
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  depositAll(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  depositedAt(account: string, overrides?: CallOverrides): Promise<BigNumber>;

  disableWhitelist(
    disable: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  earned(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  getReward(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  harvest(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  hunnyChef(overrides?: CallOverrides): Promise<string>;

  initialize(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isWhitelist(_address: string, overrides?: CallOverrides): Promise<boolean>;

  keeper(overrides?: CallOverrides): Promise<string>;

  lastPauseTime(overrides?: CallOverrides): Promise<BigNumber>;

  minter(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  paused(overrides?: CallOverrides): Promise<boolean>;

  pid(overrides?: CallOverrides): Promise<BigNumber>;

  poolType(overrides?: CallOverrides): Promise<number>;

  priceShare(overrides?: CallOverrides): Promise<BigNumber>;

  principalOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

  recoverToken(
    tokenAddress: string,
    tokenAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  rewardsToken(overrides?: CallOverrides): Promise<string>;

  setHunnyChef(
    _chef: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setKeeper(
    _keeper: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setMinter(
    newMinter: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setPaused(
    _paused: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setWhitelist(
    _address: string,
    _on: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  sharesOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

  stakingToken(overrides?: CallOverrides): Promise<string>;

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdraw(
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawAll(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawableBalanceOf(
    account: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    balance(overrides?: CallOverrides): Promise<BigNumber>;

    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    deposit(amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    depositAll(overrides?: CallOverrides): Promise<void>;

    depositedAt(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    disableWhitelist(
      disable: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    earned(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    getReward(overrides?: CallOverrides): Promise<void>;

    harvest(overrides?: CallOverrides): Promise<void>;

    hunnyChef(overrides?: CallOverrides): Promise<string>;

    initialize(overrides?: CallOverrides): Promise<void>;

    isWhitelist(_address: string, overrides?: CallOverrides): Promise<boolean>;

    keeper(overrides?: CallOverrides): Promise<string>;

    lastPauseTime(overrides?: CallOverrides): Promise<BigNumber>;

    minter(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    paused(overrides?: CallOverrides): Promise<boolean>;

    pid(overrides?: CallOverrides): Promise<BigNumber>;

    poolType(overrides?: CallOverrides): Promise<number>;

    priceShare(overrides?: CallOverrides): Promise<BigNumber>;

    principalOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    recoverToken(
      tokenAddress: string,
      tokenAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    rewardsToken(overrides?: CallOverrides): Promise<string>;

    setHunnyChef(_chef: string, overrides?: CallOverrides): Promise<void>;

    setKeeper(_keeper: string, overrides?: CallOverrides): Promise<void>;

    setMinter(newMinter: string, overrides?: CallOverrides): Promise<void>;

    setPaused(_paused: boolean, overrides?: CallOverrides): Promise<void>;

    setWhitelist(
      _address: string,
      _on: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    sharesOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    stakingToken(overrides?: CallOverrides): Promise<string>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    withdraw(amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    withdrawAll(overrides?: CallOverrides): Promise<void>;

    withdrawableBalanceOf(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {
    Deposited(
      user?: string | null,
      amount?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { user: string; amount: BigNumber }
    >;

    DisableWhitelist(): TypedEventFilter<[], {}>;

    EnableWhitelist(): TypedEventFilter<[], {}>;

    Harvested(
      profit?: null
    ): TypedEventFilter<[BigNumber], { profit: BigNumber }>;

    HunnyPaid(
      user?: string | null,
      profit?: null,
      performanceFee?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { user: string; profit: BigNumber; performanceFee: BigNumber }
    >;

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    PauseChanged(
      isPaused?: null
    ): TypedEventFilter<[boolean], { isPaused: boolean }>;

    ProfitPaid(
      user?: string | null,
      profit?: null,
      performanceFee?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { user: string; profit: BigNumber; performanceFee: BigNumber }
    >;

    Recovered(
      token?: null,
      amount?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { token: string; amount: BigNumber }
    >;

    Whitelisted(
      _address?: string | null,
      whitelist?: null
    ): TypedEventFilter<
      [string, boolean],
      { _address: string; whitelist: boolean }
    >;

    Withdrawn(
      user?: string | null,
      amount?: null,
      withdrawalFee?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { user: string; amount: BigNumber; withdrawalFee: BigNumber }
    >;
  };

  estimateGas: {
    balance(overrides?: CallOverrides): Promise<BigNumber>;

    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    deposit(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    depositAll(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    depositedAt(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    disableWhitelist(
      disable: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    earned(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    getReward(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    harvest(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    hunnyChef(overrides?: CallOverrides): Promise<BigNumber>;

    initialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isWhitelist(
      _address: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    keeper(overrides?: CallOverrides): Promise<BigNumber>;

    lastPauseTime(overrides?: CallOverrides): Promise<BigNumber>;

    minter(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    paused(overrides?: CallOverrides): Promise<BigNumber>;

    pid(overrides?: CallOverrides): Promise<BigNumber>;

    poolType(overrides?: CallOverrides): Promise<BigNumber>;

    priceShare(overrides?: CallOverrides): Promise<BigNumber>;

    principalOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    recoverToken(
      tokenAddress: string,
      tokenAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    rewardsToken(overrides?: CallOverrides): Promise<BigNumber>;

    setHunnyChef(
      _chef: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setKeeper(
      _keeper: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setMinter(
      newMinter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setPaused(
      _paused: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setWhitelist(
      _address: string,
      _on: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    sharesOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    stakingToken(overrides?: CallOverrides): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawAll(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawableBalanceOf(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    balance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    balanceOf(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    deposit(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    depositAll(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    depositedAt(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    disableWhitelist(
      disable: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    earned(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getReward(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    harvest(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    hunnyChef(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    initialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isWhitelist(
      _address: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    keeper(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    lastPauseTime(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    minter(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pid(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    poolType(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    priceShare(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    principalOf(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    recoverToken(
      tokenAddress: string,
      tokenAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    rewardsToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setHunnyChef(
      _chef: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setKeeper(
      _keeper: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setMinter(
      newMinter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setPaused(
      _paused: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setWhitelist(
      _address: string,
      _on: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    sharesOf(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    stakingToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawAll(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawableBalanceOf(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
