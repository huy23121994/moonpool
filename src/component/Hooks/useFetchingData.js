import { useEffect } from 'react';
import { fetchDaoInfo, fetchStakerInfo } from 'src/services/apis/daoService';
import useAccount from "src/store/account";

export default function useFetchingData() {
  const [accountState, accountAction] = useAccount();

  useEffect(() => {
    getDaoAndStakerInfo();
  }, [accountState.address]);

  async function getDaoAndStakerInfo() {
    const daoInfo = await fetchDaoInfo();

    if (accountState.address && daoInfo) {
      const stakerInfo = await fetchStakerInfo(accountState.address, daoInfo.current_epoch);
      console.log(stakerInfo)
      accountAction.setStakeKNC(stakerInfo.stake_amount);
    }
  }
}