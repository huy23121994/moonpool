const envConfig = {
  NETWORK_ID: 3,
  CHAIN_NAME: "ropsten",
  URLS: {
    ETHERSCAN: 'https://ropsten.etherscan.io',
    ENJINX: 'https://kyber.enjinx.io',
  },
  NODE: {
    URL: "https://eth-ropsten.alchemyapi.io/v2/ZszJ3X4x-JiQqHdeJj19p-V1Rpfpuy-Q",
    CONNECTION_TIMEOUT: 6000
  },
  CONTRACTS: {
    PROXY: '0xd719c34261e099fdb33030ac8909d5788d3039c4',
    STAKING: '0x9A73c6217cd595bc449bA6fEF6efF53f29014f42',
    DAO: '0x2Be7dC494362e4FCa2c228522047663B17aE17F9',
    FEE_HANDLER: '0xfF456D9A8cbB5352eF77dEc2337bAC8dEC63bEAC'
  },
  KNC_ADDRESS: "0x7b2810576aa1cce68f2b118cef1f36467c648f92",
  KNC_TOTAL_SUPPLY: 210939347,
  APIS: {
    DAO: 'https://dev-dao-stats.knstats.com',
    CACHE: 'https://ropsten-cache.knstats.com',
    KN: 'https://ropsten-api.kyber.network'
  }
};

export default envConfig;
