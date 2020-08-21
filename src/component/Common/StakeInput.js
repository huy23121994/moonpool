import React from "react";
import { filterNumberInput } from "src/utils/validators";

function StakeInput(props) {

  function handleOnChanged(e) {
    props.setError("");
    const isValid = filterNumberInput(e, e.target.value, props.amount);

    if (!isValid) return;
    props.onChange(e.target.value);
  }

  function setMaxValue() {
    props.setError("");
    props.onChange(props.balance);
  }

  return (
    <div className="stakeinput mt-2">
      <div className="stakeinput__form">
        <div className="stakeinput__label">{props.token}</div>
        <input type="text" placeholder="0" onChange={handleOnChanged} value={props.amount} />
      </div>

      {props.error && <div className="text-danger mt-2">{props.error}</div>}

      <div className="stakeinput__balance mt-3">
        <div>Balance: <span className="semi-b">{props.balance}</span></div>
        <div className="stakeinput__balance-btn" onClick={setMaxValue}>MAX</div>
      </div>
    </div>
  )
}

export default StakeInput;
