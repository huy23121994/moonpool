import React from "react";
import useGlobalHook from "use-global-hook";

const initialState = {
  address: null,
  privateKey: null,
  devicePath: null,
  wallet: null,
  type: null,
  balance: {
    KNCstake: 0
  }
};

const actions = {
  importAccount: (store, address, wallet, type) => {
    store.setState({ address: address, wallet: wallet, type: type });
  },

  clearAccount: (store) => {
    store.setState({ ...initialState });
  },

  setStakeKNC: (store, amount) => {
    store.setState({ balance: { KNCstake: amount } });
  },
};

const useAccount = useGlobalHook(React, initialState, actions);

export default useAccount;
