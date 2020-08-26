import { useEffect } from 'react';
import useAccount from "src/store/account";
import { fetchGasPrices } from 'src/services/apis/cacheService';
import { FETCHING_INTERVALS } from 'src/configs/constants';
import useGas from 'src/store/gas';
import { getWalletByType } from 'src/utils/converters';

export default function useFetchingData() {
  const [accountState, accountAction] = useAccount();
  const [, gasAction] = useGas();

  useEffect(() => {
    async function getGasPrices() {
      const gasPrices = await fetchGasPrices();

      if (!gasPrices) return;

      gasAction.setGasPrice(gasPrices);
    }

    if (accountState.address) {
      getGasPrices();
      const gasPricesInterval = setInterval(() => {
        getGasPrices();
      }, FETCHING_INTERVALS.GAS_PRICE);

      return () => {
        clearInterval(gasPricesInterval);
      }
    }
  }, [accountState.address, gasAction]);

  useEffect(() => {
    if (accountState.address) {
      accountAction.fetchBalance();
    }
  }, [accountAction, accountState.address]);

  useEffect(() => {
    let address = localStorage.getItem('address');
    let type = localStorage.getItem('type');
    if (address && type) {
      const wallet = getWalletByType(address, type);
      accountAction.importAccount(address, wallet, type);
      wallet.getDisconnected(accountAction.clearAccount);
    }
  }, [accountAction]);
}