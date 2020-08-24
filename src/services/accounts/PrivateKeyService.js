import BaseWalletService from "src/services/accounts/BaseWalletService";

export default class PrivateKeyService extends BaseWalletService {
  getWalletName = () => {
    return 'Private Key';
  }
}
