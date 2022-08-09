import React, { Component } from 'react';
import Divider from "@material-ui/core/Divider";
// import SelectP from './SelectP';



class Visualization extends Component {

    constructor(props){
        super(props);
        this.state = {
            refVis: this.props.refVis,
            data: {vars:[],var:''}
        };
        this.changeSelect = this.changeSelect.bind(this)
    }

    async changeSelect(event){
        console.log("envent:",event.target.value)
        this.state.refVis().var=event.target.value
        this.setState({
            ...this.prevState,
            data:await this.state.refVis().serverTiffasy()
        })
    }

    render() { 
        
        return ( 
        <div>
            <div>

            <h3>Visualization Module</h3>
                    <Divider style={{ margin: "6px 0" }} />
            </div>

            <div className ="myButton">
                <button onClick={
                    async ()=>{
                        this.setState({
                            ...this.prevState,
                            data:await this.state.refVis().serverTiffasy({
                                file:""
                            })
                        })

                    }}> Select File</button>
            </div>
            <br/>

            {
                this.state.data.vars.length>0  &&
                <select  onChange={this.changeSelect} value={this.state.data.var}>
                    {this.state.data.vars.map(val => <option value={val}>{val}</option>)}
                </select>
            }

            

                
        </div>
        
         );

    }

}




   
  

export default Visualization;