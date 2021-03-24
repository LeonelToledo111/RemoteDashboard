import React, { Component } from 'react';
import Divider from "@material-ui/core/Divider";
import CheckboxGroup from "./CheckboxGroup";
import RadioGroup from "./RadioGroup";

class PayoutOptimization extends Component {

    render() { 

        const items = [
            { id: 1, label: "Sentinel2A" },
            { id: 2, label: "MODIS" },
            { id: 3, label: "GaoFeng2" },
            { id: 4, label: "GoogleEarth" },,
            { id: 5, label: "Select All" }
          ];

          const cropType = [
            { id: 1, label: "Maize" },
            { id: 2, label: "Sweet maize" },
            { id: 3, label: "Rice" },
            { id: 4, label: "Wheat" },
            { id: 2, label: "Sunflower" },
            { id: 3, label: "Tobacco" },
            { id: 4, label: "Soybean" },
            { id: 2, label: "Sugar cane" },
          ];

          return ( 
            <div>
                <div>
                    <div className = "highResolutionRemote"> 
                        <h3>High Resolution Remote Sensing</h3>
                        <Divider style={{ margin: "6px 0" }} />
                        <CheckboxGroup items={items} />
                        <Divider style={{ margin: "6px 0" }} />
                    </div>
    
                    <div className = "farmCrop"> 
                        <h3>Farm-level Crop Yield Computations</h3>
                        <Divider style={{ margin: "6px 0" }} />
                        <RadioGroup items={cropType} />
                        <Divider style={{ margin: "6px 0" }} />
                    </div>
    
                    <div className = "computations">
                        <h3>Computations</h3>
                        <Divider style={{ margin: "6px 0" }} />
                        <p>Plot Mapping</p>
                        <p>Crop Recognition</p>
                        <p>Crop Yield</p>
                        <p>Payout Optimization</p>
                        <Divider style={{ margin: "6px 0" }} />
                    </div>
    
                    <div className = "policy">
                        <h3>Policy</h3>
                        <Divider style={{ margin: "6px 0" }} />
                        <p>Policy File</p>
                        <p>Loss File</p>
                        <Divider style={{ margin: "6px 0" }} />
                    </div>
    
                    <div className ="myButton">
                        <button> RUN </button>
                    </div>
                    
                </div>
            
            </div> );


    }

}

export default PayoutOptimization;