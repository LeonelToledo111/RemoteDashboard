import React, { Component } from 'react';
import Divider from "@material-ui/core/Divider";
import CheckboxGroup from "./CheckboxGroup";
import RadioGroup from "./RadioGroup";
import axios from 'axios';

import DataParser from "./DataParser";
import {useSelector, useDispatch} from 'react-redux';
import {setValue} from './../actions';
import DateRange from "./DateRange";

var selectedValue;
var selectedItem=[];

function handleChange(){

}


        
async function getDataAxios(){

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "proxy" : "false",
        }
      };
    // xhr.open('GET', 'https://dog.ceo/api/breeds/list/all')
    const response =await axios.get("http://192.168.1.90:8000/buttonCode",axiosConfig)
 // const response =await axios.get("https://dog.ceo/api/breeds/list/all")
    console.log(response.data)
}

function purr(){
    var status;
    window.alert("PURR");
    for(var i=1;i<10;i++){
        var idTag="items"+i;
        status = document.getElementById("items"+i);
        window.alert(status.checked);
        selectedItem[i-1]=status.checked;
    }
    
}

async function postDataAxios(){

    purr();

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "proxy" : "false",
        }
      };

    const response = await axios.post('http://192.168.1.134:8000/meteorologicalVariablesHandler', {
        firstName: 'Fred',
        lastName: 'Flintstone',
        m_u_component_of_wind : selectedItem=[0],
        m_v_component_of_wind : 'value',
        m_dewpoint_temperature:  'value',
        m_temperature : 'value',
        surface_net_solar_radiation :'value',
        total_precipitation: 'value',
        surface_pressure: 'value',
        forecast_albedo: 'value',
        evaporation_from_bare_soil: 'value', 
        evaporation_from_open_water_surfaces_excluding_oceans: 'value',
        evaporation_from_the_top_of_canopy: 'value',
        evaporation_from_vegetation_transpiration: 'value',
        lake_bottom_temperature: 'value',
        lake_ice_depth: 'value',
        lake_ice_temperature: 'value',
        lake_mix_layer_depth: 'value',
        lake_mix_layer_temperature: 'value',
        lake_shape_factor: 'value',
        lake_total_layer_temperature: 'value',
        leaf_area_index_high_vegetation: 'value',
        leaf_area_index_low_vegetation: 'value',
        potential_evaporation: 'value',
        runoff: 'value',
        skin_reservoir_content: 'value',
        skin_temperature: 'value',
        snow_albedo: 'value',
        snow_cover: 'value',
        snow_density: 'value',
        snow_depth: 'value',
        snow_depth_water_equivalent: 'value', 
        snow_evaporation: 'value',
        snowfall: 'value',
        snowmelt: 'value',
        soil_temperature_level_1: 'value', 
        soil_temperature_level_2: 'value',
        soil_temperature_level_3: 'value',
        soil_temperature_level_4: 'value',
        sub_surface_runoff: 'value',
        surface_latent_heat_flux: 'value',
        surface_net_thermal_radiation: 'value',
        surface_runoff : 'value',
        surface_sensible_heat_flux:'value',
        surface_solar_radiation_downwards: 'value', 
        surface_thermal_radiation_downwards: 'value',
        temperature_of_snow_layer: 'value',
        total_evaporation: 'value',
        volumetric_soil_water_layer_1: 'value', 
        volumetric_soil_water_layer_2: 'value',
        volumetric_soil_water_layer_3: 'value',
        volumetric_soil_water_layer_4: 'valueFinal',
      },axiosConfig)

      console.log(response.data)

}

