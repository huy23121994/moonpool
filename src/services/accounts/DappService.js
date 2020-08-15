import MetamaskService from "src/app/services/accounts/MetamaskService";

export default class DappService extends MetamaskService {
  subscribeToDisconnect = () => {
    return false
  };

  getWalletName = () => {
    return 'Dapp';
  }
}