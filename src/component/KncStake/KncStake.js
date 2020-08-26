import React, { useState } from "react";
import StakeInput from "../Common/StakeInput";
import Tac from "../Common/Tac";
import useAccount from "src/store/account";
import ImportWallet from "../ImportWallet/ImportWallet";
import Delegate from "../Delegate/Delegate";
import { validateBalanceInput } from "src/utils/validators";
import Web3Service from "src/services/web3/Web3Service";
import { compareTwoNumber } from "src/utils/calculators";
import { toBigAmount } from "src/utils/converters";
import KncStakeConfirmModal from "./KncStakeConfirmModal";
import GasOption from "../Common/GasOption";
import { ACTIONS, DEFAULT_GAS, TOPICS } from "src/configs/constants";
import BroardcastedTxModal from "../Common/BroardcastedTxModal";
import Loading from "../Common/Loading";

function KncStake() {
  const [accountState, accountAction] = useAccount();
  const address = accountState.address;
  const [stakingAmount, setStakingAmount] = useState("");
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isOpenBroadcastModal, setIsOpenBroadcastModal] = useState(false);
  const [error, setError] = useState("");

  async function stake() {
    const isInputValid = validateInput();

    if (!isInputValid) return;

    const web3Service = new Web3Service();
    const tokenAllowance = await web3Service.fetchTokenAllowance(address);
    console.log(tokenAllowance);
    if (+tokenAllowance === 0) {
      // TO DO: show approve modal
    } else if (compareTwoNumber(tokenAllowance, toBigAmount(stakingAmount)) === -1) {
      // TO DO: show reset allowance modal
    } else {
      // TO DO: confirm modal
      setIsOpenConfirmModal(true);
    }
  }

  function validateInput() {
    let isValid = true;
    let errorMessage = validateBalanceInput(stakingAmount, accountState.balance.KNC);

    if (errorMessage !== null) {
      setError(errorMessage);
      isValid = false;
    }

    return isValid;
  }

  return (
    <>
      <div className="moon">
        {address && (
          <section className="section">
            <div className="section__title">Your Stake at Kyber</div>
            <div className="moon__balance">
              <span className="moon__value">
                {accountState.updating ? <Loading /> : accountState.KNCstake} KNC
              </span>
              {accountState.KNCstake > 0 && <div className="withdraw">WITHDRAW</div>}
            </div>
          </section>
        )}
        <section className="section">
          <div className="section__title">Stake KNC</div>
          <StakeInput
            balance={accountState.updating ? <Loading /> : accountState.balance.KNC}
            onChange={setStakingAmount}
            amount={stakingAmount}
            error={error}
            setError={setError}
            token="KNC"
          />
          <ImportWallet
            render={(onClick) => (
              <div className="btn btn-fw btn-dark btn-lg mt-4" onClick={onClick}>
                Import your wallet to Stake
              </div>
            )}
            address={address}
            renderAfterImport={() => (
              <>
                <GasOption
                  txType={ACTIONS.STAKE}
                  txParams={{ address: address, stakingAmount: 1 }}
                  defaultGasLimit={DEFAULT_GAS.STAKE}
                />
                <Tac className="mt-3" />
                <div className="btn btn-lg btn-dark mt-3" onClick={stake}>
                  Stake
                </div>
              </>
            )}
          />
        </section>

        {address && (
          <section className="section">
            <Delegate />
          </section>
        )}
      </div>

      {isOpenConfirmModal && (
        <KncStakeConfirmModal
          isOpen={isOpenConfirmModal}
          closeModal={() => setIsOpenConfirmModal(false)}
          stakingAmount={stakingAmount}
          account={accountState}
          accountAction={accountAction}
          openBroadcastModal={() => setIsOpenBroadcastModal(true)}
        />
      )}

      {isOpenBroadcastModal && (
        <BroardcastedTxModal
          isOpen={isOpenBroadcastModal}
          closeModal={() => setIsOpenBroadcastModal(false)}
          txHash={accountState.lastTx.hash}
          topic={TOPICS.STAKE}
          accountAction={accountAction}
        />
      )}
    </>
  );
}

export default KncStake;
