import React, { useState } from "react";
import Modal from "../Modal";
import StakeInput from "../StakeInput";
import GasOption from "../GasOption";
import { ACTIONS, DEFAULT_GAS, TOPICS } from "src/configs/constants";
import { validateBalanceInput } from "src/utils/validators";
import Web3Service from "src/services/web3/Web3Service";
import useGasAndTxFee from "src/component/Hooks/useGasAndTxFee";

export default function WithDrawModal(props) {
  const account = props.account;

  const [withDrawAmount, setWithDrawAmount] = useState("");
  const [txConfirming, setTxConfirming] = useState(false);
  const [error, setError] = useState("");
  const { gasPrice, gas } = useGasAndTxFee(ACTIONS.WITHDRAW, {
    address: account.address,
    amount: withDrawAmount,
  });

  async function withdraw() {
    let errorMessage = validateBalanceInput(withDrawAmount, account.KNCstake);

    if (errorMessage !== null) {
      setError(errorMessage);
      return;
    }

    setTxConfirming(true);

    try {
      const web3Service = new Web3Service();

      const nonce = await web3Service.fetchUsableNonce(account.address, account.lastTx.nonce);
      let txObject = web3Service.getWithdrawTxObject(account.address, withDrawAmount, nonce, gasPrice, gas);
      const txHash = await account.wallet.makeTransaction(txObject, null, account.devicePath);

      props.setTopic(TOPICS.WITHDRAW);
      props.accountAction.setLastTx(txHash, nonce, ACTIONS.WITHDRAW);
      props.closeModal();
      props.openBroadcastModal();
    } catch (e) {
      setError(typeof e === "string" ? e : e.message);
      setTxConfirming(false);
    }
  }

  return (
    <Modal isOpen={props.isOpen} closeModal={props.closeModal}>
      <div className="modal__section">
        <div className="modal__title">Withdraw Stake</div>
        <div className="my-3">Do you wish to withdraw your staked KNC from MoonPool?</div>
        <div className="mb-4 text-purple">
          Note: Withdrawing your stake will affect your voting power and reward for the proposals in
          this epoch.
        </div>

        <StakeInput
          balance={account.KNCstake}
          onChange={setWithDrawAmount}
          amount={withDrawAmount}
          error={error}
          setError={setError}
          token="KNC"
        />
        <div className="mt-2"></div>
        <GasOption
          txType={ACTIONS.WITHDRAW}
          txParams={{ address: account.address, stakingAmount: 1 }}
          defaultGasLimit={DEFAULT_GAS.WITHDRAW}
        />
        {txConfirming && (
          <div className="mt-3 animation-slide-up text-gray">
            Waiting for confirmation from your wallet
          </div>
        )}
      </div>
      <div className="modal__footer">
        <button className="btn btn-default" onClick={props.closeModal}>
          Cancel
        </button>
        <button className="btn btn-dark" onClick={withdraw}>
          Confirm
        </button>
      </div>
    </Modal>
  );
}
