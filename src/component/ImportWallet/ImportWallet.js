import React, { useState } from "react";
import Metamask from "./Metamask";
import useAccount from "src/store/account";
import Modal from "../Common/Modal";
import { formatAddress } from "src/utils/fortmaters";

function ImportWallet() {
  const [accountState] = useAccount();
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      {accountState.address ?
        <div className="header__address">{formatAddress(accountState.address)}</div>
        :
        <div className="header__import" onClick={() => setIsOpenModal(true)}>Import Wallet</div>
      }

      <Modal isOpen={isOpenModal} setIsOpenModal={setIsOpenModal}>
        <div className="modal__section">
          <div className="modal__title">Connect Wallet</div>
          <div className="import">
            <Metamask className="import__btn import__btn--metamask" setIsOpenModal={setIsOpenModal} />
            {/* <div className="import__btn import__btn--trezor">Trezor</div> */}
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ImportWallet;
