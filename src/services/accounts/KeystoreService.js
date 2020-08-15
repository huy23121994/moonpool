import BaseWalletService from "src/app/services/accounts/BaseWalletService";

export default class KeystoreService extends BaseWalletService {
  getWalletName = () => {
    return 'Keystore';
  }
}
