import React from "react";
import logo from "src/assets/images/moonpool.svg";
import ImportWallet from "../ImportWallet/ImportWallet";
import Notification from "../Notification/Notification";

function Header() {

  return (
    <>
      <div className="header">
        <img className="mr-auto" src={logo} alt="logo moonpool" />
        <ImportWallet />
        <div className="ml-3">
          <Notification />
        </div>
      </div>
    </>
  )
}

export default Header;
