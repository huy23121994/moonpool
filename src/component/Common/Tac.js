import React from "react";

function StakeInput(props) {

  return (
    <div className={`tac mt-2 ${props.className ? props.className : ''}`}>
      By using moonpool.xyz, you agree to the 
      <span className="semi-b"> Terms of Use</span>
    </div>
  )
}

export default StakeInput;
