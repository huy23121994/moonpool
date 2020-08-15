import ENV from "src/app/configs/env";
import { checkIsObjectEmpty } from "src/app/utils/validators";
import { GAS_PRICE_LIMIT } from "src/app/configs/constants";
import { toGwei } from "src/app/utils/converters";
import Web3Service from "src/app/services/web3/Web3Service";

export async function fetchGasPrices() {
  let gasPrices, maxGasPrice;

  try {
    const response = await fetch(`${ENV.APIS.CACHE}/gasPrice`);
    const result = await response.json();
    gasPrices = result.data;

    if (!result.success || checkIsObjectEmpty(gasPrices)) {
      gasPrices = await fetchGasPricesFromSC();
    }
  } catch (e) {
    gasPrices = await fetchGasPricesFromSC();
  }

  maxGasPrice = await fetchMaxGasPrice();

  return gasPriceFactory(gasPrices, maxGasPrice);
}

async function fetchMaxGasPrice() {
  let maxGasPrice;

  try {
    const response = await fetch(`${ENV.APIS.CACHE}/maxGasPrice`);
    const result = await response.json();

    if (result.success && result.data) {
      maxGasPrice = +toGwei(result.data);
    } else {
      maxGasPrice = await fetchMaxGasPriceFromSC();
    }
  } catch (e) {
    maxGasPrice = await fetchMaxGasPriceFromSC();
  }

  return maxGasPrice;
}

async function fetchGasPricesFromSC() {
  const web3Service = new Web3Service();
  const standardGasPrice = await web3Service.fetchGasPrice();

  if (!standardGasPrice) return false;

  return {
    fast: standardGasPrice * 1.2,
    standard: standardGasPrice,
    low: (standardGasPrice / 1.2).toFixed(1)
  }
}

async function fetchMaxGasPriceFromSC() {
  const web3Service = new Web3Service();
  const maxGasPriceResult = await web3Service.fetchMaxGasPrice();

  return maxGasPriceResult ? maxGasPriceResult : GAS_PRICE_LIMIT
}

function gasPriceFactory(gasPrices, maxGasPrice) {
  const superFast = gasPrices.fast * 2;

  return {
    "Super Fast": getGasPrice(superFast, maxGasPrice),
    "Fast": getGasPrice(gasPrices.fast, maxGasPrice),
    "Standard": getGasPrice(gasPrices.standard, maxGasPrice),
    "Low": getGasPrice(gasPrices.low, maxGasPrice),
  }
}

function getGasPrice(gasPrice, maxGasPrice) {
  return +gasPrice > maxGasPrice ? maxGasPrice : +gasPrice;
}
