import Web3 from "web3";
import ENV from "src/configs/env";
import { ABI, ACTIONS, DEFAULT_GAS } from "src/configs/constants";
import { toBigAmount, toGwei, toHex, toWei } from "src/utils/converters";
import { getBiggestNumber } from "src/utils/fortmaters";

export default class Web3Service {
  constructor() {
    this.web3 = new Web3(new Web3.providers.HttpProvider(ENV.NODE.URL, ENV.NODE.CONNECTION_TIMEOUT));

    this.proxyContract = new this.web3.eth.Contract(ABI.PROXY);
    this.erc20Contract = new this.web3.eth.Contract(ABI.ERC20);
    this.stakingContract = new this.web3.eth.Contract(ABI.STAKING);
    this.daoContract = new this.web3.eth.Contract(ABI.DAO);
    this.feeHandlerContract = new this.web3.eth.Contract(ABI.FEE_HANDLER);
  }

  fetchETHBalance = (address) => {
    return new Promise((resolve, reject) => {
      this.web3.eth.getBalance(address).then((balance) => {
        resolve(balance)
      }).catch((err) => {
        reject(err)
      })
    })
  };

  fetchTokenBalance = (address, tokenAddress = ENV.KNC_ADDRESS) => {
    let tokenContract = this.erc20Contract;
    tokenContract.options.address = tokenAddress;

    return new Promise((resolve, reject) => {
      const data = tokenContract.methods.balanceOf(address).encodeABI();

      this.web3.eth.call({
        to: tokenAddress,
        data: data
      }).then(result => {
        const tokenBalance = this.web3.eth.abi.decodeParameters(['uint256'], result);
        resolve(tokenBalance[0]);
      }).catch((err) => {
        reject(err);
      })
    })
  };

  fetchStakedBalance = (address) => {
    return new Promise((resolve, reject) => {
      const data = this.stakingContract.methods.getLatestStakeBalance(address).encodeABI();

      this.web3.eth.call({
        to: ENV.CONTRACTS.STAKING,
        data: data
      }).then(result => {
        const balance = this.web3.eth.abi.decodeParameters(['uint256'], result);
        resolve(balance[0]);
      }).catch((err) => {
        reject(err);
      })
    })
  };

  fetchLatestBRRAndFeeData = async () => {
    const BRRMethod = this.daoContract.methods.getLatestBRRData().encodeABI();
    const FeeMethod = this.daoContract.methods.getLatestNetworkFeeData().encodeABI();

    const BRRResult = await this.web3.eth.call({ to: ENV.CONTRACTS.DAO, data: BRRMethod });
    const FeeResult = await this.web3.eth.call({ to: ENV.CONTRACTS.DAO, data: FeeMethod });

    const BRRData = this.web3.eth.abi.decodeParameters(['uint256', 'uint256', 'uint256'], BRRResult);
    const feeData = this.web3.eth.abi.decodeParameters(['uint256'], FeeResult);

    return {
      burn: BRRData[0] / 100,
      reward: BRRData[1] / 100,
      rebate: BRRData[2] / 100,
      fee: feeData[0] / 100
    }
  };

  fetchLatestNonce = (address) => {
    return new Promise((resolve, reject) => {
      this.web3.eth.getTransactionCount(address).then((nonce) => {
        resolve(nonce)
      }).catch((err) => {
        reject(err)
      })
    })
  };

  fetchUsableNonce = async (address, lastNonce) => {
    let nonce = await this.fetchLatestNonce(address);

    if (lastNonce !== null && nonce <= lastNonce) {
      nonce = ++lastNonce;
    }

    return nonce;
  };

  fetchTokenAllowance = (
    address,
    tokenAddress = ENV.KNC_ADDRESS,
    delegator = ENV.CONTRACTS.STAKING
  ) => {
    let tokenContract = this.erc20Contract;
    tokenContract.options.address = tokenAddress;

    const data = tokenContract.methods.allowance(address, delegator).encodeABI();

    return new Promise((resolve, reject) => {
      this.web3.eth.call({
        to: tokenAddress,
        data: data
      }).then(result => {
        const allowance = this.web3.eth.abi.decodeParameters(['uint256'], result);
        resolve(allowance[0])
      }).catch((err) => {
        reject(err)
      })
    })
  };

  fetchDelegatedAddress = (address) => {
    return new Promise((resolve, reject) => {
      const data = this.stakingContract.methods.getLatestRepresentative(address).encodeABI();

      this.web3.eth.call({
        to: ENV.CONTRACTS.STAKING,
        data: data
      }).then(result => {
        const address = this.web3.eth.abi.decodeParameters(['address'], result);
        resolve(address[0]);
      }).catch((err) => {
        reject(err);
      })
    })
  };

  fetchGasPrice = async () => {
    try {
      const result = await this.web3.eth.getGasPrice();
      return +toGwei(result);
    } catch (e) {
      return false;
    }
  };

  fetchMaxGasPrice = async () => {
    try {
      const data = this.proxyContract.methods.maxGasPrice().encodeABI();

      const result = await this.web3.eth.call({ to: ENV.CONTRACTS.PROXY, data: data });
      const maxGasPrice = this.web3.eth.abi.decodeParameters(['uint256'], result);

      return +toGwei(maxGasPrice[0]);
    } catch (e) {
      return false;
    }
  };

