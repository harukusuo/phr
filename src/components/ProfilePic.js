import React from 'react';
import '../styles/ProfilePic.css';

const ProfilePic = ({ src, alt, className, width = 50, height = 50 }) => {
    return (
        <img
            src={src}
            alt={alt}
            className={`profile-pic ${className}`}
            style={{ width: `${width}px`, height: `${height}px` }}
        />
    );
};

export default ProfilePic;