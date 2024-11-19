import React, { useState, useEffect, useRef } from 'react';
import '../styles/Modal.css';

const Modal = ({ isOpen, onClose, children, className }) => {

    const [isModalOpen, setModalOpen] = useState(isOpen);
    const modalRef = useRef();

    if (!className) {
        className = '';
    }

    useEffect(() => {
        setModalOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        const modalElement = modalRef.current;
        if (modalElement) {
            if (isModalOpen) {
                modalRef.current.showModal();
            } else {
                modalRef.current.close();
            }
        }
    }, [isModalOpen]);

    const handleModalClose = () => {
        if (onClose) {
            onClose();
        }
        setModalOpen(false);
    }

    const handleModalKeyDown = (event) => {
        if (event.key === 'Escape') {
            handleModalClose();
        }
    }

    return (
        <dialog ref={modalRef} className={"modal " + className} onKeyDown={handleModalKeyDown}>
            <button className="modal-close-btn" onClick={handleModalClose}>X</button>
            {children}
        </dialog>
    );
}

export default Modal;