import React, { Component } from 'react';
import Divider from "@material-ui/core/Divider";
import CheckboxGroup from "./CheckboxGroup";
import RadioGroup from "./RadioGroup";
import axios from 'axios';
import CSVComponent from "./CSVReaderComponent";

var projectPost ={};

async function postCrop(){

    projectPost["project"] = "CROP";

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "proxy" : "false",
        }
      };

    const response = await axios.post('http://127.0.0.1:8000/climateVariablesHandler', {
       // project: 'CMIP5',
       projectPost,
      },axiosConfig)

      console.log(response.data)

}

class CropModelling extends Component {

    //<CSVComponent/>

    render() { 

        const items = [
            { id: 1, label: "DSSAT" },
            { id: 2, label: "EPIC" },
            { id: 3, label: "APSIM" },
            { id: 4, label: "SARAH-H" },
            { id: 5, label: "SARAH-O" },
            { id: 6, label: "STICS" },
            { id: 7, label: "WRSI" },
            { id: 8, label: "AQUACROP" },
            { id: 9, label: "Select All" }
          ];

          const dataSets = [
            { id: 1, label: "IIASA" },
            { id: 2, label: "MRDC" },
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

            <h3>Crop Model</h3>
                    <Divider style={{ margin: "6px 0" }} />
                <div className = "cropModel"> 
                    
                    <CheckboxGroup items={items} />
                    <Divider style={{ margin: "6px 0" }} />
                </div>

                <div className = "soilDataset"> 
                    <h3>Soil dataset</h3>
                    <Divider style={{ margin: "6px 0" }} />
                    <RadioGroup items={dataSets} />
                    <Divider style={{ margin: "6px 0" }} />
                </div>

                <div className = "calibration">
                    <h3>Calibration Files</h3>
                    <Divider style={{ margin: "6px 0" }} />
                    <div className = "csv"> 
                    <h1>Fertilizer</h1>
                 

                    <Divider style={{ margin: "6px 0" }} />
                </div>
                    <p>Fertilizer</p>
                    <p>Planting Method</p>
                    <p>Planting Density</p>
                    <Divider style={{ margin: "6px 0" }} />
                </div>

                <div className = "management">
                    <h3>Management Scenario</h3>
                    <Divider style={{ margin: "6px 0" }} />
                    <p>Intercropping</p>
                    <p>Rotation</p>
                    <p>Tillage</p>
                    <Divider style={{ margin: "6px 0" }} />
                </div>

                <div className = "agroMeteorological">
                    <h3>Agro-meteorological datasets</h3>
                    <Divider style={{ margin: "6px 0" }} />
                    <p>Meteorological variables dataset</p>
                    
                    <Divider style={{ margin: "6px 0" }} />
                </div>


                <h3>Crop Type</h3>
                    <Divider style={{ margin: "6px 0" }} />
                <div className = "cropModel"> 
                    
                    <CheckboxGroup items={cropType} />
                    <Divider style={{ margin: "6px 0" }} />
                </div>

                <div className ="myButton">
                <button onClick={postCrop}> RUN </button>
                </div>
                
            </div>
        
        </div> );

    }

}

export default CropModelling;