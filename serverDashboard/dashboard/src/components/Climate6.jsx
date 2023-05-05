import React, { Component, createContext } from 'react';
import Divider from "@material-ui/core/Divider";
import CheckboxGroup from "./CheckboxGroup";
import RadioGroup from "./RadioGroup";
import axios from 'axios';

import CMIP6Variable from '../CMIP6Data/CMIP6Variable';
import CMIP6Frequency from '../CMIP6Data/CMIP6Frequency';
import CMIP6GridLabel from '../CMIP6Data/CMIP6GridLabel';
import CMIP6SubExperiment from '../CMIP6Data/CMIP6SubExperiment';
import CMIP6VariantLabel from '../CMIP6Data/CMIP6VariantLabel';
import CMIP6NominalResolution from '../CMIP6Data/CMIP6NominalResolution.js';
import CMIP6ExperimentID from '../CMIP6Data/CMIP6ExperimentID';
import CMIP6SourceID from '../CMIP6Data/CMIP6SourceID';
import CMIP6Activity from '../CMIP6Data/CMIP6Activity';


async function postClimateVariables(){
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "proxy" : "false",
        }
      };

    const response = await axios.post('http://127.0.0.1:8000/climateVariablesHandler', {
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

async function postClimateIndices(){
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "proxy" : "false",
        }
      };

    const response = await axios.post('http://http://127.0.0.1:8000/climateIndicesHandler', {
        project: 'CMIP6',
      },axiosConfig)

      console.log(response.data)
    /*  .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });*/
}

class Climate6 extends Component {

    testChange(){
        window.alert("Im a test")
        console.log("TESTING CHAAANGE")
    }


    render() { 

        

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

        const IndicesItems = [

            {id: 1, label: "AEJ"},
            {id: 2, label: "DCI"},
            {id: 3, label: "IOD"},
            {id: 4, label: "E5w"},
            {id: 5, label: "NAO"},
            {id: 6, label: "NINO3/4/1-2/3-4"},
            {id: 7, label:  "PWE"},
            {id: 8, label: "SIW"},
            {id: 9, label: "SOI"}, 
            {id: 10, label: "STA"},
            {id: 11, label: "UEQ"},
            {id: 12, label: "W5w"},
            {id: 13, label: "WAMI"}, 
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
                <div>
                    <h3>Variable</h3>
                        <Divider style={{ margin: "6px 0" }} />
                </div>

                <div className = "CMIP6Variable"> 
                        <CheckboxGroup items={CMIP6Variable} />
                    <Divider style={{ margin: "6px 0" }} />
                </div>

                <div>
                    <h3>Frequency</h3>
                        <Divider style={{ margin: "6px 0" }} />
                </div>

                <div className = "CMIP6Frequency"> 
                        <CheckboxGroup items={CMIP6Frequency} />
                    <Divider style={{ margin: "6px 0" }} />
                </div>

                <div>
                    <h3>Grid Label</h3>
                        <Divider style={{ margin: "6px 0" }} />
                </div>

                <div className = "CMIP6GridLabel"> 
                    
                        <CheckboxGroup items={CMIP6GridLabel} />
                    <Divider style={{ margin: "6px 0" }} />
                </div>

                <div>
                    <h3>Variant Label</h3>
                        <Divider style={{ margin: "6px 0" }} />
                </div>

                <div className = "CMIP6VariantLabel"> 
                       <CheckboxGroup items={CMIP6VariantLabel} />
                    <Divider style={{ margin: "6px 0" }} />
                </div>

                <div>
                    <h3>Sub-Experiment</h3>
                        <Divider style={{ margin: "6px 0" }} />
                </div>

                <div className = "CMIP6SubExperiment"> 
                       <CheckboxGroup items={CMIP6SubExperiment} />
                    <Divider style={{ margin: "6px 0" }} />
                </div>

                <div>
                    <h3>Experiment ID</h3>
                        <Divider style={{ margin: "6px 0" }} />
                </div>

                <div className = "CMIP6ExperimentID"> 
                       <CheckboxGroup items={CMIP6ExperimentID} />
                    <Divider style={{ margin: "6px 0" }} />
                </div>

                <div>
                    <h3>Nominal Resolution</h3>
                        <Divider style={{ margin: "6px 0" }} />
                </div>

                <div className = "CMIP6NominalResolution"> 
                       <CheckboxGroup items={CMIP6NominalResolution} />
                    <Divider style={{ margin: "6px 0" }} />
                </div>

                <div>
                    <h3>Source ID</h3>
                        <Divider style={{ margin: "6px 0" }} />
                </div>

                <div className = "CMIP6SourceID"> 
                       <CheckboxGroup items={CMIP6SourceID} />
                    <Divider style={{ margin: "6px 0" }} />
                </div>

                <div>
                    <h3>Activity</h3>
                        <Divider style={{ margin: "6px 0" }} />
                </div>

                <div className = "CMIP6Activity"> 
                       <CheckboxGroup items={CMIP6Activity} />
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

export default Climate6;