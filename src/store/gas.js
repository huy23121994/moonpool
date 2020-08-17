import React from "react";
import useGlobalHook from "use-global-hook";
import { DEFAULT_GAS_PRICE } from "src/configs/constants";

const initialState = {
  price: {
    'Super Fast': 60,
    'Fast': 30,
    'Standard': 20,
    'Low': 15,
  },
  selected: DEFAULT_GAS_PRICE,
};

const actions = {
  setGasPrice: (store, data) => {
    store.setState({ price: { ...data } });
  },
  selectGasPrice: (store, key) => {
    store.setState({ selected: key });
  }
};

const useGas = useGlobalHook(React, initialState, actions);

export default useGas;
