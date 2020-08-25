import React, { useState } from "react";
import Modal from "../Common/Modal";
import useGasAndTxFee from "../Hooks/useGasAndTxFee";
import { ACTIONS } from "src/configs/constants";
import { roundNumber } from "src/utils/fortmaters";
import Web3Service from "src/services/web3/Web3Service";

function KncStakeConfirmModal(props) {
  const account = props.account;

  const { gasPrice, gas, txFee, isGasLoading } = useGasAndTxFee(ACTIONS.STAKE, {
    address: account.address,
    stakingAmount: props.stakingAmount
  });

  const [txConfirming, setTxConfirming] = useState(false);
  const [error, setError] = useState('');

  async function handleStake() {
    setTxConfirming(true);
    setError('');
    try {
      const web3Service = new Web3Service();
      const nonce = await web3Service.fetchUsableNonce(account.address, account.lastTx.nonce);
      const stakeTxObject = web3Service.getStakeTxObject(account.address, props.stakingAmount, nonce, gasPrice, gas);
      const txHash = await account.wallet.makeTransaction(stakeTxObject, null, account.devicePath);

      props.accountAction.setLastTx(txHash, nonce, ACTIONS.STAKE, props.stakingAmount);
      setTxConfirming(false);
      props.closeModal();
      props.openBroadcastModal();
    } catch (e) {
      setError(typeof e === 'string' ? e : e.message);
      setTxConfirming(false);
    }
  }

  return (
    <Modal isOpen={props.isOpen} closeModal={props.closeModal}>
      <div className="modal__section">
        <div className="modal__title">Confirm Stake</div>
        <div className="modal__subtitle"> You are staking {roundNumber(props.stakingAmount, 6, true)} KNC to KyberDAO</div>
        <div className="modal__subtitle mb-0">Tx Fee: {isGasLoading ? "..." : txFee} ETH</div>
        {txConfirming && <div className="mt-3 animation-slide-up text-gray"> Waiting for confirmation from your wallet </div>}
        {error && <div className="mt-3 text-danger"> {error} </div>}
      </div>
      <div className="modal__footer">
        <button className="btn btn-default" onClick={props.closeModal}>Cancel</button>
        <button className="btn btn-dark" onClick={handleStake}>Confirm</button>
      </div>
    </Modal>
  )
}

export default KncStakeConfirmModal;
