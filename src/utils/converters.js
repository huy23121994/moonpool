import BigNumber from "bignumber.js";
import ENV from "src/configs/env";
import { WALLET_TYPES } from "src/configs/constants";
import MetamaskService from "src/services/accounts/MetamaskService";
import KeystoreService from "src/services/accounts/KeystoreService";
import WalletConnectService from "src/services/accounts/WalletConnectService";
import WalletLinkService from "src/services/accounts/WalletLinkService";
import TrezorService from "src/services/accounts/Devices/TrezorService";
import LedgerService from "src/services/accounts/Devices/LedgerService";
import DappService from "src/services/accounts/DappService";

export function getNumberByPercentage(number, percentage) {
  if (percentage === 100) return number;

  const bigNumber = new BigNumber(number.toString());

  return bigNumber.multipliedBy(percentage / 100).toString();
}

export function toGwei(number) {
  const bigNumber = new BigNumber(number.toString());
  return bigNumber.div(1000000000).toString();
}

export function toWei(number) {
  return toBigAmount(number, 9);
}

export function toBigAmount(number, decimal = 18) {
  const bigNumber = new BigNumber(number.toString());
  return bigNumber.times(Math.pow(10, decimal)).toFixed(0)
}

export function toHex(number) {
  const bigNumber = new BigNumber(number);
  return "0x" + bigNumber.toString(16);
}

export function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

export function getPartnerByAddress(address) {
  return ENV.STAKING_PARTNERS.find(
    partner => partner.address.toLowerCase() === address.toLowerCase()
  )
}

export function getCurrentTimestamp() {
  return Math.floor(Date.now() / 1000);
}

export function fromNetworkIdToName(networkId) {
  let networkName = 'Unknown Network';

  if (networkId === 1) {
    networkName = 'Mainnet';
  } else if (networkId === 3) {
    networkName = 'Ropsten Network';
  } else if (networkId === 4) {
    networkName = 'Rinkeby Network';
  } else if (networkId === 5) {
    networkName = 'Goerli Test Network';
  } else if (networkId === 42) {
    networkName = 'Kovan Network';
  }

  return networkName;
}

export function getWalletByType(address, type) {
  let wallet = null;
  const props = { address };

  if (type === WALLET_TYPES.METAMASK) {
    wallet = new MetamaskService(props);
  }
  // } else if (type === WALLET_TYPES.KEYSTORE) {
  //   wallet = new KeystoreService(props);
  // } else if (type === WALLET_TYPES.WALLET_CONNECT) {
  //   wallet = new WalletConnectService(props);
  // } else if (type === WALLET_TYPES.WALLET_LINK) {
  //   wallet = new WalletLinkService(props);
  // } else if (type === WALLET_TYPES.TREZOR) {
  //   wallet = new TrezorService(props);
  // } else if (type === WALLET_TYPES.LEDGER) {
  //   wallet = new LedgerService(props);
  // } else if (type === WALLET_TYPES.DAPP) {
  //   wallet = new DappService(props);
  // }

  return wallet;
}