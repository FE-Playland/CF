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
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface GuaVaultInterface extends ethers.utils.Interface {
  functions: {
    "WBNB()": FunctionFragment;
    "allowContract()": FunctionFragment;
    "allowance(address,address)": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "available()": FunctionFragment;
    "balance()": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "controller()": FunctionFragment;
    "decimals()": FunctionFragment;
    "decreaseAllowance(address,uint256)": FunctionFragment;
    "deposit(uint256)": FunctionFragment;
    "depositAll()": FunctionFragment;
    "earn()": FunctionFragment;
    "earnImmediately()": FunctionFragment;
    "getPricePerFullShare()": FunctionFragment;
    "governance()": FunctionFragment;
    "increaseAllowance(address,uint256)": FunctionFragment;
    "max()": FunctionFragment;
    "min()": FunctionFragment;
    "name()": FunctionFragment;
    "setController(address)": FunctionFragment;
    "setGovernance(address)": FunctionFragment;
    "setMin(uint256)": FunctionFragment;
    "symbol()": FunctionFragment;
    "toggleAllowContract(bool)": FunctionFragment;
    "toggleEarnImmediately(bool)": FunctionFragment;
    "token()": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "withdraw(uint256)": FunctionFragment;
    "withdrawAll()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "WBNB", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "allowContract",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "allowance",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "available", values?: undefined): string;
  encodeFunctionData(functionFragment: "balance", values?: undefined): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "controller",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "decreaseAllowance",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "depositAll",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "earn", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "earnImmediately",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPricePerFullShare",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "governance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "increaseAllowance",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "max", values?: undefined): string;
  encodeFunctionData(functionFragment: "min", values?: undefined): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setController",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setGovernance",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setMin",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "toggleAllowContract",
    values: [boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "toggleEarnImmediately",
    values: [boolean]
  ): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawAll",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "WBNB", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "allowContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "available", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "controller", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "decreaseAllowance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "depositAll", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "earn", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "earnImmediately",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPricePerFullShare",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "governance", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "increaseAllowance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "max", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "min", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setController",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setGovernance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setMin", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "toggleAllowContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "toggleEarnImmediately",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawAll",
    data: BytesLike
  ): Result;

  events: {
    "Approval(address,address,uint256)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}

export class GuaVault extends BaseContract {
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

  interface: GuaVaultInterface;

  functions: {
    WBNB(overrides?: CallOverrides): Promise<[string]>;

    allowContract(overrides?: CallOverrides): Promise<[boolean]>;

    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    available(overrides?: CallOverrides): Promise<[BigNumber]>;

    balance(overrides?: CallOverrides): Promise<[BigNumber]>;

    balanceOf(account: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    controller(overrides?: CallOverrides): Promise<[string]>;

    decimals(overrides?: CallOverrides): Promise<[number]>;

    decreaseAllowance(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    deposit(
      _amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    depositAll(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    earn(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    earnImmediately(overrides?: CallOverrides): Promise<[boolean]>;

    getPricePerFullShare(overrides?: CallOverrides): Promise<[BigNumber]>;

    governance(overrides?: CallOverrides): Promise<[string]>;

    increaseAllowance(
      spender: string,
      addedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    max(overrides?: CallOverrides): Promise<[BigNumber]>;

    min(overrides?: CallOverrides): Promise<[BigNumber]>;

    name(overrides?: CallOverrides): Promise<[string]>;

    setController(
      _controller: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setGovernance(
      _governance: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setMin(
      _min: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    symbol(overrides?: CallOverrides): Promise<[string]>;

    toggleAllowContract(
      _b: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    toggleEarnImmediately(
      _b: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    token(overrides?: CallOverrides): Promise<[string]>;

    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    transfer(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferFrom(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdraw(
      _shares: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawAll(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  WBNB(overrides?: CallOverrides): Promise<string>;

  allowContract(overrides?: CallOverrides): Promise<boolean>;

  allowance(
    owner: string,
    spender: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  approve(
    spender: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  available(overrides?: CallOverrides): Promise<BigNumber>;

  balance(overrides?: CallOverrides): Promise<BigNumber>;

  balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

  controller(overrides?: CallOverrides): Promise<string>;

  decimals(overrides?: CallOverrides): Promise<number>;

  decreaseAllowance(
    spender: string,
    subtractedValue: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  deposit(
    _amount: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  depositAll(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  earn(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  earnImmediately(overrides?: CallOverrides): Promise<boolean>;

  getPricePerFullShare(overrides?: CallOverrides): Promise<BigNumber>;

  governance(overrides?: CallOverrides): Promise<string>;

  increaseAllowance(
    spender: string,
    addedValue: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  max(overrides?: CallOverrides): Promise<BigNumber>;

  min(overrides?: CallOverrides): Promise<BigNumber>;

  name(overrides?: CallOverrides): Promise<string>;

  setController(
    _controller: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setGovernance(
    _governance: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setMin(
    _min: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  symbol(overrides?: CallOverrides): Promise<string>;

  toggleAllowContract(
    _b: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  toggleEarnImmediately(
    _b: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  token(overrides?: CallOverrides): Promise<string>;

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  transfer(
    recipient: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferFrom(
    sender: string,
    recipient: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdraw(
    _shares: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawAll(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    WBNB(overrides?: CallOverrides): Promise<string>;

    allowContract(overrides?: CallOverrides): Promise<boolean>;

    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    available(overrides?: CallOverrides): Promise<BigNumber>;

    balance(overrides?: CallOverrides): Promise<BigNumber>;

    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    controller(overrides?: CallOverrides): Promise<string>;

    decimals(overrides?: CallOverrides): Promise<number>;

    decreaseAllowance(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    deposit(_amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    depositAll(overrides?: CallOverrides): Promise<void>;

    earn(overrides?: CallOverrides): Promise<void>;

    earnImmediately(overrides?: CallOverrides): Promise<boolean>;

    getPricePerFullShare(overrides?: CallOverrides): Promise<BigNumber>;

    governance(overrides?: CallOverrides): Promise<string>;

    increaseAllowance(
      spender: string,
      addedValue: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    max(overrides?: CallOverrides): Promise<BigNumber>;

    min(overrides?: CallOverrides): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<string>;

    setController(
      _controller: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setGovernance(
      _governance: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setMin(_min: BigNumberish, overrides?: CallOverrides): Promise<void>;

    symbol(overrides?: CallOverrides): Promise<string>;

    toggleAllowContract(_b: boolean, overrides?: CallOverrides): Promise<void>;

    toggleEarnImmediately(
      _b: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    token(overrides?: CallOverrides): Promise<string>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      recipient: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferFrom(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    withdraw(_shares: BigNumberish, overrides?: CallOverrides): Promise<void>;

    withdrawAll(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    Approval(
      owner?: string | null,
      spender?: string | null,
      value?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { owner: string; spender: string; value: BigNumber }
    >;

    Transfer(
      from?: string | null,
      to?: string | null,
      value?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { from: string; to: string; value: BigNumber }
    >;
  };

  estimateGas: {
    WBNB(overrides?: CallOverrides): Promise<BigNumber>;

    allowContract(overrides?: CallOverrides): Promise<BigNumber>;

    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    available(overrides?: CallOverrides): Promise<BigNumber>;

    balance(overrides?: CallOverrides): Promise<BigNumber>;

    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    controller(overrides?: CallOverrides): Promise<BigNumber>;

    decimals(overrides?: CallOverrides): Promise<BigNumber>;

    decreaseAllowance(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    deposit(
      _amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    depositAll(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    earn(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    earnImmediately(overrides?: CallOverrides): Promise<BigNumber>;

    getPricePerFullShare(overrides?: CallOverrides): Promise<BigNumber>;

    governance(overrides?: CallOverrides): Promise<BigNumber>;

    increaseAllowance(
      spender: string,
      addedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    max(overrides?: CallOverrides): Promise<BigNumber>;

    min(overrides?: CallOverrides): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    setController(
      _controller: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setGovernance(
      _governance: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setMin(
      _min: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<BigNumber>;

    toggleAllowContract(
      _b: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    toggleEarnImmediately(
      _b: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    token(overrides?: CallOverrides): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferFrom(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdraw(
      _shares: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawAll(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    WBNB(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    allowContract(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    available(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    balance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    balanceOf(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    controller(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    decreaseAllowance(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    deposit(
      _amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    depositAll(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    earn(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    earnImmediately(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPricePerFullShare(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    governance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    increaseAllowance(
      spender: string,
      addedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    max(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    min(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setController(
      _controller: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setGovernance(
      _governance: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setMin(
      _min: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    toggleAllowContract(
      _b: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    toggleEarnImmediately(
      _b: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    token(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transfer(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferFrom(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdraw(
      _shares: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawAll(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
