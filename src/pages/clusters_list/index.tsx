import Header from '@/components/Header/header';
import { H1Centered } from '@/components/Headings/Headings';
import { ClusterCircleElement } from '@/components/cluster-circle/circles';
import { ClusterCirclesGridContainer, ClustersListTopMenu, HomePageMainContainer, UnclusteredLogsBlock } from '@/components/containers/containers';
import { SearchFieldStyled } from '@/components/inputs/styled';
import { getClusters } from '@/http/clustersAPI';

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
   
    const [searchedClusters, setSearchedClusters] = useState<any>([])
    const [clusters, setClusters] = useState<any>([])
    const [searchText, setSearchText] = useState('')
    const searchHandler = (e:any) => {
        setSearchText(e.target.value)

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
                    <UnclusteredLogsBlock><div>Логи без кластера</div></UnclusteredLogsBlock>
                    <H1Centered>Список кластеров</H1Centered>
                    <SearchFieldStyled value={searchText} onChange={searchHandler} placeholder='Поиск...'/>
                </ClustersListTopMenu>
                <ClusterCirclesGridContainer>
                    {clusters.map((item:any, index:any) => (
                        
                        <ClusterCircleElement key={item.id} size={randomSize[index]} style={{  margin: randomMar[index] + `px` }}>{item.name}</ClusterCircleElement>
                    ))}
                    
                </ClusterCirclesGridContainer>
            </HomePageMainContainer>
        </div>
    );
};

export default ClustersList;

