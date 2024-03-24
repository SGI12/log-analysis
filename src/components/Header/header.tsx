import React from 'react';
import { HeaderButtonContainer, HeaderContainer } from '../containers/containers';
import Logo from '../Logo/logo';
import { ButtonDefault, ButtonHeader } from '../Buttons/buttons';
import Link from 'next/link';

const Header = () => {
    return (
        <HeaderContainer>
            <Logo/>
            <HeaderButtonContainer>
                <Link href={'/'}>
                    <ButtonHeader>Главная</ButtonHeader>
                </Link>
                <Link href={'/clusters_list'}>
                <ButtonHeader>Список кластеров</ButtonHeader>
                </Link>
                <ButtonHeader>Логи без кластеров</ButtonHeader>
                <ButtonHeader>Статистика</ButtonHeader>
            </HeaderButtonContainer>
            
        </HeaderContainer>
    );
};

export default Header;