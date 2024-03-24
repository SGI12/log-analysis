import styled from "styled-components";

export const TableStyledMainPage = styled.table`

width: 100%;
border-spacing:  12px 0px;


tr:nth-child(odd) {
    td {
        background-color: #6f5b52;
    }
}

th {
    font-size: 3em;
    color: #C6C6D0;
    background-color: transparent;
    padding: 5px 50px;
    text-align: center;
    font-weight: 400;
    margin-bottom: 18px;
}
td {
    
    
    text-align: center;
    padding: 15px;
    border: 1px solid #6f5b52;
    color: #C6C6D0;
    font-size: 1.25em;
}

tr td:nth-child(2) {
    text-align: left;
}

tr td:last-child span {
    cursor: pointer;
    
}

tr td.link {
    background-color: transparent;
    border: none;
}


`

