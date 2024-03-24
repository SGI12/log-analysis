import Header from '@/components/Header/header';
import { H1Centered, H2Styled } from '@/components/Headings/Headings';
import ClusterTable from '@/components/Table/ClusterTable';
import { DescAndRecContainer, DescriptionContainer, HomePageMainContainer, RecommendationContainer } from '@/components/containers/containers';
import { TextOrange, TextPrimary } from '@/components/text/text';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ClusterInfo = (cluster:any) => {
    const [header, setHeader] = useState('Логи без кластера')
    const data = (cluster.cluster)[0]
    const logs = (cluster.logs)
    useEffect(() => {
        if (data.name !== 'unknown') {
            setHeader(data.name)
        }
    }, [])
    console.log(logs)
    return (
        <div>
            <HomePageMainContainer>
                <Header/>
                <H1Centered>{header}</H1Centered>
                <DescAndRecContainer>
                    <DescriptionContainer>
                        <H2Styled>Описание</H2Styled>
                        <TextPrimary>{data.description}</TextPrimary>
                    </DescriptionContainer>
                    {data.name !== 'unknown' &&
                    <RecommendationContainer>
                    <TextPrimary>Рекомендация по устранению:</TextPrimary>
                    <TextOrange>{data.recommendation}</TextOrange>
                </RecommendationContainer>}
                </DescAndRecContainer>
                <H2Styled>Список логов:</H2Styled>
                <ClusterTable props={logs}/>
            </HomePageMainContainer>
        </div>
    );
};

export default ClusterInfo;



export async function getServerSideProps(ctx:any) {
    
    const res = await axios.get('http://80.78.255.223:80/logs_clusters');
    const data = res.data.result
    const name = ctx.query.id
    const filtered = await data.filter((obj:any) => {
        return obj.name === name
    })
    const resLogs = await axios.get('http://80.78.255.223:80/anomaly_logs', {
        params: {
                'url': '' ,
                'last_id': 0,
        }
    })
    const dataLogs = resLogs.data.result
    
    const filteredLogs = await dataLogs.filter((obj: any) =>{
        
        return obj.cluster_id == filtered[0].id
    })
    return {
        props: {
            cluster: filtered,
            logs: filteredLogs
        }
    };
}