const environment = process.env.REACT_APP_ENV ? process.env.REACT_APP_ENV : 'mainnet';
const ENV = require(`./envs/${environment}`);
module.exports = ENV;
