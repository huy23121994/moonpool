import React from "react";
import ENV from "src/configs/env";
import etherscanLogo from "src/assets/images/etherscan.png";
import kyberLogo from "src/assets/images/kyber.svg";

export default function ViewOn(props) {
  return (
    <div className="mt-4">
      <span>View on:</span>
      <a className="align-middle ml-3 mr-2" href={`${ENV.URLS.ETHERSCAN}/tx/${props.txHash}`} target="_blank" rel="noreferrer noopener">
        <img alt="icon" src={etherscanLogo}/>
      </a>
      <a className="align-middle mx-2" href={`${ENV.URLS.ENJINX}/eth/transaction/${props.txHash}`} target="_blank" rel="noreferrer noopener">
        <img alt="icon" src={kyberLogo}/>
      </a>
    </div>
  )
}