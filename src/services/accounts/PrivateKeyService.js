import BaseWalletService from "src/app/services/accounts/BaseWalletService";

export default class PrivateKeyService extends BaseWalletService {
  getWalletName = () => {
    return 'Private Key';
  }
}
