import BaseWalletService from "src/services/accounts/BaseWalletService";

export default class KeystoreService extends BaseWalletService {
  getWalletName = () => {
    return 'Keystore';
  }
}
