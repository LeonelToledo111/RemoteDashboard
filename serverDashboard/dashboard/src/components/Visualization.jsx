import React, { Component } from 'react';
import Divider from "@material-ui/core/Divider";

class Visualization extends Component {


    render() { 

        
        return ( 
        <div>
            <div>

            <h3>Visualization Module</h3>
                    <Divider style={{ margin: "6px 0" }} />
                

                <div className = "soilDataset"> 
                    <h3>GeoTIFF</h3>

                </div>

                <div className = "calibration">
                    <h3>Other Type of file...</h3>
                    <Divider style={{ margin: "6px 0" }} />
                </div>
                    
                </div>

                <h3>Crop Type</h3>
                    <Divider style={{ margin: "6px 0" }} />
                

                <div className ="myButton">
                    <button> RUN </button>
                </div>
                
            </div>
        
         );

    }

}

export default Visualization;