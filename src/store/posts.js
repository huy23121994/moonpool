import React from "react";
import useGlobalHook from "use-global-hook";

const initialState = {
  title: 'Hello world',
  content: null,
};

const actions = {
  create: (store) => {
    setTimeout(() => {
      store.setState({ title: "The biggest pumb", content: "Are you free?" });
    }, 2000);
  },
};

const usePosts = useGlobalHook(React, initialState, actions);

export default usePosts;
