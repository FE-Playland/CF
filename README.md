# CakeBot

## Deploy

install surge CLI: `npm install --global surge`

```sh
# build project
yarn build

# upload to surge
surge ./build
```

## contracts

### Cake Single Pool

- CAKE: 0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82
- CAKE strategy: https://bscscan.com/address/0x9d0DeDD2b4FAC8b6a2544dcAe30Ae326a0B836D3
- Controller: https://bscscan.com/address/0xa86aD1CFE7Ffdb979929FB4cf589BD9014C45C67
- Vault: https://bscscan.com/address/0xbae67e30012A78094eEB10921477999c927AeB91

### Hunny Single Pool

- HUNNY: 0x565b72163f17849832A692A3c5928cc502f46D69
- HUNNY strategy: https://bscscan.com/address/0xb419c963B087a98C82195CE5f10D8fcdd57101a1
- Controller: https://bscscan.com/address/0xa86aD1CFE7Ffdb979929FB4cf589BD9014C45C67
- Vault: https://bscscan.com/address/0x896b7E198fe3385EB50Ec36820059F6C06b1Ada4

### BSW Single Pool

- BSW: 0x965F527D9159dCe6288a2219DB51fc6Eef120dD1
- BSW strategy: https://bscscan.com/address/0x4D35117B3333ecA5095ae5dDF55Ef3b691396dBd
- Controller: https://bscscan.com/address/0xa86aD1CFE7Ffdb979929FB4cf589BD9014C45C67
- Vault: https://bscscan.com/address/0xc868E36DF36078c8b3B89E18CA0B322ABA9Eb7B4

### USDT/USDC Lp Pool

- USDT/USDC LP Token: 0x1483767E665B3591677Fd49F724bf7430C18Bf83
- Controller: https://bscscan.com/address/0xa86aD1CFE7Ffdb979929FB4cf589BD9014C45C67
- Vault: https://bscscan.com/address/0x1B1c76747646163aD2bf1B3BAA9f7526b12e7527
- USDT/USDC strategy: https://bscscan.com/address/0x12321FE7FefC31A972Bc33cdFaC4189D96A4a8DB

### Cake BunnyPark Pool

- CAKE: 0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82
- controller: https://bscscan.com/address/0x2FeDdBB61D03a99402F525Ba5b58884442f36EAC
- Vault: https://bscscan.com/address/0x3f76da462d76f8f80F48006bBe99dFe0456178bF
- Strategy: https://bscscan.com/address/0x0E1409476D709490FD8f70f0aaC7cFeAC53Ac674

## Baby Pool

- Baby: 0x53E562b9B7E5E94b81f10e96Ee70Ad06df3D2657
- Controller: https://bscscan.com/address/0xa86aD1CFE7Ffdb979929FB4cf589BD9014C45C67
- Vault: 0xc599966cE4cff81784e697650Ae1D177c9f687e7
- (logic) strategy: 0x0E4Be747890A570A9649C3ED22aAd8479Eb56588
- (proxy) strategy: 0xf571f977277FCBc53FEA3c85c31e459889d689Da

### Baby Single Pool Proxy Configure

#### mainnet

- Upgraded Logic Contract: 0x0E4Be747890A570A9649C3ED22aAd8479Eb56588
- Upgraded Admin: 0x3E9A7E43247889d754CACd465bFe4A3DEE646715
- Proxy Strategy Contract: 0xf571f977277FCBc53FEA3c85c31e459889d689Da

#### testnet

- Upgraded Logic Contract: 0xfe6F9ABDd9e1e842132196453F98D44155710Afd
- Upgraded Admin: 0x699b48FD68cCa41445ACf18c7752044e168C1EC9
- Proxy Strategy Contract: 0xb8e225E3787a844e1aE403dd70Adf1381E8787A8

## Baby Magic Pool

- Baby: 0x53E562b9B7E5E94b81f10e96Ee70Ad06df3D2657
- controller: 0x2FeDdBB61D03a99402F525Ba5b58884442f36EAC
- vault: 0xd3c9106CF59d1387f58b485B5E90C20736688028
- (logic) strategy: 0xc5EdA39AcAbf6daF6e1A109A11e4CC2b836673a1
