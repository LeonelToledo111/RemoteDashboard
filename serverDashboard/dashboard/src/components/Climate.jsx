import React, { Component, createContext } from 'react';
import Divider from "@material-ui/core/Divider";
import CheckboxGroup from "./CheckboxGroup";
import RadioGroup from "./RadioGroup";
import axios from 'axios';
import CMIP5Variables from '../CMIP5Data/CMIP5Variables.js';
import CMIP5Ensemble from '../CMIP5Data/CMIP5Ensemble.js';
import CMIP5Table from '../CMIP5Data/CMIP5Table.js';
import CMIP5TimeFrequency from '../CMIP5Data/CMIP5TimeFrequency.js';
import CMIP5Experiment from '../CMIP5Data/CMIP5Experiment.js';
import CMIP5Model from '../CMIP5Data/CMIP5Model.js';
import { Tab } from '@material-ui/core';


var array;
var selectedItem=[];
var VariablesDictionary={};
var EnsembleDictionary={};
var TableDictionary={};
var TimeFrequencyDictionary={};
var ExperimentDictionary={};
var ModelDictionary={};
var PostData ={};
var projectPost ={};

function loadVariableData(){
    array = CMIP5Variables;
}

function createDictionary(){
    var status;
    //window.alert("Gathering");
    for(var i=1;i<=CMIP5Variables.length;i++){
        status = document.getElementById("CMIP5Variables"+i);
        var name=CMIP5Variables[i-1].label;
      //  console.log(name);
        VariablesDictionary[name]=status.checked;
    }

    for(var i=1;i<=CMIP5Ensemble.length;i++){
        status = document.getElementById("CMIP5Ensemble"+i);
        var name=CMIP5Ensemble[i-1].label;
      //  console.log(name);
        EnsembleDictionary[name]=status.checked;
    }

    for(var i=1;i<=CMIP5Table.length;i++){
        status = document.getElementById("CMIP5Table"+i);
        var name=CMIP5Table[i-1].label;
      //  console.log(name);
         TableDictionary[name]=status.checked;
    }

    for(var i=1;i<=CMIP5TimeFrequency.length;i++){
        status = document.getElementById("CMIP5Frequency"+i);
        var name=CMIP5TimeFrequency[i-1].label;
      //  console.log(name);
        TimeFrequencyDictionary[name]=status.checked;
    }

    for(var i=1;i<=CMIP5Experiment.length;i++){
        status = document.getElementById("CMIP5Experiment"+i);
        var name=CMIP5Experiment[i-1].label;
      //  console.log(name);
        ExperimentDictionary[name]=status.checked;
    }

    for(var i=1;i<=CMIP5Model.length;i++){
        status = document.getElementById("CMIP5Model"+i);
        var name=CMIP5Model[i-1].label;
      //  console.log(name);
        ModelDictionary[name]=status.checked;
    }

    
    projectPost["project"] = "CMIP5";

    PostData = Object.assign({},projectPost, VariablesDictionary, EnsembleDictionary,TableDictionary,TimeFrequencyDictionary,ExperimentDictionary,ModelDictionary);

    console.log(PostData);
  
}

async function postClimateVariables(){

    createDictionary();
    //const backendPost = PostData

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
       VariablesDictionary,
      },axiosConfig)

      console.log(response.data)
    /*  .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });*/
}

async function postClimateIndices(){
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "proxy" : "false",
        }
      };

    const response = await axios.post('http://127.0.0.1:8000/climateIndicesHandler', {
        firstName: 'Fred',
        lastName: 'Flintstone'
      },axiosConfig)

      console.log(response.data)
    /*  .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });*/
}

class Climate extends Component {



