import React from 'react'

import {WebMercatorViewport} from '@deck.gl/core';

class Text extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        x:Number(this.props.x),
        y:Number(this.props.y),
        r:Number(this.props.r),
        rotate:!!this.props.rotate,
        refSVG:React.createRef(),
        refTextBack:React.createRef(),
        refTextFront:React.createRef(),
        strokeWidth:2,

        width:0,
        height:0,
      };
    }
    
    setPos = ([x,y]) => {
        this.state.refSVG.current.style.left=x-this.state.width/2;
        this.state.refSVG.current.style.top=y-this.state.height/2;
    }
    
    componentDidMount() {
      const {height, width, x, y}=this.state.refTextBack.current.getBBox();

      if(this.props.rotate){
        this.state.refTextBack.current.setAttribute("transform",`rotate(-90,0,0)`);
        this.state.refTextBack.current.setAttribute("x",-width);
        this.state.refTextBack.current.setAttribute("y",-y);
        this.state.refTextFront.current.setAttribute("transform",`rotate(-90,0,0)`);
        this.state.refTextFront.current.setAttribute("x",-width);
        this.state.refTextFront.current.setAttribute("y",-y);
        this.state.refSVG.current.setAttribute("width",height);
        this.state.refSVG.current.setAttribute("height",width);
      }
      else{
        this.state.refTextBack.current.setAttribute("x",-x);
        this.state.refTextBack.current.setAttribute("y",-y);
        this.state.refTextFront.current.setAttribute("x",-x);
        this.state.refTextFront.current.setAttribute("y",-y);
        this.state.refSVG.current.setAttribute("width",width);
        this.state.refSVG.current.setAttribute("height",height);
      }

      this.state.width=0;
      this.state.height=height;

      this.setPos([this.props.x,this.props.y]);
      
    }

    render() {
      return (
          <svg
            ref={this.state.refSVG}
            style={{position:'absolute'}}
          >
            <text
                ref={this.state.refTextBack}
                x='0' y='0'
                stroke="black" strokeWidth="3"
                //fill='magenta'
                fontFamily='Times'
                fontSize='100%' textAnchor='start'
                //transform='rotate(-90,0,0)'
            >
                {this.props.children}
            </text>
            <text
                ref={this.state.refTextFront}
                x='0' y='0'
                fill='white'
                fontFamily='Times'
                fontSize='100%' textAnchor='start'
            >
                {this.props.children}
            </text>
            
            </svg>
      );
    }
}

export default Text;

