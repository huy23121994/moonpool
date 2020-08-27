import React, { useState } from "react";
import { ACTIONS, DEFAULT_GAS, TOPICS } from "src/configs/constants";
import Modal from "../Common/Modal";
import GasOption from "../Common/GasOption";
import Web3Service from "src/services/web3/Web3Service";
import useGasAndTxFee from "../Hooks/useGasAndTxFee";

function Delegate(props) {
  const delegatedAddress = "0x12f0453c1947269842c5646df98905533c1b9519";
  const account = props.account;

  const [isOpenDelegateModal, setIsOpenDelegateModal] = useState(false);
  const { gasPrice, gas } = useGasAndTxFee(ACTIONS.DELEGATE, {
    address: account.address,
    delegatedAddress: delegatedAddress,
  });

  const [txConfirming, setTxConfirming] = useState(false);
  const [error, setError] = useState("");

  async function delegate() {
    setTxConfirming(true);
    setError('');
    try {
      const web3Service = new Web3Service();
      const nonce = await web3Service.fetchUsableNonce(account.address, account.lastTx.nonce);
      const delegateTxObject = web3Service.getDelegateTxObject(account.address, delegatedAddress, nonce, gasPrice, gas);
      const txHash = await account.wallet.makeTransaction(delegateTxObject, null, account.devicePath);
  
      props.setTopic(TOPICS.DELEGATE);
      props.accountAction.setLastTx(txHash, nonce, ACTIONS.DELEGATE, delegatedAddress);
      setIsOpenDelegateModal(false);
      props.openBroadcastModal();
    } catch(e) {
      setError(typeof e === 'string' ? e : e.message);
      setTxConfirming(false);
    }
  }

  return (
    <>
      <div className="btn btn-default" onClick={() => setIsOpenDelegateModal(true)}>
        Delegate to MoonPool
      </div>

      <Modal isOpen={isOpenDelegateModal} closeModal={() => setIsOpenDelegateModal(false)}>
        <div className="modal__section">
          <div className="modal__title">Delegate</div>
          <div className="my-2">
            You are delegating your power to 0x123..4 to vote on your behalf
          </div>
          <div className="mb-4 text-purple">
            Important: It is up to your representative or staking pool to distribute rewards to you.
            You are advised to read their T&Cs. MoonPool does not hold your rewards.
          </div>
          <div className="mt-2"></div>
          <GasOption
            txType={ACTIONS.DELEGATE}
            txParams={{ address: account.address, delegatedAddress: delegatedAddress }}
            defaultGasLimit={DEFAULT_GAS.DELEGATE}
          />
          {txConfirming && (
            <div className="mt-3 animation-slide-up text-gray">
              Waiting for confirmation from your wallet
            </div>
          )}
          {error && <div className="mt-3 text-danger"> {error} </div>}

        </div>
        <div className="modal__footer">
          <button className="btn btn-default" onClick={() => setIsOpenDelegateModal(false)}>
            Cancel
          </button>
          <button className="btn btn-dark" onClick={delegate}>
            Confirm
          </button>
        </div>
      </Modal>
    </>
  );
}

export default Delegate;
