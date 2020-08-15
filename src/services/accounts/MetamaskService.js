import Web3 from "web3";
import BaseWalletService from "./BaseWalletService";

export default class MetamaskService extends BaseWalletService {
  constructor(props) {
    super(props);

    this.ethereum = window.ethereum;

    if (this.ethereum) {
      this.web3 = new Web3(this.ethereum);
    } else if (window.web3) {
      this.web3 = new Web3(Web3.givenProvider || window.web3.currentProvider || window.web3.givenProvider);
    }
  }

  subscribeToDisconnect = (clearAccount) => {
    this.getDisconnected(clearAccount);
  };

  getWalletName = () => {
    return 'Metamask';
  }
}