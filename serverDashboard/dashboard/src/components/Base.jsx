import React, { Component } from 'react';
import Dashboard from './Dashboard';
import FormsManager from './Forms';
import MapboxContainer from './map';
import MapboxContainer2 from './map2';
import MapboxContainerVis from './mapVis'
import './../index.css';



class BaseLayout extends Component {

    constructor(props){
        super(props);
        this.refVis = React.createRef();
    }

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
                <MapboxContainerVis
                    childRef={ref=>{this.refVis=ref;}}
                />
            </div>


            <div className="flexLeft">

            <div className ="leftOverlay">
                    <Dashboard/>     
            </div>   

            <div className ="moduleOverlay">
                    <FormsManager
                        refVis={()=>this.refVis}
                    /> 
            </div> 

            </div>

            
        </div>
        );

   }


}
 
export default BaseLayout;