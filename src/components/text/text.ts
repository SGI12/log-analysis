import vars from "@/styles/vars";
import styled from "styled-components";

export const TextDefault = styled.p`

font-size: 2em;



`

export const TextPrimary = styled(TextDefault)`
color: ${vars.orange_primary};
`

export const TextOrange = styled(TextDefault)`

color: ${vars.orange};
`

export const ClusterText = styled.span`

text-decoration: underline;
opacity: 0.5;
&:hover {
    opacity: 1;
}

`

export const ChangeClusterText = styled(TextDefault)`

font-size: 1em;
white-space: nowrap;
vertical-align: middle;
text-decoration: underline;
color: ${vars.orange_primary};
&:hover {
    color: ${vars.orange}
}
cursor: pointer;
`

