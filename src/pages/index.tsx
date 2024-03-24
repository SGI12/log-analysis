'use client'
import Header from '@/components/Header/header';
import { H1Styled } from '@/components/Headings/Headings';
import TableMain from '@/components/Table/Table';
import {getLogs} from '@/http/logsAPI'
import { HomePageMainContainer } from '@/components/containers/containers';
import React, { useEffect, useState } from 'react';


const HomePage = () => {
   
    return (
        <div>
            <HomePageMainContainer>
                <Header/>
                <H1Styled>Аномальные логи</H1Styled>
                <TableMain/>
            </HomePageMainContainer>
        </div>
    );
};

export default HomePage;