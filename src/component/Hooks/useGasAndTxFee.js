import { useState, useEffect } from 'react';
import Web3Service from "src/services/web3/Web3Service";
import { calculateTxFee } from "src/utils/calculators";
import useGas from 'src/store/gas';

export default function useGasAndTxFee(txType, params = {}) {
  const [gasPrices] = useGas();
  const [gasPrice, setGasPrice] = useState(null);
  const [gas, setGas] = useState(null);
  const [txFee, setTxFee] = useState(null);

  useEffect(() => {
    async function fetchGasAndTxFee() {
      const web3Service = new Web3Service();
      const gasPrice = gasPrices.prices[gasPrices.selected];
      const estimatedGasLimit = await web3Service.estimatedGasByType(txType, params);
      const txFee = calculateTxFee(gasPrice, estimatedGasLimit);

      setGasPrice(gasPrice);
      setGas(estimatedGasLimit);
      setTxFee(txFee);
    }

    fetchGasAndTxFee();
  }, [gasPrices, params]);

  return {
    gasPrice, gas, txFee,
    isGasLoading: gasPrice === null || gas === null
  };
}
