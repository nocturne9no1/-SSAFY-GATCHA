import React from "react";
import ReactLoading from 'react-loading';

export default function Loader({type, color, message}) {
  return (
    <div>
      <div>
        <h2>{message}</h2>
        <h2 style={{marginBottom: 20 + 'px', fontSize: 30 + 'px'}}>NOW LOADING</h2>
        <ReactLoading 
          type="spokes"
          color={color}
          height={'100%'}
          width={'100%'}
        />
      </div>
    </div>
  );
}