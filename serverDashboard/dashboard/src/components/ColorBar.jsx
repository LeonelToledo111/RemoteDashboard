import React from 'react'
import {WebMercatorViewport} from '@deck.gl/core';
import Text from './Text';


class ColorBar extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        x:Number(this.props.x),
        y:Number(this.props.y),

        min:Number(this.props.min),
        max:Number(this.props.max),

        refSVG:React.createRef(),
        strokeWidth:2,

        width:Number(this.props.width),
        height:Number(this.props.height),
        offsetX:0,
        offsetY:0,
      };
      this.arrayText={dom:[],pos:[]};
      this.N=5;
    }
    
    setPos = ([x,y]) => {
        this.state.refSVG.current.style.left=x;
        this.state.refSVG.current.style.top=y;

        for (var i = 0; i < this.arrayText.dom.length; i += 1) {
          const alpha=i/(this.N-1);
          this.arrayText.dom[i].ref.current.setPos([x+this.arrayText.pos[i].x,y+this.arrayText.pos[i].y]);
        }
    }
    
    mouseMove = ({x,y}) => {
        this.setPos([x-this.state.offsetX,y-this.state.offsetY]);
    }

    mouseDown = ({offsetX,offsetY}) => {
        this.state.offsetX=offsetX;
        this.state.offsetY=offsetY;
        window.addEventListener('mousemove', this.mouseMove)
    }
  
    componentDidMount() {
      this.setPos([this.props.x-this.state.width/2, this.props.y-this.state.height/2]);
    }

    componentWillUnmount() {
      window.removeEventListener('mousedown', this.mouseDown);
      window.removeEventListener('mousemove', this.mouseMove)
    }
  
    render() {
      let index=0;
      this.arrayText.pos.push({x:-20, y:this.state.height/2});
      this.arrayText.dom.push(
        <Text
          ref={React.createRef()}
          key={index}
          x={this.state.x+this.arrayText.pos[index].x}
          y={this.state.y+this.arrayText.pos[index].y}
          rotate={true}
        >
        {"Variable"}
        </Text>);
      index=index+1;

      for (var i = 0; i < this.N; i += 1) {
        const alpha=i/(this.N-1);
        this.arrayText.pos.push({x:this.state.width+5, y:this.state.height-this.state.height*alpha});
        this.arrayText.dom.push(<Text
          ref={React.createRef()}
          key={index}
          x={this.state.x+this.arrayText.pos[index].x}
          y={this.state.y+this.arrayText.pos[index].y}
          >
          {this.state.min+(this.state.max-this.state.min)*alpha}
          </Text>);
        index++;
      };
      return (
        <>
          <svg
            ref={this.state.refSVG}
            style={{position:'absolute'}}
            width={this.state.width} height={this.state.height} >
            <defs>
            	<linearGradient id='ColorMap' x1='0' y1='1' x2='0' y2='0'>
            	<stop offset=  '0.00%' stopColor='rgb(153,102,255)'/>
            	<stop offset= '16.66%' stopColor='rgb(0,0,255)'/>
            	<stop offset= '33.33%' stopColor='rgb(0,255,0)'/>
            	<stop offset= '50.00%' stopColor='rgb(255,255,255)'/>
            	<stop offset= '66.66%' stopColor='rgb(255,255,0)'/>
            	<stop offset= '83.33%' stopColor='rgb(255,102,0)'/>
            	<stop offset='100.00%' stopColor='rgb(255,0,0)'/>
            	</linearGradient>
            </defs>

            <rect
                width={this.state.width}
                height={this.state.height}
                fill='url(#ColorMap)'
                onMouseDown={()=>window.addEventListener('mousedown', this.mouseDown)}
                onMouseUp={()=>{window.removeEventListener('mousedown', this.mouseDown); window.removeEventListener('mousemove', this.mouseMove);}}
            />
          </svg>
            {this.arrayText.dom}
        </>
      );
    }
}


export default ColorBar;

