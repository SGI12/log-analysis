import { Inter } from "next/font/google";
import styled from "styled-components";

const inter = Inter({subsets: ['cyrillic']})

export const SearchFieldStyled = styled.input.attrs({
    className: inter.className,
    
})`

border-radius: 25px;
color: #B6410F;
width: 295px;
height: 50px;
background-color: #C6C6D0;
padding-left: 40px;
background-image: url('/search.svg');
background-position: 17px 15px; 
background-repeat: no-repeat;
border: none;
&::placeholder {
    color: #B6410F; 
}
&:focus {
    outline: none;
    box-shadow: 0 0 10px 1px #B6410F; 
}

&::-webkit-search-cancel-button {
    appearance: none;
}
`