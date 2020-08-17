import React from "react";
import logo from "src/assets/images/moonpool.svg";
import ImportWallet from "../ImportWallet/ImportWallet";
import Notification from "../Notification/Notification";
import { formatAddress } from "src/utils/fortmaters";
import { Link } from "react-router-dom";

function Header() {

  return (
    <>
      <div className="header">
        <Link to="/" className="mr-auto">
          <img src={logo} alt="logo moonpool" />
        </Link>
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
