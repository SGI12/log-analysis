import React from 'react';
import { ClusterTableContainer, TableMainContainer } from '../containers/containers';
import { TableStyledMainPage } from './styled';
import { ChangeClusterText } from '../text/text';

const ClusterTable = ({props, show, setLogID}:any) => {
    console.log(props)
    const clickLinkHandler = (event:any) => {
        console.log(event.target.id)
        setLogID(event.target.id)
        show(true)
    }
    return (
        <ClusterTableContainer>
            <TableStyledMainPage>
                <tbody>
                {props.map((item:any) =>(
                    <tr key={item.id}>
                        
                        <td>{item.data}</td>
                        <td className='link'><ChangeClusterText id={item.id}  onClick={(event) => clickLinkHandler(event)}>Сменить кластер</ChangeClusterText></td>
                    </tr>
                    
                ))}
                
                </tbody>
            </TableStyledMainPage>
            
        </ClusterTableContainer>
    );
};

export default ClusterTable;