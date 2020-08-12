import React, { useEffect } from 'react';

function Modal(props) {

	useEffect(() => {

		if (props.isOpen) {
			document.body.classList.add('modal-open');
			document.getElementById("modal-backdrop").classList.add('active');
			document.getElementById("modal-backdrop").addEventListener("click", closeModal);
		} else {
			document.body.classList.remove('modal-open');
			document.getElementById("modal-backdrop").classList.remove('active');
			document.getElementById("modal-backdrop").removeEventListener("click", closeModal);
		}
	}, [props.isOpen]);

	function closeModal() {
		props.setIsOpenModal(false);
	}

	return (
		<>
			{props.isOpen &&
				<div className="modal">
					<div className="modal__close" onClick={closeModal}>×</div>
					<div className="modal__content">Hello</div>
			</div>
			}
		</>
	)
}

export default Modal;
