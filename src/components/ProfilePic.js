import React from 'react';
import '../styles/ProfilePic.css';
import noUser from '../assets/noUser.png';

const ProfilePic = ({ src, alt, className, width = 50, height = 50 }) => {
    return (
        <img
            src={src || noUser}
            alt={alt}
            className={`profile-pic ${className}`}
            style={{ width: `${width}px`, height: `${height}px`, transform: 'none' }} // Remove qualquer transformação
        />
    );
};

export default ProfilePic;