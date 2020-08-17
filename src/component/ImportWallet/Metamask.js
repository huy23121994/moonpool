import React from "react";
import MetamaskService from "src/services/accounts/MetamaskService";
import { fromNetworkIdToName } from "src/utils/converters";
import ENV from "src/configs/env";
import useAccount from "src/store/account";

function Metamask(props) {
  const [ , accountAction] = useAccount();
  
  async function connect() {
    const wallet = new MetamaskService();
    const address = await wallet.connect(openConnectErrorModal, openNetworkErrorModal);

    if (!address) return;

    accountAction.importAccount(address, wallet, 'metamask');
    wallet.getDisconnected(accountAction.clearAccount);
    props.closeModal();
  }

  
  function openConnectErrorModal() {
    alert('Cannot connect to Metamask. Please make sure you have Metamask installed.')
  }

  function openNetworkErrorModal(currentNetworkId) {
    alert(`Metamask should be on ${fromNetworkIdToName(ENV.NETWORK_ID)}. Currently it is on ${fromNetworkIdToName(currentNetworkId)} instead.`)
  }

  return <div className={props.className ? props.className : ''} onClick={connect}>Metamask</div>
}

export default Metamask;
