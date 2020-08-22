import React, { useState } from "react";
import Metamask from "./Metamask";
import Modal from "../Common/Modal";

function ImportWallet(props) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  
  return (
    <>
      {props.address ? 
        props.renderAfterImport(props.address)
        : props.render(() => setIsOpenModal(true))
      }

      <Modal isOpen={isOpenModal} closeModal={() => setIsOpenModal(false)}>
        <div className="modal__section">
          <div className="modal__title">Connect Wallet</div>
          <div className="import">
            <Metamask className="import__btn import__btn--metamask" closeModal={() => setIsOpenModal(false)} />
            {/* <div className="import__btn import__btn--trezor">Trezor</div> */}
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ImportWallet;
