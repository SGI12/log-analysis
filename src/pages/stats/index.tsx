import { ClosePopupButton } from '@/components/Buttons/buttons';
import Header from '@/components/Header/header';
import { H1Centered } from '@/components/Headings/Headings';
import { HomePageMainContainer, StatsBarContainer } from '@/components/containers/containers';
import React from 'react';

const Stats = () => {
    return (
        <HomePageMainContainer>
            <Header/>
            <H1Centered>Статистика</H1Centered>
            <StatsBarContainer>
                <ClosePopupButton>Круговая</ClosePopupButton>
                <ClosePopupButton>Столбчатая</ClosePopupButton>
            </StatsBarContainer>
        </HomePageMainContainer>
    );
};

export default Stats;