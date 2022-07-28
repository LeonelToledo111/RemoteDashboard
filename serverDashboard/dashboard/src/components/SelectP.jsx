import React, { Component } from 'react';

class SelectP extends Component {
    constructor(props){
        super(props)
       
        this.state = {
            value: '',
            select: '',
            event:  this.props.event
        }
       
      this.handleUpdate = this.handleUpdate.bind(this)
      this.handleChange = this.handleChange.bind(this);
    }

   
    handleUpdate(vars){

        const options=vars.map( v=> React.createElement('option', {}, v) );
        this.setState({
            ...this.prevState,
            select:React.createElement('select', {
                onChange:this.handleChange
            }, options)
        })
        
        console.log("vars handle: ",vars.map((v)=>v));
    }

    componentDidMount() {
        const { childRef } = this.props;
        childRef(this);
    }
    
      
    componentWillUnmount() {
        const { childRef } = this.props;
        childRef(undefined);
    }

    handleChange(event) {
        console.log("1value: ", this.state.value, event.target.value)
        this.setState({...this.prevState, value: event.target.value});
        console.log("2value: ", this.state.value, event.target.value)
        this.state.event(event.target.value);
    }

    render(){
        return (
            <div>
                <h2>Select Variable:</h2>
                {this.state.select}

            </div>
        )
    }
}

export default SelectP;