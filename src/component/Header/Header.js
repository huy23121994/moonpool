import React from "react";
import logo from "src/assets/images/moonpool.svg";
import ImportWallet from "../ImportWallet/ImportWallet";
import Notification from "../Notification/Notification";
import { formatAddress } from "src/utils/fortmaters";

function Header() {

  return (
    <>
      <div className="header">
        <img className="mr-auto" src={logo} alt="logo moonpool" />
        <ImportWallet
          render={onClick => <div className="header__import" onClick={onClick}>Import Wallet</div>}
          renderAfterImport={address => <div className="header__address">{formatAddress(address)}</div>}
        />
        <div className="ml-3">
          <Notification />
        </div>
      </div>
    </>
  )
}

export default Header;
