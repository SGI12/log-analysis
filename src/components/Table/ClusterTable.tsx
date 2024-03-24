import React from 'react';
import { ClusterTableContainer, TableMainContainer } from '../containers/containers';
import { TableStyledMainPage } from './styled';
import { ChangeClusterText } from '../text/text';

const ClusterTable = ({props}:any) => {
    console.log(props)
    return (
        <ClusterTableContainer>
            <TableStyledMainPage>
                <tbody>
                {props.map((item:any) =>(
                    <tr key={item.id}>
                        
                        <td>{item.data}</td>
                        <td className='link'><ChangeClusterText>Сменить кластер</ChangeClusterText></td>
                    </tr>
                    
                ))}
                
                </tbody>
            </TableStyledMainPage>
            
        </ClusterTableContainer>
    );
};

export default ClusterTable;