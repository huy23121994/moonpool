import React, { useState } from 'react'
import ENV from "src/configs/env";

export default function CopyableTx(props) {
  const [copyStatus, setCopyStatus] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(props.txHash);
    setCopyStatus(true);
    setTimeout(function () {
      setCopyStatus(false);
    }, 2000)
  };

  return (
    <>
      <div className="address">
        <div>Transaction Hash:</div>
        <div className="mt-3">
          <a className="addr" href={`${ENV.URLS.ETHERSCAN}/tx/${props.txHash}`} target="_blank" rel="noopener noreferrer">
            {props.txHash}
          </a>
          <div className="copy" onClick={copy}/>
        </div>
      </div>
      {copyStatus && (
        <div className={`copy-status animation-slide-up`}>------ TxHash copied ------</div>
      )}
    </>
  ) 
}
