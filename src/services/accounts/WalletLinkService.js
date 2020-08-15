import Web3 from "web3";
import WalletLink from 'walletlink';
import ENV from "src/app/configs/env";
import BaseWalletService from "src/app/services/accounts/BaseWalletService";

export default class WalletLinkService extends BaseWalletService {
  constructor(props) {
    super(props);

    const walletLink = new WalletLink({
      appName: 'KyberDAO',
      appLogoUrl: 'https://kyber.network/app/images/kyber-logo.svg'
    });

    this.ethereum = walletLink.makeWeb3Provider(ENV.NODE.URL, ENV.NETWORK_ID);
    this.web3 = new Web3(this.ethereum);
    this.walletLink = walletLink;
  }

  clearSession = () => {
    this.walletLink.disconnect();
  };

  getWalletName = () => {
    return 'Coinbase';
  }
}
