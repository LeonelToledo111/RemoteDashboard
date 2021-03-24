import CSVReader from "react-csv-reader";
import React from "react";
import ReactDOM from "react-dom";

function CSVComponent(){

const handleForce = (data, fileInfo) => console.dir(data, fileInfo); 

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
};

const reader = (
  <div className="container">
    <CSVReader
      cssClass="react-csv-input"
      onFileLoaded={handleForce}
      parserOptions={papaparseOptions}
    />
  </div>
);

return reader;

}



export default CSVComponent;