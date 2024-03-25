import { Inter } from "next/font/google"
import styled, { keyframes } from "styled-components"

const inter = Inter({subsets: ['cyrillic']})

const dropDownAnimation = keyframes`
0% { 
    opacity: 0;
    transform: translateY(-60px)
  }

  100% {
    opacity: 1;
    transform: translateY(0)
  }


`
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
margin-bottom: 100px;

`

export const DescriptionContainer = styled.div`

display: flex;
flex-direction: column;
gap: 50px;

`

export const RecommendationContainer = styled.div`

padding: 30px;
border: 2px solid #B6410F;
display: flex;
flex-direction: column;
gap: 30px;
border-radius: 20px;
`

export const ClusterTableContainer = styled(TableMainContainer)`

display: flex;
gap: 50px;
justify-content: space-between;


`

export const ChangeClusterPopupModal = styled.div`

display: flex;
flex-direction: column;
background-color: #2D2D2D;
backdrop-filter: blur(40px);
padding: 20px 30px;
width: 450px;
border-radius: 20px;
transition: all 0.2s ease-in-out;
text-align: center;
backdrop-filter: blur(40px);
align-items: center;
`

export const ChangeClusterBackdrop = styled.div`

width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
position: fixed;
z-index: 5;
top: 0;
bottom: 0;
left: 0;
right: 0;
background-color:rgba(45,45,45,0.5);
backdrop-filter: blur(20px);

`

export const DropDownContainer = styled.div`

display: flex;
flex-direction: column;
margin-bottom: 20px;
width: 100%;
`

export const DropDownItemsContainer = styled.div`

display: flex;
flex-direction: column;
&::-webkit-scrollbar{
    display: none;
}

:last-child {
    border-radius: 0 0 20px 20px;
    margin-bottom: 20px;
}
&.animated {
    animation: ${dropDownAnimation} 0.5s ease-in-out;
    
}

`

export const StatsBarContainer = styled.div`

display: flex;
justify-content: space-between;
width: 50vw;
`