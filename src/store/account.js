import React from "react";
import useGlobalHook from "use-global-hook";
import ENV from "src/configs/env";
import Web3Service from "src/services/web3/Web3Service";
import { formatBigNumber } from "src/utils/fortmaters";

const initialState = {
  address: null,
  privateKey: null,
  devicePath: null,
  wallet: null,
  type: null,
  KNCstake: 0,
  balance: {
    KNC: 0,
    ETH: 0,
  }
};

const actions = {
  importAccount: (store, address, wallet, type) => {
    store.setState({ address: address, wallet: wallet, type: type });
    localStorage.setItem('address', address);
    localStorage.setItem('type', type);
  },

  clearAccount: (store) => {
    store.setState({ ...initialState });
    localStorage.removeItem('address');
    localStorage.removeItem('type');
  },

  setStakeKNC: (store, amount) => {
    store.setState({ KNCstake: amount });
  },

  fetchBalance: async (store) => {
    const address = store.state.address;
    if (address) {
      const web3Service = new Web3Service();

      const ETHBalance = await web3Service.fetchETHBalance(address);
      const KNCBalance = await web3Service.fetchTokenBalance(address, ENV.KNC_ADDRESS);
      // const stakedKNCBalance = await web3Service.fetchStakedBalance(store.address);

      store.setState({
        balance: {
          ETH: formatBigNumber(ETHBalance),
          KNC: formatBigNumber(KNCBalance)
        }
      });
    }
  },
};

const useAccount = useGlobalHook(React, initialState, actions);

export default useAccount;
