import React, { Component } from 'react';

class Counter extends Component {

    state={
        count: this.props.value,
        imageUrl: 'https://picsum.photos/200',
        tags: ['tag1', 'tag2','tag3']
    };

    styles = {
        fontSize: 18,
        fongWeight: "bold"

    }

    constructor(props){
        super(props);
        this.handleIncrement = this.handleIncrement.bind(this);

    }

    handleIncrement(product){
     //   console.log(product);
        this.setState({count: this.state.count + 1});

    }

    renderTags(){
        if(this.state.tags.length ===0) return <p>NO TAGS</p>

        return <ul>
            { this.state.tags.map(tag=><li key={tag}>{tag}</li>) }
        </ul>;
        

    }

    doHandleIncrement = () => {
        this.handleIncrement({id: 1});
    }


    render() { 
        let classes = this.getBadgeClasses();

        console.log('props', this.props);

        return <div>
            {this.props.children}
            <img src ={this.state.imageUrl} alt=""/>
            <span style= {this.styles} className={classes}>{this.formatCount()}</span>
                <button 
                onClick={this.doHandleIncrement}
                className="btn btn-secondary btn-sm">Increment!!!
                
                </button>
            
                {this.renderTags()}
            </div>;
    }  

    getBadgeClasses() {
        let classes = "badge m-2 badge-";
        classes += this.state.count === 0 ? "warning" : "primary";
        return classes;
    }

    formatCount(){
        const { count } =this.state;
        return count === 0 ? 'Zero' : count;

    }
}
export default Counter;