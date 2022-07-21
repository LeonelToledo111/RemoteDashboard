import React, { Component } from 'react';
import Dashboard from './Dashboard';
import FormsManager from './Forms';
import MapboxContainer from './map';
import MapboxContainer2 from './map2';
import MapboxContainerVis from './mapVis'
import './../index.css';



class BaseLayout extends Component {

    //<FormsManager selection= {this.state.selectionChoice}/>
/*
    render() { 

        return ( 
            <div className ="wrapper">
                <div className ="left">
                    <Dashboard/>     
                </div>

                <div id ="floatingLeft">
                    <FormsManager/>
                </div>

                <div className ="centerMap">

                    <MapboxContainer/>

                </div>

                <div id ="floatingRight">
                   

                </div>

            </div> 
            
            
            );
    }
    */

   render() {

    return ( 
        <div className ="baseWrapper">
            <div className="mapWrapper">
                {/* <MapboxContainer2/> */}
                <MapboxContainerVis/>
            </div>


            <div className="flexLeft">

            <div className ="leftOverlay">
                    <Dashboard/>     
            </div>   

            <div className ="moduleOverlay">
                    <FormsManager/> 
            </div> 

            </div>

            
        </div>
        );

   }


}
 
export default BaseLayout;