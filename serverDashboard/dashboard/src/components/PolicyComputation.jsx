import React, { Component } from 'react';
import Divider from "@material-ui/core/Divider";
import CheckboxGroup from "./CheckboxGroup";
import RadioGroup from "./RadioGroup";
import Collapse from "@material-ui/core/Collapse";
import CSVComponent from "./CSVReaderComponent";


class PolicyComputation extends Component {

    render() { 

        const items = [
            { id: 1, label: "Drought Coverage" },
            { id: 2, label: "Excess Rainfall Coverage" },
            { id: 3, label: "Excess Temperature Coverage" },
            { id: 4, label: "Random Deficit Coverage" },
            { id: 5, label: "Excess wind /  Wind Gusts Coverage" },
            { id: 6, label: "Soil Moisture Index Coverage" },
            { id: 7, label: "Hybrid Drought Index Coverage" },
            { id: 8, label: "Select All" },
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
                        <h3>Exposure Characteristics</h3>
                        <p>Acreage File</p>
                        <p>Exposure File</p>
                        <p>Income File</p>
                        <p>Crop Price File</p>
                    </div>

                    <Divider style={{ margin: "6px 0" }} />
                </div>


                <div className = "coordinates"> 
                    <h1>Input Files</h1>
                    <p>Indices File 1</p>
                    <CSVComponent/>
                    <p>Indices File 2</p>
                    <p>Indices File 3</p>


                    <Divider style={{ margin: "6px 0" }} />
                </div>

                <div className ="myButton">
                    <button> RUN </button>
                </div>
                
            </div>
        
        </div> );

    }
}
 
export default PolicyComputation;