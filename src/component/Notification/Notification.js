import React from "react";
import bell from "src/assets/images/bell.svg";

function Notification() {

  return (
    <>
      <div className="notification">
        <img className="notification__bell" src={bell} alt="notification" />
      </div>
    </>
  )
}

export default Notification;
