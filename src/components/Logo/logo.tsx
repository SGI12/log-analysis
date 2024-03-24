import Image from 'next/image';
import React from 'react';

const Logo = () => {
    return (
        <Image style={{marginBottom: '15px'}} src={'/logo.png'} width={75} height={65} alt='logo'/>
    );
};

export default Logo;