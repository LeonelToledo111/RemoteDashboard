import React, { Component } from 'react';
import Divider from "@material-ui/core/Divider";
import SelectP from './SelectP';



class Visualization extends Component {

    constructor(props){
        super(props);
        this.state = {
            refVis: this.props.refVis,
            refSelect: React.createRef(),
            vars: [],
        };
        this.handleUpdate = this.handleUpdate.bind(this)
        this.makeSelect = this.makeSelect.bind(this)
    }

    async handleUpdate(vari){
        this.state.refVis().var=vari;
        this.makeSelect( await this.state.refVis().serverTiffasy() )
    }

    makeSelect(vars){
        this.state.refSelect.handleUpdate(vars);
    }

    render() { 
        
        return ( 
        <div>
            <div>

            <h3>Visualization Module</h3>
                    <Divider style={{ margin: "6px 0" }} />
                

                {/* <div className = "soilDataset"> 
                    <h3>GeoTIFF</h3>

                </div>

                <div className = "calibration">
                    <h3>Other Type of file...</h3>
                    <Divider style={{ margin: "6px 0" }} />
                </div> */}
                    
            </div>

                {/* <h3>Crop Type</h3>
                    <Divider style={{ margin: "6px 0" }} /> */}
                

                
            <div className ="myButton">
                <button onClick={
                    async ()=>{
                        this.makeSelect( await this.state.refVis().serverTiffasy({
                            file:""
                        }) )
                    }}> Select File </button>
            </div>
            <br/>
            {/* https://www.storyblok.com/tp/react-dynamic-component-from-json */}
            <SelectP childRef={ref => (this.state.refSelect= ref)} event={this.handleUpdate} />
                
        </div>
        
         );

    }

}




   
  

export default Visualization;