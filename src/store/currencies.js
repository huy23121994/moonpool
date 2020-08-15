import React from "react";
import useGlobalHook from "use-global-hook";

const initialState = {
  data: [],
};

const actions = {
  getCurrencies: (store) => {
    let data = [
      {
        "symbol": "ETH",
        "name": "Ethereum",
        "address": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        "decimals": 18,
        "gasLimit": "0",
        "sp_limit_order": true,
        "is_quote": true,
        "quote_priority": 2
      },
    ]
    store.setState({ data: data });
    // fetch('https://kyberswap.com/api/currencies', { mode: 'no-cors', })
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data)
    //     store.setState({ data: data });
    //   })
  },
};

const useCurrencies = useGlobalHook(React, initialState, actions);

export default useCurrencies;
