import Web3 from "web3";
import ENV from "src/configs/env";

export default class BaseWalletService {
  constructor(props = {}) {
    this.needTobeInitiated = false;
    this.address = props ? props.address : null;
    this.ethereum = null;
    this.web3 = new Web3(new Web3.providers.HttpProvider(ENV.NODE.URL, ENV.NODE.CONNECTION_TIMEOUT));
  }

  connect = async (onEthereumError = null, onNetworkError = null) => {
    if (!this.ethereum) {
      if (typeof onEthereumError === 'function') onEthereumError();
      return false;
    }

    const currentNetworkId = +this.ethereum.networkVersion;
    if (currentNetworkId !== ENV.NETWORK_ID) {
      if (typeof onNetworkError === 'function') onNetworkError(currentNetworkId);
      return false
    }

    const accounts = await this.ethereum.enable();
    this.address = accounts[0];

    return this.address;
  };

  getDisconnected = (clearAccount) => {
    this.ethereum.on('accountsChanged', (accounts) => {
      if (accounts[0] === this.address) return;
      clearAccount();
    });

    this.ethereum.on('chainChanged', (networkId) => {
      if (+networkId === ENV.NETWORK_ID) return;
      clearAccount();
    });
  };

  makeTransaction = async (txObject, privateKey, devicePath) => {
    try {
      let txHash;

      if (privateKey) {
        const signedTxObj = await this.signTransaction(txObject, privateKey);
        txHash = await this.sendSignedTransaction(signedTxObj.rawTransaction);
      } else if (devicePath) {
        const signedRawTx = await this.signTransaction(txObject, devicePath);
        txHash = await this.sendSignedTransaction(signedRawTx);
      } else {
        txHash = await this.sendTransaction(txObject);
      }

      return txHash;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  sendTransaction = (txObject) => {
    return new Promise((resolve, reject) => {
      this.web3.eth.sendTransaction(txObject, function (err, txHash) {
        if (!err) {
          resolve(txHash);
        } else {
          reject(err.message);
        }
      })
    })
  };

  signTransaction = (txObject, privateKey) => {
    return new Promise((resolve, reject) => {
      this.web3.eth.accounts.signTransaction(txObject, privateKey, function (err, signedTxObj) {
        if (!err) {
          resolve(signedTxObj);
        } else {
          reject(err.message);
        }
      })
    })
  };

  sendSignedTransaction = (rawTx) => {
    return new Promise((resolve, reject) => {
      this.web3.eth.sendSignedTransaction(rawTx, function (err, txHash) {
        if (!err) {
          resolve(txHash);
        } else {
          reject(err.message);
        }
      })
    })
  };
}
