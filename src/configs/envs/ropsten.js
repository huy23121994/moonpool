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
  },
  STAKING_PARTNERS: [
    {
      address: '0xeC2325aFA5F623dd087dA580C2A0950e9Da81679',
      name: 'RockX Pool',
      image: 'https://res-4.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/gziaxp1dastlgh0kmzcf'
    },
    {
      address: '0x8d61ab7571b117644a52240456df66ef846cd999',
      name: 'Kyber Pool',
      image: 'https://kyber.network/app/images/kyber-logo.svg'
    },
  ]
};

export default envConfig;
