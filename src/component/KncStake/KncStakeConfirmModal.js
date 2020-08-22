import React from "react";
import Modal from "../Common/Modal";
import useGasAndTxFee from "../Hooks/useGasAndTxFee";
import { ACTIONS } from "src/configs/constants";
import { roundNumber } from "src/utils/fortmaters";

function KncStakeConfirmModal(props) {
  const { gasPrice, gas, txFee, isGasLoading } = useGasAndTxFee(ACTIONS.STAKE, {
    address: props.address,
    stakingAmount: props.stakingAmount
  });

  function handleStake() {
    console.log(props.stakingAmount, gasPrice, gas);
  }

  return (
    <Modal isOpen={props.isOpen} closeModal={props.closeModal}>
      <div className="modal__section">
        <div className="modal__title">Confirm Stake</div>
        <div className="modal__subtitle"> You are staking {roundNumber(props.stakingAmount, 6, true)} KNC to KyberDAO</div>
        <div className="modal__subtitle mb-0">Tx Fee: {isGasLoading ? "..." : txFee} ETH</div>

      </div>
      <div className="modal__footer">
        <button className="btn btn-default" onClick={props.closeModal}>Cancel</button>
        <button className="btn btn-dark" onClick={handleStake}>Confirm</button>
      </div>
    </Modal>
  )
}

export default KncStakeConfirmModal;
