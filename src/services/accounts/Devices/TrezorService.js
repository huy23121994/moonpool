import TrezorConnect from 'trezor-connect';
import DeviceService from "src/services/accounts/Devices/DeviceService";
import { getSignedTxHex } from "src/utils/keys";

export default class TrezorService extends DeviceService {
  constructor(props) {
    super(props);

    TrezorConnect.manifest({
      email: 'developer@xyz.com',
      appUrl: 'http://your.application.com'
    });
  }

  setConnection = async (path) => {
    const { success, payload } = await TrezorConnect.getPublicKey({ path });

    if (!success) {
      throw new Error(payload.error);
    }

    this.setHdKey(payload.publicKey, payload.chainCode);
  };

  signTransaction = async (txObject, devicePath) => {
    txObject.gasLimit = txObject.gas;

    const { success, payload } = await TrezorConnect.ethereumSignTransaction({
      path: devicePath,
      transaction: txObject
    });

    if (!success) {
      throw new Error(payload.error);
    }

    return getSignedTxHex(txObject, payload);
  };

  getWalletName = () => {
    return 'Trezor';
  }
}
