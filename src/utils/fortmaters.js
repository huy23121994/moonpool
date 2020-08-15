import BigNumber from 'bignumber.js';

export function getBiggestNumber() {
  const initNumber = new BigNumber(2);
  return "0x" + (initNumber.pow(255).toString(16));
}

export function formatAddress(address, first = 10, last = -4) {
  return `${address.slice(0, first)}...${address.slice(last)}`;
}

export function formatBigNumber(number, decimal = 18) {
  if (!number) return 0;

  const bigNumber = new BigNumber(number.toString());
  const result = bigNumber.div(Math.pow(10, decimal));

  return result.toString();
}

export function roundNumber(number, precision = 6, isFormatted = false) {
  if (!number) return 0;

  const amountBigNumber = new BigNumber(number);
  const amountString = amountBigNumber.toFixed().toString();
  const indexOfDecimal = amountString.indexOf('.');
  const roundedNumber = indexOfDecimal !== -1 ? amountString.slice(0, indexOfDecimal + (precision + 1)) : amountString;

  return isFormatted ? displayFormattedNumber(roundedNumber, precision) : roundedNumber;
}

export function displayFormattedNumber(number, precision = 0) {
  if (!number) return 0;
  if (number < 1) return +(+number).toFixed(6);

  let formattedNumber = new BigNumber(number);
  formattedNumber = formattedNumber.toFormat(precision);
  const numberParts = formattedNumber.split('.');

  if (numberParts.length === 2 && !+numberParts[1]) {
    formattedNumber = numberParts[0];
  }

  return formattedNumber;
}

export function toPercentage(number1, number2, precision = 2) {
  return `${+roundNumber((number1 / number2) * 100, precision)}%`
}

export function lowerCase(string) {
  return string.toLowerCase()
}

export function readableTime(seconds) {
  if (seconds < 60) return seconds + "s"

  const levels = [
    [Math.floor(seconds / 31536000), 'years'],
    [Math.floor((seconds % 31536000) / 86400), 'days'],
    [Math.floor(((seconds % 31536000) % 86400) / 3600), 'h'],
    [Math.floor((((seconds % 31536000) % 86400) % 3600) / 60), 'm'],
  ];

  let returntext = '';
  for (let i = 0, max = levels.length; i < max; i++) {
    if (levels[i][0] === 0) continue;
    returntext += ' ' + levels[i][0] + '' + ((levels[i][0] === 1 && levels[i][1] > 1) ? levels[i][1].substr(0, levels[i][1].length - 1) : levels[i][1]);
  }

  return returntext.trim();
}