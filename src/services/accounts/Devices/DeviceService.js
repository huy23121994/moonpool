import HDKey from "hdkey";
import BaseWalletService from "src/app/services/accounts/BaseWalletService";
import { publicToAddress } from "ethereumjs-util";
import { LIMIT } from "src/app/configs/constants";
import { formatBigNumber } from "src/app/utils/fortmaters";
import Web3Service from "src/app/services/web3/Web3Service";

export default class DeviceService extends BaseWalletService {
  constructor(props) {
    super(props);

    this.web3Service = new Web3Service();
    this.hdKey = null;
  }

  getAddresses = (index) => {
    let addresses = [];

    for (let i = index; i < index + LIMIT.DEVICE_ADDRESS; i++) {
      const address = this.generateAddress(i);
      addresses.push({
        index: i,
        address: address
      });
    }

    return addresses;
  };

  getBalances = async (addressObjects) => {
    let addresses = [];

    for (let i = 0; i < addressObjects.length; i++) {
      const balance = await this.web3Service.fetchTokenBalance(addressObjects[i].address);

      addresses.push({
        ...addressObjects[i],
        balance: formatBigNumber(balance)
      });
    }

    return addresses;
  };

  setHdKey = (publicKey, chainCode) => {
    this.hdKey = new HDKey();
    this.hdKey.publicKey = new Buffer(publicKey, 'hex');
    this.hdKey.chainCode = new Buffer(chainCode, 'hex');
  };

  generateAddress = (index) => {
    const derivedKey = this.hdKey.derive(`m/${index}`);
    const addressBuffer = publicToAddress(derivedKey.publicKey, true);
    return '0x' + addressBuffer.toString('hex');
  };
}
