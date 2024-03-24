import Header from '@/components/Header/header';
import { H1Centered, H2Styled } from '@/components/Headings/Headings';
import { DescAndRecContainer, DescriptionContainer, HomePageMainContainer } from '@/components/containers/containers';
import { TextPrimary } from '@/components/text/text';
import axios from 'axios';
import { GetStaticPaths } from 'next';
import React, { useEffect, useState } from 'react';

const ClusterInfo = (cluster:any) => {
    const [header, setHeader] = useState('Логи без кластера')
    const data = (cluster.cluster)[0]
    useEffect(() => {
        if (data.name !== 'unknown') {
            setHeader(data.name)
        }
    }, [])
    return (
        <div>
            <HomePageMainContainer>
                <Header/>
                <H1Centered>{header}</H1Centered>
                <DescAndRecContainer>
                    <DescriptionContainer>
                        <H2Styled>Описание</H2Styled>
                        <TextPrimary>{data  .description}</TextPrimary>
                    </DescriptionContainer>
                    
                </DescAndRecContainer>
            </HomePageMainContainer>
        </div>
    );
};

export default ClusterInfo;



export async function getServerSideProps(ctx:any) {
    const res = await axios.get('http://80.78.255.223:80/logs_clusters');
    const data = res.data.result
    const id = ctx.query.id
    const filtered = await data.filter((obj:any) => {
        return obj.name === id
    })
    return {
        props: {
            cluster: filtered
        }
    };
}