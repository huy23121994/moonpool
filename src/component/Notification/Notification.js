import React from "react";
import bell from "src/assets/images/bell.svg";
import useAccount from "src/store/account";

function Notification() {
  const [accountState] = useAccount();

  return (
    <>
      {accountState.address &&
        <div className="notification">
          <img className="notification__bell" src={bell} alt="notification" />
        </div>
      }
    </>
  )
}

export default Notification;
