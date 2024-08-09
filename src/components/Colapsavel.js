import React, { useState } from 'react';
import '../styles/Colapsavel.css';

const Colapsavel = ({ title, children, isOpenDefault = false }) => {
    const [isOpen, setIsOpen] = useState(isOpenDefault);

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="colapsavel-container">
            <div className="colapsavel-header" onClick={toggleCollapse}>
                {title}
                <span className="colapsavel-icon">{isOpen ? '-' : '+'}</span>
            </div>
            {isOpen && <div className="colapsavel-content">{children}</div>}
        </div>
    );
};

export default Colapsavel;