  estimatedGasByType = async (txType, params) => {
    let estimatedGas;

    try {
      const txObject = this.getTxObjectByType(txType, params);
      estimatedGas = await this.estimateGas(txObject);
      estimatedGas = Math.round(estimatedGas * 1.3);

      if (txType === ACTIONS.APPROVE && params.isApproveToMax && estimatedGas < DEFAULT_GAS.APPROVE_MAX) {
        estimatedGas = DEFAULT_GAS.APPROVE_MAX;
      }
    } catch(e) {
      estimatedGas = this.getDefaultGasLimitByType(txType);
    }

    return estimatedGas;
  }

  estimateGas = (txObject) => {
    return new Promise((resolve, reject) => {
      this.web3.eth.estimateGas(txObject).then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
      })
    })
  };

  checkTxMined = async (txHash, topic) => {
    const receipt = await this.web3.eth.getTransactionReceipt(txHash);

    if (receipt !== null) {
      if (topic === undefined) {
        return receipt.status
      }
      const logs = receipt.logs;
      const blockNumber = receipt.blockNumber;

      if (!blockNumber) {
        return null
      }
      if (!logs.length) {
        return false
      }

      for (let i = 0; i < logs.length; ++i) {
        if (logs[i].topics[0].toLowerCase() === topic.toLowerCase()) {
          return true;
        }
      }
    }

    return null
  }

  getTxObject = (contractAddress, methodData, address, nonce, gasPrice, gas) => {
    let txObject = {
      from: address,
      to: contractAddress,
      value: '0x0',
      data: methodData
    };

    if (nonce !== null) txObject.nonce = toHex(nonce);
    if (gasPrice !== null) txObject.gasPrice = toHex(toWei(gasPrice));
    if (gas !== null) txObject.gas = toHex(gas);

    return txObject;
  };

  getStakeTxObject = (address, stakingAmount, nonce = null, gasPrice = null, gas = null) => {
    const stakingData = this.stakingContract.methods.deposit(toHex(toBigAmount(stakingAmount))).encodeABI();
    return this.getTxObject(ENV.CONTRACTS.STAKING, stakingData, address, nonce, gasPrice, gas);
  };

  getVoteTxObject = (address, campID, option, nonce = null, gasPrice = null, gas = null) => {
    const voteData = this.daoContract.methods.vote(campID, option).encodeABI();
    return this.getTxObject(ENV.CONTRACTS.DAO, voteData, address, nonce, gasPrice, gas);
  };

  getDelegateTxObject = (address, delegatedAddress, nonce = null, gasPrice = null, gas = null) => {
    const delegateData = this.stakingContract.methods.delegate(delegatedAddress).encodeABI();
    return this.getTxObject(ENV.CONTRACTS.STAKING, delegateData, address, nonce, gasPrice, gas);
  };

  getWithdrawTxObject = (address, amount, nonce = null, gasPrice = null, gas = null) => {
    const withdrawData = this.stakingContract.methods.withdraw(toHex(toBigAmount(amount))).encodeABI();
    return this.getTxObject(ENV.CONTRACTS.STAKING, withdrawData, address, nonce, gasPrice, gas);
  };

  getClaimRewardTxObject = (staker, epoch, nonce = null, gasPrice = null, gas = null) => {
    const claimRewardData = this.feeHandlerContract.methods.claimStakerReward(staker, epoch).encodeABI();
    return this.getTxObject(ENV.CONTRACTS.FEE_HANDLER, claimRewardData, staker, nonce, gasPrice, gas);
  };

  getApproveTxObject = (
    address, isApproveToMax = true, nonce = null, gasPrice = null, gas = null,
    tokenAddress = ENV.KNC_ADDRESS, delegator = ENV.CONTRACTS.STAKING
  ) => {
    const allowanceAmount = isApproveToMax ? getBiggestNumber() : 0;
    const tokenContract = this.erc20Contract;
    tokenContract.options.address = tokenAddress;

    const approveData = tokenContract.methods.approve(delegator, allowanceAmount).encodeABI();

    return this.getTxObject(tokenAddress, approveData, address, nonce, gasPrice, gas);
  };

  getDefaultGasLimitByType = (txType) => {
    let defaultGas;

    if (txType === ACTIONS.APPROVE) {
      defaultGas = DEFAULT_GAS.APPROVE;
    } else if (txType === ACTIONS.STAKE) {
      defaultGas = DEFAULT_GAS.STAKE;
    } else if (txType === ACTIONS.WITHDRAW) {
      defaultGas = DEFAULT_GAS.WITHDRAW;
    } else if (txType === ACTIONS.VOTE) {
      defaultGas = DEFAULT_GAS.VOTE;
    } else if (txType === ACTIONS.DELEGATE) {
      defaultGas = DEFAULT_GAS.DELEGATE;
    } else if (txType === ACTIONS.CLAIM) {
      defaultGas = DEFAULT_GAS.CLAIM_REWARD;
    }

    return defaultGas;
  }

  getTxObjectByType = (txType, params) => {
    let txObject = null;

    if (txType === ACTIONS.APPROVE) {
      txObject = this.getApproveTxObject(params.address, params.isApproveToMax);
    } else if (txType === ACTIONS.STAKE) {
      txObject = this.getStakeTxObject(params.address, params.stakingAmount);
    } else if (txType === ACTIONS.WITHDRAW) {
      txObject = this.getWithdrawTxObject(params.address, params.amount);
    } else if (txType === ACTIONS.VOTE) {
      txObject = this.getVoteTxObject(params.address, params.campID, params.option);
    } else if (txType === ACTIONS.DELEGATE) {
      txObject = this.getDelegateTxObject(params.address, params.delegatedAddress);
    } else if (txType === ACTIONS.CLAIM) {
      txObject = this.getClaimRewardTxObject(params.address, params.epoch);
    }

    return txObject;
  }
}
