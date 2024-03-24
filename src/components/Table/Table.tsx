import React, { useEffect, useState } from 'react';
import { TableMainContainer } from '../containers/containers';
import { TableStyledMainPage } from './styled';
import { getLogs } from '@/http/logsAPI';
import {getClusters} from '@/http/clustersAPI';
import { LinkNoStyled } from '../links/styled';
import { ClusterText } from '../text/text';

const TableMain = () => {
    const [lastID, setLastID] = useState('0')
    const [logs, setLogs] = useState([])
    const [clusters, setClusters] = useState<any>([])
    const [toolTip, setTooltip] = useState(false)
    const getAllClusters = () => {
        getClusters()
        .then((res:any) => {
            setClusters(res.data.result)
        })
    }
    const getAllLogs = () => {
        getLogs(lastID)
        .then((res) => {
            setLogs(res.data.result)
            
        })
        
        .catch((err:any) => {
            console.log(err)
        })
    }
    useEffect(() => {
        getAllClusters()
        getAllLogs()
        
    }, [])
    useEffect(() => {
        
    const interval = setInterval(getAllLogs, 5000)
    return () => {
        clearInterval(interval);
      };
    }, [])
    return (
        <TableMainContainer>
            <TableStyledMainPage>
                <tbody>
                <tr>
                    <th>ID</th>
                    <th>Сообщение</th>
                    <th>Кластер</th>
                </tr>
                {logs.map((item:any) =>(
                    <tr key={item.id}>
                        <td > {item.id}</td>
                        <td>{item.data}</td>
                        <td><LinkNoStyled href={`cluster_info/${clusters[parseInt(item.cluster_id)]?.name}`}><ClusterText>{clusters[parseInt(item.cluster_id)]?.name}</ClusterText></LinkNoStyled></td>
                    </tr>
                ))}
                </tbody>
            </TableStyledMainPage>
        </TableMainContainer>
    );
};

export default TableMain;