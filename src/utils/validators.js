import { compareTwoNumber } from "./calculators";

export function filterNumberInput(event, value, preVal) {
  let strRemoveText = value.replace(/[^0-9.]/g, '');
  let str = strRemoveText.replace(/\./g, (val, i) => {
    if (strRemoveText.indexOf('.') !== i) val = '';
    return val
  });

  if (str === ".") str = "0.";

  event.target.value = str;

  return preVal !== str;
}

export function verifyAccount(addr) {
  return /^0x[0-9a-fA-F]{40}$/.test(addr)
}

export function verifyMetamask() {
  let isMetamask = false;

  if (window.ethereum && window.ethereum.isMetaMask) {
    isMetamask = true;
  }

  return isMetamask;
}

export function checkIsObjectEmpty(object) {
  return !object || Object.keys(object).length === 0
}

export function validateBalanceInput(amount, balance) {
  if (!+amount) {
    return "Please enter a positive amount";
  } else if (compareTwoNumber(balance, amount) === -1) {
    return "The token amount is too high. You don't have enough tokens";
  }

  return null;
}