function  MetClone2() { 


    const minLon = useSelector(state=>state.min_lon);
    const maxLon = useSelector(state=>state.max_lon);
    const minLat = useSelector(state=>state.min_lat);
    const maxLat = useSelector(state=>state.max_lat);

        const items = [
            { id: 1, label: "10m u-component of wind", value: "true" },
            { id: 2, label: "10m v-component of wind", value: "false" },
            { id: 3, label: "2m dewpoint temperature", value: "true"},
            { id: 4, label: "2m temperature", value: "false" },
            { id: 5, label: "Evaporation from bare soil", value: "false" },
            { id: 6, label: "Evaporation from open water surfaces excluding oceans", value: "false" },
            { id: 7, label: "Evaporation from the top of canopy", value: "false" },
            { id: 8, label: "Evaporation from vegetation transpiration", value: "false" },
            { id: 9, label: "Forecast albedo", value: "false" },
            { id: 10, label: "Lake bottom temperature", value: "false" },
            { id: 11, label: "Lake ice depth", value: "false" },
            { id: 12, label: "Lake ice temperature", value: "false" },
            { id: 13, label: "Lake mix-layer depth", value: "false" },
            { id: 14, label: "Lake mix-layer temperature", value: "false" },
            { id: 15, label: "Lake shape factor", value: "false" },
            { id: 16, label: "Lake total layer temperature", value: "false" },
            { id: 17, label: "Leaf area index, high vegetation", value: "false" },
            { id: 18, label: "Leaf area index, low vegetation", value: "false" },
            { id: 19, label: "Potential evaporation", value: "false" },
            { id: 20, label: "Runoff", value: "false" },
            { id: 21, label: "Skin reservoir content", value: "false" },
            { id: 22, label: "Skin temperature", value: "false" },
            { id: 23, label: "Snow albedo", value: "false" },
            { id: 24, label: "Snow cover", value: "false" },
            { id: 25, label: "Snow density", value: "false" },
            { id: 26, label: "Snow depth", value: "false" },
            { id: 27, label: "Snow depth water equivalent", value: "false" },
            { id: 28, label: "Snow evaporation", value: "false" },
            { id: 29, label: "Snowfall", value: "false" },
            { id: 30, label: "Snowmelt", value: "false" },
            { id: 31, label: "Soil temperature level 1", value: "false" },
            { id: 32, label: "Soil temperature level 2", value: "false" },
            { id: 33, label: "Soil temperature level 3", value: "false" },
            { id: 34, label: "Soil temperature level 4", value: "false" },
            { id: 35, label: "Sub-surface runoff", value: "false" },
            { id: 36, label: "Surface latent heat flux", value: "false" },
            { id: 37, label: "Surface net solar radiation", value: "false" },
            { id: 38, label: "Surface net thermal radiation", value: "false" },
            { id: 39, label: "Surface pressure", value: "false" },
            { id: 40, label: "Surface runoff", value: "false" },
            { id: 41, label: "Surface sensible heat flux", value: "false" },
            { id: 42, label: "Surface solar radiation downwards", value: "false" },
            { id: 43, label: "Surface thermal radiation downwards", value: "false" },
            { id: 44, label: "Temperature of snow layer", value: "false" },
            { id: 45, label: "Total evaporation", value: "false" },
            { id: 46, label: "Total precipitation", value: "false" },
            { id: 47, label: "Volumetric soil water layer 1", value: "false" },
            { id: 48, label: "Volumetric soil water layer 2", value: "false" },
            { id: 49, label: "Volumetric soil water layer 3", value: "false" },
            { id: 50, label: "Volumetric soil water layer 4", value: "false" },
            { id: 51, label: "Select All" }
          ];

          const dataSets = [
            { id: 1, label: "CHIRPS" },
            { id: 2, label: "CMORPH" },
            { id: 3, label: "ARC 2" },
            { id: 4, label: "RFE" },
          ];

          const processedVariables = [
            { id: 1, label: "Potential Evapotranspiration" },
            { id: 2, label: "Onset of Planting date" },
            { id: 3, label: "Soil Moisture" },
            { id: 4, label: "Select All" },
          ];

        return ( 
        <div>
            <div>
                <div className = "variables"> 
                <h3 id ="example">ERA5Land (ECMWF)</h3>
                <Divider style={{ margin: "6px 0" }} />
    
                    <div id ="CheckBoxGroupTest" className="blockVariables">  
                        <CheckboxGroup id="items" items={items} />
                    </div>

                    <Divider style={{ margin: "6px 0" }} />
                </div>

                <div className = "precipitation"> 
                    <div className="blockPrecipitation">
                        <h3>Precipitation Datasets</h3>
                        <RadioGroup items={dataSets} />
                    </div>

                    <Divider style={{ margin: "6px 0" }} />
                </div>

                <div className = "processed"> 
                    <div className="blockProcessed">
                        <h3>Processed Variables</h3>
                    <CheckboxGroup items={processedVariables} />
                    </div>
                    <Divider style={{ margin: "6px 0" }} />
                </div>

                

                <div className = "result"> 
                    <DataParser/>
                </div>

                <div className = "coordinates"> 
                    <h1>Coordinates</h1>
                    <Divider style={{ margin: "6px 0" }} />
                    <form className = "standardForm">
                        <label>
                            Minimum Longitude:  
                            <input type="text" value={minLon} name="Minimum Longitude" onChange={handleChange} />
                            <br/>
                            Maximum Longitude:  
                            <input type="text" value={maxLon} name="Minimum Longitude" onChange={handleChange} />
                            <br/>
                            Minimum Latitude:  
                            <input type="text" value={minLat} name="Minimum Longitude" onChange={handleChange} />
                            <br/>
                            Maximum Latitude:  
                            <input type="text" value={maxLat} name="Minimum Longitude" onChange={handleChange} />
                            <br/>
                        </label>
                    </form>
                
                    <Divider style={{ margin: "6px 0" }} />
                </div>

                <div className = "period"> 
                    <h1>Period</h1>
                    <p>Start Date: </p>
                    <Divider style={{ margin: "6px 0" }} />
                    <DateRange/>
                    <Divider style={{ margin: "6px 0" }} />
                    <p>End Date: </p>
                    <DateRange/>
                    <Divider style={{ margin: "6px 0" }} />
                </div>

                <div className ="myButton">
                    <button onClick={purr}> RUN </button>

                </div>
                
            </div>
        
        </div> );

    }

 
export default MetClone2;