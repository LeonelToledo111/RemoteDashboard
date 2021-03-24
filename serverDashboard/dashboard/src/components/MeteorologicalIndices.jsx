import React, { Component } from 'react';
import Divider from "@material-ui/core/Divider";
import CheckboxGroup from "./CheckboxGroup";
import RadioGroup from "./RadioGroup";
import Collapse from "@material-ui/core/Collapse";


class MeteorologicalIndices extends Component {

    render() { 

        const items = [
            { id: 1, label: "Drought Index" },
            { id: 2, label: "Excess Rainfall" },
            { id: 3, label: "Excess Temperature" },
            { id: 4, label: "Random Deficit Index" },
            { id: 5, label: "Excess wind /  Wind Gusts" },
            { id: 6, label: "Soil Moisture Index" },
            { id: 7, label: "Hybrid Drought Index" },
            { id: 8, label: "Select All" },
          ];

          const dataSets = [
            { id: 11, label: "CHIRPS" },
            { id: 12, label: "CMORPH" },
            { id: 13, label: "ARC 2" },
            { id: 14, label: "RFE" },
          ];


        return ( 
        <div>
            <div>
                <div className = "indexType"> 
                    <div className="block">
                        <h3>Index Type</h3>
                        <CheckboxGroup items={items} />
                    </div>

                    <Divider style={{ margin: "6px 0" }} />
                </div>

                <div className = "precipitation"> 
                    <div className="block">
                        <h3>Precipitation Datasets</h3>
                        <RadioGroup items={dataSets} />
                    </div>

                    <Divider style={{ margin: "6px 0" }} />
                </div>


                <div className = "coordinates"> 
                    <h1>Computation Files</h1>
                    <p>Crop Type</p>
                    <p>Weather</p>
                    <p>Locations</p>


                    <Divider style={{ margin: "6px 0" }} />
                </div>

                <div className ="myButton">
                    <button> RUN </button>
                </div>
                
            </div>
        
        </div> );

    }
}
 
export default MeteorologicalIndices;