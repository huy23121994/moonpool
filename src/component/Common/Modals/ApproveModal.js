import React, { useState } from "react";
import Modal from "../Modal";
import { ACTIONS, DEFAULT_GAS } from "src/configs/constants";
import GasOption from "../GasOption";
import useGasAndTxFee from "src/component/Hooks/useGasAndTxFee";
import Web3Service from "src/services/web3/Web3Service";

function ApproveModal(props) {
  const account = props.account;
  const { gasPrice, gas } = useGasAndTxFee(ACTIONS.STAKE, {
    address: account.address,
    isApproveToMax: props.isApproveToMax,
  });

  const [txConfirming, setTxConfirming] = useState(false);
  const [error, setError] = useState('');

  async function approve() {
    setTxConfirming(true);
    setError('');
    try {
      const web3Service = new Web3Service();
      const nonce = await web3Service.fetchUsableNonce(account.address, account.lastTx.nonce);
      const approveTxObject = web3Service.getApproveTxObject(account.address, props.isApproveToMax, nonce, gasPrice, gas);
      const txHash = await account.wallet.makeTransaction(approveTxObject, null, account.devicePath);
      
      props.accountAction.setLastTx(txHash, nonce, ACTIONS.APPROVE);
      props.closeModal();
      props.openBroadcastModal();
    } catch(e) {
      setError(typeof e === 'string' ? e : e.message);
      setTxConfirming(false);
    }
  }

  return (
    <Modal isOpen={props.isOpen} closeModal={props.closeModal}>
      <div className="modal__section">
        <div className="modal__title">
          {props.isApproveToMax ? "Approve Token" : "Reset Allowance"}
        </div>
        {props.isApproveToMax
          ? "You need to grant permission to KyberDAO smart contract to interact with KNC in your wallet."
          : "Your KNC allowance is insufficient for KyberDAO to make a transaction, you need to reset it first."}
        <GasOption
          txType={ACTIONS.APPROVE}
          txParams={{ address: account.address, isApproveToMax: props.isApproveToMax }}
          defaultGasLimit={DEFAULT_GAS.APPROVE}
        />

        {txConfirming && <div className="mt-3 animation-slide-up text-gray"> Waiting for confirmation from your wallet </div>}
        {error && <div className="mt-3 text-danger"> {error} </div>}
        
      </div>
      <div className="modal__footer">
        <button className="btn btn-default" onClick={props.closeModal}>
          Cancel
        </button>
        <button className="btn btn-dark" onClick={approve}>
          {props.isApproveToMax ? "Approve" : "Reset"}
        </button>
      </div>
    </Modal>
  );
}

export default ApproveModal;
