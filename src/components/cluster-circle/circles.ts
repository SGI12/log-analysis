import styled, { keyframes } from "styled-components";


const upwards = keyframes`
0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-20px);
  }


`


export const ClusterCircleElement = styled.div<{ size?: number }>`

border: 2px solid #C0754D;
border-radius: 50%;
width: ${props => props.size + `px`};
height: ${props => props.size + `px`};
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;

&:hover {
    box-shadow: 0 0 1vw 2px #C0754D;
    animation: ${upwards} 1s forwards;
}
`