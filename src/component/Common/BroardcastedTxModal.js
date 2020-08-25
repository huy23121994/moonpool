import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import error from "src/assets/images/error.svg";
import errorBold from "src/assets/images/error-bold.svg";
import done from "src/assets/images/check-circle.svg";
import broadcast from "src/assets/images/wifi.svg";
import CopyableTx from './CopyableTx';
import ViewOn from './ViewOn';
import { BROADCAST_STATUSES, FETCHING_INTERVALS } from 'src/configs/constants';
import Web3Service from 'src/services/web3/Web3Service';
import Loading from './Loading';

function BroardcastedTxModal(props) {
	const [status, setStatus] = useState(BROADCAST_STATUSES.BROADCAST);

	const web3Service = new Web3Service();

	useEffect(() => {
		const checkTxMinedInterval = setInterval(() => {
			web3Service.checkTxMined(props.txHash, props.topic).then(isMined => {
				console.log(isMined)
				if (isMined !== null) {
					clearInterval(checkTxMinedInterval);
					if (isMined) {
						setStatus(BROADCAST_STATUSES.SUCCESS);
						return;
					}
					setStatus(BROADCAST_STATUSES.ERROR);
				}
			})
		}, FETCHING_INTERVALS.TX_MINE);

		return () => {
			clearInterval(checkTxMinedInterval)
		}
	}, []);

	const collection = [
		{
			status: BROADCAST_STATUSES.BROADCAST,
			title: "Broadcasted",
			button: "Close",
			icon: broadcast,
			message: (
				<>
					<Loading />
					<span className="ml-1"> Waiting for the transaction to be mined</span>
				</>
			)
		},
		{
			status: BROADCAST_STATUSES.SUCCESS,
			title: "Done",
			button: "Done",
			icon: done,
			message: <span className="text-success">Transaction successfully mined</span>
		},
		{
			status: BROADCAST_STATUSES.ERROR,
			title: "Failed",
			button: "Try again",
			icon: error,
			message: <span className="text-danger">Transaction error</span>
		}
	];

	const item = collection[status];
	return (
		<Modal isOpen={props.isOpen} closeModal={props.closeModal}>
			<div className="modal__section">
				<div className="modal__title">
					<img alt="icon" src={item.icon} />
					<span>{item.title}</span>
				</div>
				<CopyableTx txHash={props.txHash} />
				<ViewOn txHash={props.txHash} />
				<div className="mt-2">
					{item.message}
				</div>
			</div>
			<div className="modal__footer">
				<button className="btn btn-default" onClick={props.closeModal}>{item.button}</button>
			</div>
		</Modal>
	)
}

export default BroardcastedTxModal;
