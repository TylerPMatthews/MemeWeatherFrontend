import React from 'react';

const MemeDisplay = (props) => {
    return (
       
        <div>
            <img src={props.randomWeather.img_url} alt='test' />
        </div>
    )
}
export default MemeDisplay;