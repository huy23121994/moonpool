import React, { useState, useEffect } from 'react';
import SlideDown, { SlideDownContent, SlideDownTrigger } from "./SlideDown";
// import { setEstimatedGas, setSelectedGasPrice } from "src/actions/globalAction";
import Web3Service from "src/services/web3/Web3Service";
import { calculateTxFee } from "src/utils/calculators";
import Tooltip from "./Tooltip";
import useGas from 'src/store/gas';

export default function GasOption(props) {
  const [gas, gasAction] = useGas();

  const [isOpened, setIsOpened] = useState(false);
  const [gasLimit, setGasLimit] = useState(props.defaultGasLimit);

  // useEffect(() => {
  //   async function fetchEstimatedGasLimit() {
  //     dispatch(setEstimatedGas(props.defaultGasLimit));

  //     const web3Service = new Web3Service();
  //     const estimatedGasLimit = await web3Service.estimatedGasByType(props.txType, props.txParams);

  //     setGasLimit(estimatedGasLimit);
  //     dispatch(setEstimatedGas(estimatedGasLimit));
  //   }

  //   fetchEstimatedGasLimit();
  // }, []); // eslint-disable-line

  function toggleDropdown() {
    setIsOpened(!isOpened);
  }

  function closeDropdown() {
    setIsOpened(false);
  }

  return (
    <div className="gas-option">
      <SlideDown active={isOpened}>
        <SlideDownTrigger toggleContent={toggleDropdown} className="gas-option__title">
          <div className="gas-option__title-text">
            <span>GAS fee (Gwei)</span>
            <Tooltip
              trigger={<span className="gas-option__info">?</span>}
              content={'Gas fee is required to facilitate transactions on the Ethereum blockchain. Generally, the higher the Gas price, the faster your transaction executes.'}
              longText={true}
            />
          </div>
        </SlideDownTrigger>

        <SlideDownContent className="gas-option__content" status={isOpened} close={closeDropdown} persistOnClickOutside={true}>
          {Object.keys(gas.price).map(key => {
            const gasPrice = gas.price[key];

            return (
              <label key={key} className={`option gas-option__item`}>
                <span className="option-text">
                  <span className="gas-option__value">{gasPrice}</span>
                  <span className="gas-option__text">{key}</span>
                </span>
                <input
                  className="option-radio"
                  type="radio"
                  onChange={() => gasAction.selectGasPrice(key)}
                  checked={key === gas.selected}
                />
                <span className="option-check" />
                <div className="gas-option__estimate">~ {calculateTxFee(gasPrice, gasLimit)} ETH</div>
              </label>
            )
          })}
        </SlideDownContent>
      </SlideDown>
    </div>
  )
}
