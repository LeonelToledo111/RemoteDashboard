import React, { Component } from 'react';

class SelectP extends Component {
    constructor(props){
        super(props)
       
        // Set initial state
        this.state = {
            // msg : 'Hi, There!',
            value: '',
            select: '',
            event:  this.props.event
        }
       
      // Binding this keyword
    //   this.handleChange = this.handleChange.bind(this)
      this.handleUpdate = this.handleUpdate.bind(this)
      this.handleChange = this.handleChange.bind(this);
    }

   
    handleUpdate(vars){
        // Changing state
        // const title=[]
        // vars.forEach(v=>{
        //     title.push( React.createElement('option', {}, v) );
        // })

        const options=vars.map( v=> React.createElement('option', {}, v) );
        this.setState({
            ...this.prevState,
            select:React.createElement('select', {
                // value:this.state.value,
                onChange:this.handleChange
            }, options)
        })
        
        // const container = React.createElement('div', {}, title);
        //this.setState({...this.prevState, msg : "**********Hola*********", select:React.createElement('select', {}, title)})
        
        // this.state.select.innerHTML = "NUEVO"
        console.log("vars handle: ",vars.map((v)=>v));
        // this.state.title = React.createElement('h1', {}, 'My First React Code');
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
                {/* <p>{this.state.msg}</p> */}
                {/* Set click handler */}
                {/* <button onClick={this.update}>
                    Click here!
                </button> */}
                {/* <select value={this.state.value} onChange={this.handleChange}>
                    <option value="grapefruit">Grapefruit</option>
                    <option value="lime">Lime</option>
                    <option value="coconut">Coconut</option>
                    <option value="mango">Mango</option>
                </select> */}
                {this.state.select}

            </div>
        )
    }
}

export default SelectP;