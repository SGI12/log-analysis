import Header from '@/components/Header/header';
import { H1Centered } from '@/components/Headings/Headings';
import { ClusterCircleElement } from '@/components/cluster-circle/circles';
import { ClusterCirclesGridContainer, ClustersListTopMenu, HomePageMainContainer, UnclusteredLogsBlock } from '@/components/containers/containers';
import { SearchFieldStyled } from '@/components/inputs/styled';
import { LinkNoStyled } from '@/components/links/styled';
import { getClusters } from '@/http/clustersAPI';
import Link from 'next/link';

import React, { useEffect, useMemo, useState } from 'react';




const ClustersList = () => {
    function genRandom() {
        const randomArr = []
        for (let i = 0; i < 100; i++) {
            randomArr.push(Math.floor(Math.random() * (300 - 125 + 1) + 125))
            
        }
        return randomArr;
      }
    const genRandomMargin = () => {
        const randomArr = []
        for (let i = 0; i < 100; i++) {
            randomArr.push(Math.floor(Math.random() * (100 - 50 + 1) + 50))
            
        }
        return randomArr;
    }
      const randomSize = useMemo(() => genRandom(),
        []
      );
    const randomMar = useMemo(() => genRandomMargin(), []);
   
    
    const [clusters, setClusters] = useState<any>([])
    const [searchText, setSearchText] = useState('')
    const searchHandler = (e:any) => {
        setSearchText(e.target.value)
        setClusters((prevState:any) => {
            const newState = prevState.map((obj:any) => {
                console.log(obj.name)
                if ((obj.name).match(searchText)) {
                    return {...obj, glowed: true}
                }
                else if (searchText == '') {
                    return {...obj, glowed: false}
                }
                else{
                    return {...obj, glowed: false}
                }
                
            })
            return newState;
        })
       
            
            
      

    }
    useEffect(() => {
        const fetchData =  () => {
            
            getClusters()
            .then((res) => {
                 setClusters(res.data.result)
                
            })
          
            
        }
        
        fetchData()
        
    }, [])

    return (
        <div>
            <HomePageMainContainer>
                <Header />
                <ClustersListTopMenu>
                    <LinkNoStyled href={'/cluster_info/unknown'}><UnclusteredLogsBlock><div>Логи без кластера</div></UnclusteredLogsBlock></LinkNoStyled>
                    <H1Centered>Список кластеров</H1Centered>
                    <SearchFieldStyled value={searchText} onChange={searchHandler} placeholder='Поиск...'/>
                </ClustersListTopMenu>
                <ClusterCirclesGridContainer>
                    {clusters.map((item:any, index:any) => (
                        <LinkNoStyled style={{textDecoration: 'none', color: '#ffffff'}} href={`/cluster_info/${item.name}`}>
                        <ClusterCircleElement className = {item.glowed ? 'glowed' : ''} key={item.id} size={randomSize[index]} style={{  margin: randomMar[index] + `px` }}>{item.name}</ClusterCircleElement>
                        </LinkNoStyled>
                    ))}
                    
                </ClusterCirclesGridContainer>
            </HomePageMainContainer>
        </div>
    );
};

export default ClustersList;

