import React, { Component } from 'react';
import Divider from "@material-ui/core/Divider";
import axios from 'axios';
import { JsonToTable } from "react-json-to-table";

class LossesComputation extends Component {
  
  files = 
    [
    
    {
      FileName: "ERA5-Land_temp_198703.nc",
      FileSize: "147K",
      Location: "/rds/general/project/arise/live/Meteo/TZ/Variable_temp/",
      date: "Feb 26",
      time: "13:41",
    },

    {
      FileName: "ERA5-Land_temp_198704.nc",
      FileSize: "142K",
      Location: "/rds/general/project/arise/live/Meteo/TZ/Variable_temp/",
      date: "Feb 26",
      time: "13:44",
    },

    {
      FileName: "ERA5-Land_temp_198704.nc",
      FileSize: "800K",
      Location: "/rds/general/project/arise/live/Meteo/TZ/Variable_temp/",
      date: "Feb 27",
      time: "18:11",
    },

    {
      FileName: "ERA5-Land_temp_198704.nc",
      FileSize: "1892K",
      Location: "/rds/general/project/arise/live/Meteo/TZ/Variable_temp/",
      date: "Mar 15",
      time: "3:21",
    },
  
    
    
    ];
    


     myJson = {
        Analyst: { name: "Jack", email: "jack@xyz.com" },
        "Loaded by": "Jills",
        "Load id": 34,
        "git id": "xxqaygqertqsg98qhpughqer",
        "Analysis Id": "7asdlnagsd98gfaqsgf",
        "Load Date": "July 12, 2018",
        "Data Source": "Study XY123-456",
        "Jira Ticket": "Foo-1",
        "Confluence URL": "http://myserver/wxyz",
        "Study sponsors": [
          { name: "john", email: "john@@xyz.com" },
          { name: "jane", email: "jane@@xyz.com" }
        ]
      };

    items = [
        { name: 'Louise', age: 27, color: 'red' },
        { name: 'Margaret', age: 15, color: 'blue'},
        { name: 'Lisa', age:34, color: 'yellow'},
       { Analyst: { name: "Jack", email: "jack@xyz.com" },
    "Loaded by": "Jills",
    "Load id": 34,
    "git id": "xxqaygqertqsg98qhpughqer",
    "Analysis Id": "7asdlnagsd98gfaqsgf",
    "Load Date": "July 12, 2018",
    "Data Source": "Study XY123-456",
    "Jira Ticket": "Foo-1",
    "Confluence URL": "http://myserver/wxyz",
    "Study sponsors": [
      { name: "john", email: "john@@xyz.com" },
      { name: "jane", email: "jane@@xyz.com" }
    ]}
      ];

    constructor(props) {
        // Call super class
        super(props);
    
        this.state={
        data: {},
      }
    }

    async getJson(){
        const response =await axios.get("https://dog.ceo/api/breeds/list/all")
        this.data = JSON.stringify(response.data);
        console.log(this.data);
    }

    render(){

        this.getJson();
        return ( 
            <div>
                <div className = "policyFile">
                    <h3>Policy File</h3>
                    <Divider style={{ margin: "6px 0" }} />
                    <p>Input File</p>
                    <Divider style={{ margin: "6px 0" }} />
                </div>

                <div>

                    <p>

                        Files Currently on the Machine

                        

                    </p>
                    <div>

                    <JsonToTable json={this.files} />
                    </div>
                    
                </div>


                <div className ="myButton">
                    <button> RUN </button>
                </div>
            </div> );

    }


}

export default LossesComputation;
