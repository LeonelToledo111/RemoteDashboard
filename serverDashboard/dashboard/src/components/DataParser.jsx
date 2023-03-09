import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import CoordData from './CoordData'


class DataParser extends Component {

   example =1123;

  constructor(props) {
    // Call super class
    super(props);

    this.state={
        current: 1,
        data: [],
        countries: [],
        countriesdict: {},
        min_lat: [],
        min_lon: [],
        max_lat: [],
        max_lon: [],
        keys: ["a", "b", "c"],
        id: [],
        value:-1,
        selected: '',
        countryCode: [],
    };

    

    // Bind this to function updateData (This eliminates the error)
    this.updateData = this.updateData.bind(this);
    this._onSelect = this._onSelect.bind(this)
  }

  _onSelect (option) {
    const value =this.state.countriesdict[option.label]
    this.state.current=value;
    console.log("Happy value = ", value);
    console.log('You selected ', option.label)
    console.log('Its index is:', this.state.current)
    this.setState({selected: option})
    console.log("max lat " ,this.state.max_lat[this.state.current])
    console.log("min lat " ,this.state.min_lat[this.state.current])
    console.log("max lon " ,this.state.max_lon[this.state.current])
    console.log("min lon " ,this.state.min_lon[this.state.current])
    console.log("Country Code",this.state.countryCode[this.state.current])
    
  }

  componentDidMount() {

    // Your parse code, but not seperated in a function
    var csvFilePath = require("../datasets/countriesSorted.csv");
    var Papa = require("papaparse/papaparse.min.js");
    Papa.parse(csvFilePath, {
      header: true,
      download: true,
      skipEmptyLines: true,
      transformHeader: header => header.toLowerCase().replace(/\W/g, "_"),
      // Here this is also available. So we can call our custom class method
      complete: this.updateData
    });
  }

  updateData(result) {
    const data = result.data; 
    result.data.map((extractedData, index) =>{
        this.state.countries[index]=extractedData.country_name.replace(/_/g, " ");
        this.state.max_lat[index]=extractedData.max_lat;
        this.state.max_lon[index]=extractedData.max_lon;
        this.state.min_lat[index]=extractedData.min_lat;
        this.state.min_lon[index]=extractedData.min_lon;
        this.state.countryCode[index] = extractedData.fips_country_code;
        this.state.countriesdict[extractedData.country_name.replace(/_/g, " ")] = index;
        this.state.id[index]=extractedData.id;
        
    })
    
    this.setState({data: data}); // or shorter ES syntax: this.setState({ data });
   // console.log(data);
  }

  

  
 

  render() {
 
  return <div>
      <div>
         <Dropdown options={this.state.countries} onChange={this._onSelect} value={this.state.selected} placeholder="Please select a Country" />
      </div>

      <div>
      {CoordData(this.state.max_lat[this.state.current],this.state.min_lat[this.state.current],this.state.max_lon[this.state.current],this.state.min_lon[this.state.current],this.state.countryCode[this.state.current])} 
      </div>
    </div>
  }
}
 /*
<div>
        {CoordData(this.state.max_lat[this.state.current],this.state.min_lat[this.state.current])}    
      </div>
       {this.anotherTest(1)}  
 */



export default DataParser;