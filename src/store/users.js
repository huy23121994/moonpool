import React from "react";
import useGlobalHook from "use-global-hook";

const initialState = {
  name: "username",
};

const actions = {
  login: (store) => {
    setInterval(() => {
      store.setState({ name: "NanaLand + " + Math.random() });
    }, 2000);
  },
};

const useUser = useGlobalHook(React, initialState, actions);

export default useUser;
