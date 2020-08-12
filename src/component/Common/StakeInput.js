import React from "react";
import { useState } from "react";
import { filterNumberInput } from "src/utils/validators";

function StakeInput() {
  const [amount, setAmount] = useState('');


  function handleOnChanged(e) {
    const isValid = filterNumberInput(e, e.target.value, amount);

    if (!isValid) return;
    setAmount(e.target.value);
  }

  return (
    <div className="stakeinput mt-2">
      <div className="stakeinput__form">
        <div className="stakeinput__label">USDT</div>
        <input type="text" placeholder="0" onChange={handleOnChanged} value={amount} />
      </div>
      <div className="stakeinput__balance mt-3">
        <div>Balance: <span className="semi-b">5,000 USDT</span></div>
        <div className="stakeinput__balance-btn">MAX</div>
      </div>
    </div>
  )
}

export default StakeInput;
