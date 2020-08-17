import BigNumber from 'bignumber.js';
import { roundNumber } from "src/utils/fortmaters";
import { toGwei } from "src/utils/converters";

/**
 * @returns number (0: equal, 1: greater, -1: less)
 */
export function compareTwoNumber(firstNumber, secondNumber) {
  const firstBigNumber = new BigNumber(firstNumber);
  const secondBigNumber = new BigNumber(secondNumber);

  return firstBigNumber.comparedTo(secondBigNumber);
}

export function multiplyOfTwoNumber(firstNumber, secondNumber) {
  const firstBigNumber = new BigNumber(firstNumber);
  const secondBigNumber = new BigNumber(secondNumber);

  return firstBigNumber.multipliedBy(secondBigNumber).toString();
}

export function divideTwoNumber(firstNumber, secondNumber) {
  if (!+firstNumber || !+secondNumber) return 0;

  const firstBigNumber = new BigNumber(firstNumber);
  const secondBigNumber = new BigNumber(secondNumber);

  return firstBigNumber.div(secondBigNumber).toString();
}

export function calculatePercent(value, total) {
  if (total === 0) return 100;
  const result = divideTwoNumber(multiplyOfTwoNumber(value, 100), total);
  return result > 100 ? 100 : result;
}

export function calculateTxFee(gasPrice, gasLimit, precision = 7) {
  return roundNumber(multiplyOfTwoNumber(toGwei(gasPrice), gasLimit), precision);
}

export function calculateBrrOption(option) {
  const options = option.split(", ");
  const totalValue = options.reduce((a, b) => parseInt(a) + parseInt(b), 0);
  const firstValue = calculatePercent(options[0], totalValue);
  const secondValue = calculatePercent(options[1], totalValue);
  const thirdValue = calculatePercent(options[2], totalValue);

  return `Burn ${roundNumber(firstValue, 2)}%; Reward ${roundNumber(thirdValue, 2)}%; Rebate ${roundNumber(secondValue, 2)}%`
}

export function calculateFeeOption(option) {
  return `${option / 100}%`;
}

export function calculateTotalReward(rewards) {
  let totalReward = 0;
  if (rewards.length === 1) {
    totalReward = rewards[0].amount;
  } else if (rewards.length) {
    totalReward = rewards.reduce((a, b) => a + b.amount, 0);
  }

  return totalReward;
}
