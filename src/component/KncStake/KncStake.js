import React from "react";
import StakeInput from "../Common/StakeInput";
import Tac from "../Common/Tac";
import useAccount from "src/store/account";

function KncStake() {
  const [accountState] = useAccount();

  return (
    <div className="moon">
      <section className="section">
        <div className="section__title">Your Stake at Kyber</div>
        <div className="moon__balance">
          <span className="moon__value">{accountState.balance.KNCstake} KNC </span>
          {accountState.balance.KNCstake > 0 && <div className="withdraw">WITHDRAW</div>}
        </div>
      </section>
      <section className="section">
        <div className="section__title">Stake any token</div>
        <StakeInput balance={accountState.balance.KNCstake} token="KNC" />
        <div className="btn btn-lg btn-dark mt-3">Stake</div>
        <Tac className="mt-3" />
      </section>
    </div>
  )
}

export default KncStake;
