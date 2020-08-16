import React, { useState } from "react";
import Metamask from "./Metamask";
import useAccount from "src/store/account";
import Modal from "../Common/Modal";

function ImportWallet(props) {
  const [accountState] = useAccount();
  const [isOpenModal, setIsOpenModal] = useState(false);
  
  return (
    <>
      {accountState.address ? 
        props.renderAfterImport(accountState.address)
        : props.render(() => setIsOpenModal(true))
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
