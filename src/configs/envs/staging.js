const envConfig = {
  NETWORK_ID: 1,
  CHAIN_NAME: "mainnet",
  URLS: {
    ETHERSCAN: 'https://etherscan.io',
    ENJINX: 'https://kyber.enjinx.io',
  },
  NODE: {
    URL: "https://dev-parity.knstats.com",
    CONNECTION_TIMEOUT: 6000
  },
  CONTRACTS: {
    STAKING: '0x9f349Eb72C3E07F6E840978C65a8BF3b9C74C4f8',
    DAO: '0x39E507f4F7c3e85eD799FDbdf04E42104a8f6b9A',
    FEE_HANDLER: '0xEc30037C9A8A6A3f42734c30Dfa0a208aF71b40C'
  },
  KNC_ADDRESS: "0xdd974d5c2e2928dea5f71b9825b8b646686bd200",
  KNC_TOTAL_SUPPLY: 210757979,
  APIS: {
    DAO: 'https://staging-dao-stats.knstats.com',
    CACHE: 'https://production-cache.kyber.network',
    KN: 'https://api.kyber.network'
  },
  STAKING_PARTNERS: []
};

export default envConfig;
