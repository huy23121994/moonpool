const envConfig = {
  NETWORK_ID: 1,
  CHAIN_NAME: "mainnet",
  URLS: {
    ETHERSCAN: 'https://etherscan.io',
    ENJINX: 'https://kyber.enjinx.io',
  },
  NODE: {
    URL: "https://eth-mainnet.alchemyapi.io/v2/Z5zKBvz6WWwFUaEvPUHEuU29iKwLV8VX",
    CONNECTION_TIMEOUT: 6000
  },
  CONTRACTS: {
    PROXY: '0x9aab3f75489902f3a48495025729a0af77d4b11e',
    STAKING: '0xECf0bdB7B3F349AbfD68C3563678124c5e8aaea3',
    DAO: '0x49bdd8854481005bBa4aCEbaBF6e06cD5F6312e9',
    FEE_HANDLER: '0xd3d2b5643e506c6d9B7099E9116D7aAa941114fe'
  },
  KNC_ADDRESS: "0xdd974d5c2e2928dea5f71b9825b8b646686bd200",
  KNC_TOTAL_SUPPLY: 210757979,
  APIS: {
    DAO: 'https://api.kyber.org',
    CACHE: 'https://production-cache.kyber.network',
    KN: 'https://api.kyber.network'
  }
};

export default envConfig;
