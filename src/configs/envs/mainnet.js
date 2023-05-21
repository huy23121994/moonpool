const envConfig = {
  NETWORK_ID: 1,
  CHAIN_NAME: "mainnet",
  URLS: {
    ETHERSCAN: 'https://etherscan.io',
    ENJINX: 'https://kyber.enjinx.io',
  },
  NODE: {
    URL: "https://mainnet.infura.io/v3/b14b5f54206846dcac9d091556a2a063",
    CONNECTION_TIMEOUT: 6000
  },
  CONTRACTS: {
    PROXY: "0x9aab3f75489902f3a48495025729a0af77d4b11e", //no use
    STAKING: "0xeadb96F1623176144EBa2B24e35325220972b3bD",
    DAO: "0x7Ec8FcC26bE7e9E85B57E73083E5Fe0550d8A7fE",
    REWARDS_DISTRIBUTOR: "0x5ec0dcf4f6f55f28550c70b854082993fdc0d3b2",
    FEE_HANDLER: "0xd3d2b5643e506c6d9B7099E9116D7aAa941114fe", //no use
    REWARDS_CLAIMER: "0x301c790e31663112fdd7267b711353b470421e62", //no use
  },
  KNC_ADDRESS: "0xdeFA4e8a7bcBA345F687a2f1456F5Edd9CE97202",
  OLD_KNC_ADDRESS: "0xdd974d5c2e2928dea5f71b9825b8b646686bd200",
  KNC_TOTAL_SUPPLY: 210757979,
  APIS: {
    DAO: "https://kyberswap-dao-stats.kyberengineering.io",
    CACHE: "https://production-cache.kyber.network",
    KN: "https://api.kyber.network",
    THE_GRAPH: "https://api.thegraph.com/subgraphs/name/namnm1991/kyber-dao-info", //not yet use
  }
};

export default envConfig;
