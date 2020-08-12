import React from "react";
import StakeInput from "../Common/StakeInput";
import Tac from "../Common/Tac";

function KncStake() {

  return (
    <div className="moon">
      <section className="section">
        <div className="section__title">Your Token</div>
        <div className="moon__balance">
          <div>
            <span className="moon__value">28.45 mKNC </span>
            <span>= 28.45 KNC</span>
          </div>

          <div className="withdraw">WITHDRAW</div>
        </div>
      </section>
      <section className="section">
        <div className="section__title">Stake any token</div>
        <StakeInput />
        <div className="btn btn-lg btn-dark mt-3">Stake</div>
        <Tac className="mt-3" />
      </section>
    </div>
  )
}

export default KncStake;
