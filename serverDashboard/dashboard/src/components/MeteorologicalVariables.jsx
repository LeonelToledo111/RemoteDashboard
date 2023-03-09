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
  //  window.alert("PURR");
    for(var i=1;i<52;i++){
        var idTag="items"+i;
        status = document.getElementById("items"+i);
      //  window.alert(status.checked);
        selectedItem[i-1]=status.checked;
    }
    
}

async function postDataAxios(minLon, maxLon, minLat, maxLat){

    purr();


    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "proxy" : "false",
        }
      };

    const response = await axios.post('http://127.0.0.1:8000/meteorologicalVariablesHandler', {
        firstName: 'Fred',
        lastName: 'Flintstone',
        m_u_component_of_wind : selectedItem[0],
        m_v_component_of_wind : selectedItem[1],
        m_dewpoint_temperature:  selectedItem[2],
        m_temperature : selectedItem[3],
        evaporation_from_bare_soil: selectedItem[4], 
        evaporation_from_open_water_surfaces_excluding_oceans: selectedItem[5],
        evaporation_from_the_top_of_canopy: selectedItem[6],
        evaporation_from_vegetation_transpiration: selectedItem[7],
        forecast_albedo: selectedItem[8],
        lake_bottom_temperature: selectedItem[9],
        lake_ice_depth: selectedItem[10],
        lake_ice_temperature: selectedItem[11],
        lake_mix_layer_depth: selectedItem[12],
        lake_mix_layer_temperature: selectedItem[13],
        lake_shape_factor: selectedItem[14],
        lake_total_layer_temperature: selectedItem[15],
        leaf_area_index_high_vegetation: selectedItem[16],
        leaf_area_index_low_vegetation: selectedItem[17],
        potential_evaporation: selectedItem[18],
        runoff: selectedItem[19],
        skin_reservoir_content: selectedItem[20],
        skin_temperature: selectedItem[21],
        snow_albedo: selectedItem[22],
        snow_cover: selectedItem[23],
        snow_density: selectedItem[24],
        snow_depth: selectedItem[25],
        snow_depth_water_equivalent: selectedItem[26], 
        snow_evaporation: selectedItem[27],
        snowfall: selectedItem[28],
        snowmelt: selectedItem[29],
        soil_temperature_level_1: selectedItem[30], 
        soil_temperature_level_2: selectedItem[31],
        soil_temperature_level_3: selectedItem[32],
        soil_temperature_level_4: selectedItem[33],
        sub_surface_runoff: selectedItem[34],
        surface_latent_heat_flux: selectedItem[35],
        surface_net_thermal_radiation: selectedItem[36],
        surface_pressure: selectedItem[37],
        surface_runoff : selectedItem[38],
        surface_sensible_heat_flux:selectedItem[39],
        surface_net_solar_radiation :selectedItem[40],
        surface_solar_radiation_downwards: selectedItem[41], 
        surface_thermal_radiation_downwards: selectedItem[42],
        temperature_of_snow_layer: selectedItem[43],
        total_evaporation: selectedItem[44],
        total_precipitation: selectedItem[45],
        volumetric_soil_water_layer_1: selectedItem[46], 
        volumetric_soil_water_layer_2: selectedItem[47],
        volumetric_soil_water_layer_3: selectedItem[48],
        volumetric_soil_water_layer_4: selectedItem[49],
        _minLon: minLon,
        _maxLon: maxLon,
        _minLat : minLat,
        _maxLat : maxLat,
        _cCode : 'placeholder',
      },axiosConfig)

      console.log(selectedItem)
      console.log(response.data)

}

function  MeteorologicalVariables() { 


    const minLon = useSelector(state=>state.min_lon);
    const maxLon = useSelector(state=>state.max_lon);
    const minLat = useSelector(state=>state.min_lat);
    const maxLat = useSelector(state=>state.max_lat);
    const cCode = useSelector(state=>state.countryCode);

        const items = [
            { id: 1, label: "10m u-component of wind", value: "false" },
            { id: 2, label: "10m v-component of wind", value: "false" },
            { id: 3, label: "2m dewpoint temperature", value: "false"},
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
                    <button onClick={postDataAxios(minLon, maxLon,minLat,maxLat, cCode)}> RUN </button>

                </div>
                
            </div>
        
        </div> );

    }

 
export default MeteorologicalVariables;