    render() { 

        loadVariableData();

        const project = [
            { id: 1, label: "CMIP5" },
            { id: 2, label: "CMIP6" },
        ];

        const modelItems = [
            {id: 1, label: "ACCESS1.0"},
            {id: 2, label: "ACCESS1.3"},
            {id: 3, label: "CCSM4 (2)"},
            {id: 4, label: "CFSv2-2011"},
            {id: 5, label: "CMCC-CESM"},
            {id: 6, label: "CMCC-CM"},
            {id: 7, label:  "CMCC-CMS"},
            {id: 8, label: "CNRM-CM5"},
            {id: 9, label: "CNRM-CM5-2"}, 
            {id: 10, label: "CSIRO-Mk3.6.0"},
            {id: 11, label: "CSIRO-Mk3L-1-2"}, 
            {id: 12, label: "CanAM4"}, 
            {id: 13, label:  "CanCM4"}, 
            {id: 14, label: "CanESM2"}, 
            {id: 15, label:  "EC-EARTH"}, 
            {id: 16, label: "FGOALS-g2"}, 
            {id: 17, label:  "FGOALS-gl"}, 
            {id: 18, label: "FGOALS-s2"}, 
            {id: 19, label:  "GEOS-5"}, 
            {id: 20, label:  "GFDL-CM2.1"}, 
            {id: 21, label:  "GFDL-CM3"}, 
            {id: 22, label:  "GFDL-ESM2G"}, 
            {id: 23, label:  "GFDL-ESM2M"}, 
            {id: 24, label:  "GFDL-HIRAM-C180"}, 
            {id: 25, label:  "GFDL-HIRAM-C360"}, 
            {id: 26, label:  "GISS-E2-H"}, 
            {id: 27, label:  "GISS-E2-H-CC"}, 
            {id: 28, label:  "GISS-E2-R"}, 
            {id: 29, label:  "GISS-E2-R-CC"}, 
            {id: 30, label:  "HadCM3"}, 
            {id: 31, label:  "HadGEM2-A"}, 
            {id: 32, label:  "HadGEM2-AO"}, 
            {id: 33, label:  "HadGEM2-CC"}, 
            {id: 34, label:  "HadGEM2-ES"}, 
            {id: 35, label:  "INM-CM4"}, 
            {id: 36, label:  "IPSL-CM5A-LR"}, 
            {id: 37, label:  "IPSL-CM5A-MR"}, 
            {id: 38, label:   "IPSL-CM5B-LR"}, 
            {id: 39, label:  "MIROC-ESM"}, 
            {id: 40, label:  "MIROC-ESM-CHEM"}, 
            {id: 41, label:  "MIROC4h"}, 
            {id: 42, label:   "MIROC5"}, 
            {id: 43, label:  "MPI-ESM-LR"}, 
            {id: 44, label: "MPI-ESM-MR"}, 
            {id: 45, label: "MPI-ESM-P"}, 
            {id: 46, label:  "MRI-AGCM3.2H"}, 
            {id: 47, label:  "MRI-AGCM3.2S"}, 
            {id: 48, label:  "MRI-CGCM3"}, 
            {id: 49, label: "MRI-ESM1"}, 
            {id: 50, label: "NICAM-09"}, 
            {id: 51, label:  "NorESM1-M"}, 
            {id: 52, label: "NorESM1-ME"} 
          ];

        const experimentItems = [

            {id: 1, label: "historical"},
            {id: 2, label: "historicalExt"},
            {id: 3, label: "historicalGHG"},
            {id: 4, label: "historicalMisc"},
            {id: 5, label: "historicalNat"},
            {id: 6, label: "rcp26"},
            {id: 7, label:  "rcp45"},
            {id: 8, label: "rcp60"},
            {id: 9, label: "rcp85"}, 
        ];

        const arrayTest = [
            {label: "HAPPY TESTING"},
        ];

        const IndicesItems = [

            {id: "CMIP5Indices1", label: "AEJ"},
            {id: "CMIP5Indices2", label: "DCI"},
            {id: "CMIP5Indices3", label: "IOD"},
            {id: "CMIP5Indices4", label: "E5w"},
            {id: "CMIP5Indices5", label: "NAO"},
            {id: "CMIP5Indices6", label: "NINO3/4/1-2/3-4"},
            {id: "CMIP5Indices7", label:  "PWE"},
            {id: "CMIP5Indices8", label: "SIW"},
            {id: "CMIP5Indices9", label: "SOI"}, 
            {id: "CMIP5Indices10", label: "STA"},
            {id: "CMIP5Indices11", label: "UEQ"},
            {id: "CMIP5Indices12", label: "W5w"},
            {id: "CMIP5Indices13", label: "WAMI"}, 
        ];

        const variableItems = [
            {id: 1, label: "albisccp"},
            {id: 2, label: "albs"},
            {id: 3, label: "ccb"},
            {id: 4, label: "cct"},
            {id: 5, label: "cl"},
            {id: 6, label: "clcalipso"},
            {id: 7, label:  "clhcalipso"},
            {id: 8, label: "cli"},
            {id: 9, label: "cliscsp"}, 
            {id: 10, label: "clivi"},
            {id: 11, label: "cllcalipso"}, 
            {id: 12, label: "clmcalipso"}, 
            {id: 13, label:  "clt"}, 
            {id: 14, label: "cltcalipso"}, 
            {id: 15, label:  "cltiscsp"}, 
            {id: 16, label: "clw"}, 
            {id: 17, label:  "clwvi"}, 
            {id: 18, label: "hfls"}, 
            {id: 19, label:  "hfss"}, 
            {id: 20, label:  "hur"}, 
            {id: 21, label:  "hus"}, 
            {id: 22, label:  "huss"}, 
            {id: 23, label:  "mc"}, 
            {id: 24, label:  "mrro"}, 
            {id: 25, label:  "mrros"}, 
            {id: 26, label:  "mrsos"}, 
            {id: 27, label:  "omldamax"}, 
            {id: 28, label:  "orog"}, 
            {id: 29, label:  "parasol"}, 
            {id: 30, label:  "Refl"}, 
            {id: 31, label:  "pctiscsp"}, 
            {id: 32, label:  "pfull"}, 
            {id: 33, label:  "phalf"}, 
            {id: 34, label:  "pr"}, 
            {id: 35, label:  "prc"}, 
            {id: 36, label:  "prsm"}, 
            {id: 37, label:  "ps"}, 
            {id: 38, label:   "psl"}, 
            {id: 39, label:  "rhs"}, 
            {id: 40, label:  "rhsmax"}, 
            {id: 41, label:  "rhsmin"}, 
            {id: 42, label:   "rlds"}, 
            {id: 43, label:  "rldscs"}, 
            {id: 44, label: "rlus"}, 
            {id: 45, label: "rlut"}, 
            {id: 46, label:  "rlutcs"}, 
            {id: 47, label:  "rsds"}, 
            {id: 48, label:  "rsdscs"}, 
            {id: 49, label: "rsdt"}, 
            {id: 50, label: "rsus"}, 
            {id: 51, label:  "rsuscs"}, 
            {id: 52, label: "rsut"},
            {id: 27, label:  "omldamax"}, 
            {id: 28, label:  "orog"}, 
            {id: 29, label:  "parasol"}, 
            {id: 30, label:  "Refl"}, 
            {id: 31, label:  "pctiscsp"}, 
            {id: 32, label:  "pfull"}, 
            {id: 33, label:  "phalf"}, 
            {id: 34, label:  "pr"}, 
            {id: 35, label:  "prc"}, 
            {id: 36, label:  "prsm"}, 
            {id: 37, label:  "ps"}, 
            {id: 38, label:   "psl"}, 
            {id: 39, label:  "rhs"}, 
            {id: 40, label:  "rhsmax"}, 
            {id: 41, label:  "rhsmin"}, 
            {id: 42, label:   "rlds"}, 
            {id: 43, label:  "rldscs"}, 
            {id: 44, label: "rlus"}, 
            {id: 45, label: "rlut"}, 
            {id: 46, label:  "rlutcs"}, 
            {id: 47, label:  "rsds"}, 
            {id: 48, label:  "rsdscs"}, 
            {id: 49, label: "rsdt"}, 
            {id: 50, label: "rsus"}, 
            {id: 51, label:  "rsuscs"}, 
            {id: 52, label: "rsut"} ,
            {id: 53, label:  "rsutcs"}, 
            {id: 54, label:  "sfcWind"}, 
            {id: 55, label:  "sfcWindmax"}, 
            {id: 56, label:  "sic"}, 
            {id: 57, label:  "sit"}, 
            {id: 58, label:  "snc"}, 
            {id: 59, label:  "snd"}, 
            {id: 60, label:  "snw"}, 
            {id: 61, label:  "swit"}, 
            {id: 62, label:  "ta"}, 
            {id: 63, label:  "ta700"}, 
            {id: 64, label:   "tas"}, 
            {id: 65, label:  "tasmax"}, 
            {id: 66, label:  "tasmin"}, 
            {id: 67, label:  "tos"}, 
            {id: 68, label:   "tossq"}, 
            {id: 69, label:  "ts"}, 
            {id: 70, label: "tslsi"}, 
            {id: 71, label: "ua"}, 
            {id: 72, label:  "uas"}, 
            {id: 73, label:  "usi"}, 
            {id: 74, label:  "va"}, 
            {id: 75, label: "vas"}, 
            {id: 76, label: "vsi"}, 
            {id: 77, label:  "wap"}, 
            {id: 78, label: "wap500"}, 
            {id: 79, label:  "zg"}
          ];
        

        return ( 
        <div>
            <div>
                <div className = "CMIP5Variables" onLoad={loadVariableData}> 
                    <h3>Variable</h3>
                    <Divider style={{ margin: "6px 0" }} />
                        <CheckboxGroup id="CMIP5Variable" items={CMIP5Variables} />
                    <Divider style={{ margin: "6px 0" }} />
                </div>

                <div>
                    <h3>Ensemble</h3>
                        <Divider style={{ margin: "6px 0" }} />
                </div>

                <div className = "CMIP5Ensemble"> 
                        <CheckboxGroup id="Ensemble" items={CMIP5Ensemble} />
                    <Divider style={{ margin: "6px 0" }} />
                </div>

                <div>
                    <h3>CMIP Table</h3>
                        <Divider style={{ margin: "6px 0" }} />
                </div>

                <div className = "CMIP5Table"> 
                        <CheckboxGroup items={CMIP5Table} />
                    <Divider style={{ margin: "6px 0" }} />
                </div>

                <div>
                    <h3>Time Frequency</h3>
                        <Divider style={{ margin: "6px 0" }} />
                </div>

                <div className = "CMIP5TimeFrequency"> 
                    
                        <CheckboxGroup items={CMIP5TimeFrequency} />
                    <Divider style={{ margin: "6px 0" }} />

                    
                </div>

                <div>
                    <h3>Experiment</h3>
                        <Divider style={{ margin: "6px 0" }} />
                </div>

                <div className = "CMIP5Experiment"> 
                    
                        <CheckboxGroup items={CMIP5Experiment} />
                    <Divider style={{ margin: "6px 0" }} />

                    
                </div>

                <div>
                    <h3>Model</h3>
                        <Divider style={{ margin: "6px 0" }} />
                </div>

                <div className = "CMIP5Model"> 
                    
                        <CheckboxGroup items={CMIP5Model} />
                    <Divider style={{ margin: "6px 0" }} />

                    
                </div>

                <div>
                    <h3>Climate Indices</h3>
                        <Divider style={{ margin: "6px 0" }} />
                </div>

                <div className = "variable"> 
                       <CheckboxGroup id ='test' items={IndicesItems} />
                    <Divider style={{ margin: "6px 0" }} />
                </div>

                <div className ="myButton">
                    <div><button onClick={postClimateIndices}> INDICES </button></div>
                </div>
                <div className ="myButton">
                    <button onClick={postClimateVariables}> VARIABLES </button>
                </div>
                <div className ="myButton">
                    <button onClick={postClimateVariables}> RANK </button>
                </div>
                
            </div>
        
        </div> );

    }
}

export default Climate;