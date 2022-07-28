import React, { Component } from 'react';
import Divider from "@material-ui/core/Divider";
import SelectP from './SelectP';
// import MapboxContainerVis from './mapVis'




class Visualization extends Component {

    constructor(props){
        super(props);
        this.state = {
            refVis: this.props.refVis,
            refSelect: React.createRef(),
            vars: [],
            //options: [{value:"hola", label:"label"}]
            options: ["hola", "label"]
        };
        this.handleUpdate = this.handleUpdate.bind(this)
        this.makeSelect = this.makeSelect.bind(this)
    }

    async handleUpdate(vari){
        this.state.refVis().var=vari;
        this.makeSelect( await this.state.refVis().serverTiffasy() )
    }

    makeSelect(vars){
        console.log("vars:",vars);
        // this.state.options = vars.map(function(nameVar) {
        //     return {value:nameVar, label:nameVar};
        // });
        // this.setState({
        //     ...this.prevState,
        //     options: vars
        // })

        // prevState  => ({ ...prevState,   name : data.name })
        console.log("options:",this.state.options);
        // console.log("Selectvar: ",this);
        this.state.refSelect.handleUpdate(vars);
        console.log("this.state.refSelect: ",this.state.refSelect)
    }

    render() { 
        
        return ( 
        <div>
            <div>

            <h3>Visualization Module</h3>
                    <Divider style={{ margin: "6px 0" }} />
                

                <div className = "soilDataset"> 
                    <h3>GeoTIFF</h3>

                </div>

                <div className = "calibration">
                    <h3>Other Type of file...</h3>
                    <Divider style={{ margin: "6px 0" }} />
                </div>
                    
                </div>

                <h3>Crop Type</h3>
                    <Divider style={{ margin: "6px 0" }} />
                

                {/* <div className ="myButton">
                    <button onClick={
                        ()=>{
                            console.log("NetCDF");
                            this.state.refVis().serverTiffasy({
                                file:"/media/alex/Datos/netcdf/Mozambique/ssr/ssr-N(-11.0):W(32.0):S(-26.0):E(41.0)-91x151-1950.1.1_1:0:0-1959.12.31_23:0:0.nc",
                                //time:37715
                            })
                        }}> NetCDF </button>
                </div>
                <div className ="myButton">
                    <button onClick={
                        ()=>{
                            console.log("CSV");
                            this.state.refVis().serverTiffasy({
                                file:"/media/alex/Datos/CSV/structure_import.csv",
                                var:"phase3.start"
                            })
                        }}> CSV </button>
                </div>
                <div className ="myButton">
                    <button onClick={
                        ()=>{
                            console.log("GeoTiff");
                            this.state.refVis().serverTiffasy({
                                file:"/media/alex/Datos/SENTINEL/SENTINEL2A_20210603-082236-074_L2A_T35LRL_C_V1-0_ATB_R1.tif",
                                band:1
                            })
                        }}> GeoTiff </button>
                </div> */}
                <div className ="myButton">
                    <button onClick={
                        async ()=>{
                            // console.log("Select File");
                            // const vars=this.state.refVis().serverTiffasy({
                            //     file:""
                            // });

                            // if( vars != undefined ){
                            //     const options = vars.map(function(nameVar) {
                            //         return nameVar+"x";
                            //     });
                            //     console.log("Options: ",options);
                            // }

                            this.makeSelect( await this.state.refVis().serverTiffasy({
                                file:""
                            }) )
                                

                            

                        }}> Select File </button>
                </div>
                <br/>
                <div className="selectVar">
                { this.state.options.map(vari=>vari)} 
                {/* <Select /> */}
                {/* https://www.storyblok.com/tp/react-dynamic-component-from-json */}
                </div>
                <SelectP childRef={ref => (this.state.refSelect= ref)} event={this.handleUpdate} />
                
            </div>
        
         );

    }

}




   
  

export default Visualization;