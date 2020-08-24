import TransportU2F from "@ledgerhq/hw-transport-u2f";
import Eth from "@ledgerhq/hw-app-eth";
import { getRawTxHex, getSignedTxHex } from "src/utils/keys";
import DeviceService from "src/services/accounts/Devices/DeviceService";

export default class LedgerService extends DeviceService {
  constructor(props) {
    super(props);

    this.ethereum = null;
    this.needTobeInitiated = true;
  }

  setConnection = async (path) => {
    const transport = await TransportU2F.create();
    this.ethereum = new Eth(transport);

    const { publicKey, chainCode } = await this.ethereum.getAddress(path, false, true);

    this.setHdKey(publicKey, chainCode);
  };

  signTransaction = async (txObject, devicePath) => {
    txObject.gasLimit = txObject.gas;

    const rawTxHex = getRawTxHex(txObject);
    const signature = await this.ethereum.signTransaction(devicePath, rawTxHex);

    return getSignedTxHex(txObject, signature, true);
  };

  getWalletName = () => {
    return 'Ledger';
  }
}
