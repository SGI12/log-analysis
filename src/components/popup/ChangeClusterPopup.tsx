import React, { Dispatch, SetStateAction, useState } from 'react';
import { ChangeClusterBackdrop, ChangeClusterPopupModal, DropDownContainer, DropDownItemsContainer } from '../containers/containers';
import { ChangeClusterText, TextBold, TextOrange } from '../text/text';
import { ChangeClusterButton, ClosePopupButton, DropDownButton } from '../Buttons/buttons';
import { DropDownItem } from '../dropdown/styled';
import Image from 'next/image';
import { changeCluster } from '@/http/logsAPI';

interface PopupProps {
    show: Dispatch<SetStateAction<boolean>>
    text?: string
    clusters?: any,
    logID: number
}
const ChangeClusterPopup = ({ clusters, show, logID }: PopupProps) => {
    const [labelText, setLabelText] = useState('Присвойте кластер логу')
    const [showList, setShowList] = useState(false)
    const [clusterID, setClusterID] = useState(-1)
    const changeClusterHandler = (e: any) => {
        changeCluster(logID, clusterID)
        .then((res) => {
            console.log(res)
        })
        .catch((e:any) => {
            console.log(e)
        })
        .finally(() => {
            show(false)
        })
    }
    
    return (
        <ChangeClusterBackdrop>
            <ChangeClusterPopupModal>
                <TextBold>
                    Пожалуйста, выберите кластер, который хотите присвоить логу:
                </TextBold>
                <DropDownContainer>
                    <DropDownButton className={showList ? 'animated' : ''} onClick={(() => setShowList(!showList))}>{labelText} <Image src={'/dropdownarrow.png'} width={15} height={10} alt='arrow' /></DropDownButton>
                    {showList && <DropDownItemsContainer className={showList ? 'animated' : ''}>
                        {clusters?.map((item: any) => (
                            <DropDownItem id={item.id} onClick={(e) => { 
                                setClusterID(item.id)
                                setLabelText(item.name)
                                setShowList(false)
                                
                            }} key={item.id}>{item.name}</DropDownItem>
                        ))}

                    </DropDownItemsContainer>}
                </DropDownContainer>
                <ChangeClusterButton onClick={(e) => changeClusterHandler(e)}>Сменить</ChangeClusterButton>
                <ChangeClusterText onClick={() => show(false)}>Закрыть окно</ChangeClusterText>
            </ChangeClusterPopupModal>
        </ChangeClusterBackdrop>

    );
};

export default ChangeClusterPopup;