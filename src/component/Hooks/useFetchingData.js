import { useEffect } from 'react';
import { fetchDaoInfo, fetchStakerInfo } from 'src/services/apis/daoService';
import useAccount from "src/store/account";
import { fetchGasPrices } from 'src/services/apis/cacheService';
import { FETCHING_INTERVALS } from 'src/configs/constants';
import useGas from 'src/store/gas';

export default function useFetchingData() {
  const [accountState, accountAction] = useAccount();
  const [, gasAction] = useGas();

  useEffect(() => {
    async function getDaoAndStakerInfo() {
      const daoInfo = await fetchDaoInfo();

      if (accountState.address && daoInfo) {
        const stakerInfo = await fetchStakerInfo(accountState.address, daoInfo.current_epoch);
        accountAction.setStakeKNC(stakerInfo.stake_amount);
      }
    }
    getDaoAndStakerInfo();
  }, [accountAction, accountState.address]);

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
}