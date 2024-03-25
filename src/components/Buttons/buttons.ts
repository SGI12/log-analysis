import vars from "@/styles/vars";
import { Inter } from "next/font/google";
import styled from "styled-components";
const inter = Inter({ subsets: ['cyrillic'] })

export const ButtonDefault = styled.button.attrs({
    className: inter.className,
})`


min-width: 144px;
background-color: #C0754D;
border: none;
font-size: 1em;
padding: 15px 66px;
border-radius: 25px;
color: #C0754D;
cursor: pointer;
`

export const ButtonHeader = styled(ButtonDefault)`

background-color: transparent;
border: 1px solid #C0754D;

&:hover {
    background-color: #C0754D;
    color: #C6C6D0;
}

&:active {
    background-color: #B6410F;
    color: #C6C6D0;
}
`

export const DropDownButton = styled.button`

cursor: pointer;
margin-top: 30px;
padding: 15px 10px;
width: 100%;
color: #000000;
font-size: 20px;
background-color: #D9D9D9;
border-radius: 20px;
border: none;
&.animated {
    border-radius: 20px 20px 0 0;
}
`

export const ChangeClusterButton = styled(ButtonDefault)`

color: #ffffff;
margin-bottom: 30px;
&:hover {
    background-color: ${vars.orange_primary};
}
width: 100%;
`

export const ClosePopupButton = styled(ChangeClusterButton)`

background-color: transparent;
border: 1px solid ${vars.orange};
width: 70%;
&:hover {
    background-color: ${vars.orange_primary};
}
`

export const ChartsButton = styled(ButtonDefault)`

width: 15vw;
color: #ffffff;
background-color: transparent;
border: 1px solid ${vars.orange};
&:hover {
    background-color: ${vars.orange_primary};
}
&.active {
    background-color: #B6410F;
}
`