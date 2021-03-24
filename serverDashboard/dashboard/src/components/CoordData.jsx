import React, { Component } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setMinLon} from './../actions';
import {setMaxLon} from './../actions';
import {setMaxLat} from './../actions';
import {setMinLat} from './../actions';


function Something(maxLatValue,minLatValue,maxLonValue,minLonValue){
   // console.log(maxLatValue.maxLonValue);
    const dispatch = useDispatch();

    if(typeof(maxLatValue.maxLatValue) !== 'undefined'){
        dispatch(setMaxLat(maxLatValue.maxLatValue));
        dispatch(setMaxLon(maxLatValue.maxLonValue));
        dispatch(setMinLon(maxLatValue.minLonValue));
        dispatch(setMinLat(maxLatValue.minLatValue));
    }
    


    return(
        <p></p>
    );
}

function CoordData(maxLat, minLat, maxLon,minLon){
    
    return(
       
        <div> 
            
            <Something
            maxLatValue ={maxLat}
            minLatValue ={minLat}
            maxLonValue ={maxLon}
            minLonValue ={minLon}
            />
        </div>
    );


}

export default CoordData;