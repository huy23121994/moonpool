import React, { useEffect, useState } from "react";
import useUser from "src/store/users";
import logo from "src/assets/images/moonpool.svg";
import Modal from "../Common/Modal";

function Header() {
  const [userState, userAction] = useUser();
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    userAction.login();
  }, []);

  return (
    <>
      <div className="header">
        <img src={logo} alt="logo moonpool" />
        <div className="header__import" onClick={() => setIsOpenModal(true)}>Import Wallet</div>

      </div>

      <Modal isOpen={isOpenModal} setIsOpenModal={setIsOpenModal} />
    </>
  )
}

export default Header;
