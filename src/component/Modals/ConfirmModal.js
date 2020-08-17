import React from "react";
import Modal from "../Common/Modal";

function ConfirmModal(props) {

  return (
    <Modal isOpen={props.isOpen} closeModal={props.closeModal}>
      <div className="modal__section">
        <div className="modal__title">{props.title}</div>
        <div className="modal__subtitle">{props.subTitle}</div>
        <div className="modal__subtitle mb-0">Gas Fee 0.0001 ETH</div>
      </div>
      <div className="modal__footer">
        <button className="btn btn-default" onClick={props.closeModal}>Cancel</button>
        <button className="btn btn-dark">Confirm</button>
      </div>
    </Modal>
  )
}

export default ConfirmModal;
