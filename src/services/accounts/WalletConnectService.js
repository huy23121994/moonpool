import WalletConnect from "@walletconnect/browser";
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";
import ENV from "src/app/configs/env";
import { fromNetworkIdToName } from "src/app/utils/converters";
import BaseWalletService from "src/app/services/accounts/BaseWalletService";

export default class WalletConnectService extends BaseWalletService {
  constructor(props) {
    super(props);

    this.walletConnector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org"
    });
  }

  openQRCodeModal = () => {
    this.walletConnector.createSession().then(() => {
      const uri = this.walletConnector.uri;
      WalletConnectQRCodeModal.open(uri);
    });
  };

  getConnected = (importAccount, openErrorModal) => {
    this.walletConnector.on("connect", (error, payload) => {
      if (error) {
        openErrorModal(error.message);
        return;
      }

      WalletConnectQRCodeModal.close();

      const { accounts, chainId } = payload.params[0];

      if (chainId !== ENV.NETWORK_ID) {
        const currentNetwork = fromNetworkIdToName(chainId);
        const expectedNetwork = fromNetworkIdToName(ENV.NETWORK_ID);

        this.clearSession();

        openErrorModal(`Wallet Connect should be in ${expectedNetwork}. It is currently in ${currentNetwork}.`);

        return;
      }

      importAccount(accounts[0]);
    });
  };

  getDisconnected = (clearAccount) => {
    this.walletConnector.on("disconnect", () => {
      this.handleClearAccount(clearAccount);
    });

    this.walletConnector.on("session_update", () => {
      this.handleClearAccount(clearAccount);
    });
  };

  handleClearAccount = (clearAccount) => {
    WalletConnectQRCodeModal.close();
    this.walletConnector = null;
    clearAccount();
  };

  clearSession = () => {
    this.walletConnector.killSession();
  };

  subscribeToDisconnect = (clearAccount) => {
    this.getDisconnected(clearAccount);
  };

  sendTransaction = (txObject) => {
    return new Promise((resolve, reject) => {
      this.walletConnector.sendTransaction(txObject).then(transactionHash => {
        resolve(transactionHash);
      }).catch(err => {
        reject(err.message);
      })
    })
  };

  getWalletName = () => {
    return 'Wallet Connect';
  };
}
