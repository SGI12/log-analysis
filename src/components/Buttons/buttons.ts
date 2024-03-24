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