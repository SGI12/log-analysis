import { Inter } from "next/font/google"
import styled from "styled-components"
const inter = Inter({subsets: ['cyrillic']})


export const HomePageMainContainer = styled.div`

width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

export const HeaderContainer = styled.div`

width: 100%;
display: flex;
padding-top: 15px;
margin-bottom: 50px;
border-bottom: 1px solid #C6C6D0;
padding-left: 30px ;
`

export const HeaderButtonContainer =  styled.div`

display: flex;
justify-content: space-around;
padding-left: 10%;
align-items: center;
width: 100%;

`

export const TableMainContainer = styled.div.attrs({
    className: inter.className
})`

width: 95%;
padding-top: 60px;
margin-bottom: 30px;
`

export const ClustersListTopMenu = styled.div.attrs({
    className: inter.className
})`

display: flex;
padding: 0px 70px;
justify-content: center;
align-items: center;
gap: 7vw;
width: 100%;
margin-bottom: 70px;

`

export const UnclusteredLogsBlock = styled.div.attrs({
    className: inter.className
})`

width: 150px;
height: 150px;
border: 2px solid #C0754D;
transform: rotate(45deg);
font-size: 1vw;
color: #ffffff;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;

&>* {
    transform: rotate(-45deg);
    text-align: center;
}
&:hover {
    box-shadow: 0 0 1vw 2px #C0754D;
}
`

export const ClusterCirclesGridContainer = styled.div`


display: grid;
grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
grid-template-rows: repeat(auto-fill, minmax(120px, 350px));
align-self: center;
width: 80%;
height: 100%;

`

export const DescAndRecContainer = styled.div`

width: 100%;
padding: 150px 130px 0px 130px;
display: flex;
justify-content: space-between;


`

export const DescriptionContainer = styled.div`

display: flex;
flex-direction: column;
gap: 50px;

`

export const RecommendationContainer = styled.div`

padding: 30px;
border: 2px solid #B6410F;

`