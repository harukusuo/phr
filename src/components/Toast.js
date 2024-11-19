
import React from 'react';
import '../styles/Toast.css';

const Toast = ({ message, onClose }) => {
    return (
        <div className="toast">
            <p>{message}</p>
            <button onClick={onClose}>OK</button>
        </div>
    );
};

export default Toast;