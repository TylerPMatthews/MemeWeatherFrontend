import React from 'react';
import styled from "styled-components";

const StyledHome = styled.div`
display:flex;
justify-content:center;

img{
    width:20rem;
    height:20rem;
}
`

const MemeDisplay = (props) => {


    return (
       
        <StyledHome>
            <img src={props.randomWeather.img_url} alt='test' />
        </StyledHome>
    )
}
export default MemeDisplay;