import React from "react";
import StakeInput from "../Common/StakeInput";
import Tac from "../Common/Tac";
import useAccount from "src/store/account";
import ImportWallet from "../ImportWallet/ImportWallet";
import Delegate from "../Delegate/Delegate";

function KncStake() {
  const [accountState] = useAccount();
  const address = accountState.address;

  return (
    <div className="moon">
      {address &&
        <section className="section">
          <div className="section__title">Your Stake at Kyber</div>
          <div className="moon__balance">
            <span className="moon__value">{accountState.balance.KNCstake} KNC </span>
            {accountState.balance.KNCstake > 0 && <div className="withdraw">WITHDRAW</div>}
          </div>
        </section>
      }
      <section className="section">
        <div className="section__title">Stake KNC</div>
        <StakeInput
          balance={accountState.balance.KNCstake}
          token="KNC"
        />
        <ImportWallet
          render={onClick => <div className="btn btn-fw btn-dark btn-lg mt-4" onClick={onClick}>Import your wallet to Stake</div>}
          renderAfterImport={() =>
            <>
              <Tac className="mt-3" />
              <div className="btn btn-lg btn-dark mt-3">Stake</div>
            </>
          }
        />
      </section>

      {address && 
        <section className="section">
          <Delegate />
        </section>
      }

    </div>
  )
}

export default KncStake;
