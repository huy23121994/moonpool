import React from "react";
import useGlobalHook from "use-global-hook";

const initialState = {
  name: null,
};

const actions = {
  login: (store) => {
    setTimeout(() => {
      store.setState({ name: "NanaLand" });
    });
  },
};

const useUser = useGlobalHook(React, initialState, actions);

export default useUser;
