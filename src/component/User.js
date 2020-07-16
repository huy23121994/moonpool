import React, { useEffect } from "react";
import useUser from "../store/users";
import usePosts from "../store/posts";

function User() {
  const [userState, userAction] = useUser();
  const [postsState, postsAction] = usePosts();

  useEffect(() => {
    userAction.login();
    postsAction.create();
  }, []);

  return (
    <>
      <div>{userState.name}</div>
      <div>{postsState.title}</div>
    </>
  )
}

export default User;
