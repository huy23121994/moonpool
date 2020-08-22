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
	}, [props.isOpen, closeModal]);

	function closeModal() {
		props.closeModal();
	}

	return (
		<>
			{props.isOpen &&
				<div className="modal">
					<div className="modal__content">
						<div className="modal__close" onClick={closeModal}>×</div>
						{props.children}
					</div>
				</div>
			}
		</>
	)
}

export default Modal;
