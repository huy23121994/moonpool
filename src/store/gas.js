import React from "react";
import useGlobalHook from "use-global-hook";
import { DEFAULT_GAS_PRICE } from "src/configs/constants";

const initialState = {
  prices: {
    'Super Fast': 60,
    'Fast': 30,
    'Standard': 20,
    'Low': 15,
  },
  estimatedGas: 0,
  selected: DEFAULT_GAS_PRICE,
};

const actions = {
  setGasPrice: (store, data) => {
    store.setState({ prices: { ...data } });
  },
  selectGasPrice: (store, key) => {
    store.setState({ selected: key });
  },
  setEstimatedGas: (store, estimatedGas) => {
    store.setState({ estimatedGas: estimatedGas });
  }
};

const useGas = useGlobalHook(React, initialState, actions);

export default useGas;
