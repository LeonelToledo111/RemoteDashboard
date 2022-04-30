import React from 'react'

import {WebMercatorViewport} from '@deck.gl/core';

class Point extends React.Component {
    constructor(props){
      super(props);
  
      this.state = {
        viewState:this.props.viewState,
        lng:Number(this.props.lng),
        lat:Number(this.props.lat),
        x:0,
        y:0,
        r:Number(this.props.r),
        ref:React.createRef(),
        strokeWidth:2
      };
      
    }

    setPos = ([x,y]) => {
      this.state.x=x;
      this.state.y=y;
      this.state.ref.current.style.left=x-this.state.r-this.state.strokeWidth;
      this.state.ref.current.style.top=y-this.state.r-this.state.strokeWidth;
    }
  
  
    changeView = (viewState) =>{
      this.state.viewState=viewState;
      const viewport =new WebMercatorViewport(viewState);
      this.setPos(viewport.project([this.state.lng,this.state.lat]));
    }
  
    mouseMove = ({x,y}) => {
      this.setPos([x,y]);
      //this.props.refParent.current.updatePoints();
      //console.log(this.props.refParent.current.updatePoints());
      this.props.updatePointsParent && this.props.updatePointsParent();
      const viewport =new WebMercatorViewport(this.state.viewState);
      [this.state.lng,this.state.lat]=viewport.unproject([x,y]);
    }
  
    componentDidMount() {
      this.state.viewState.height=window.innerHeight;
      this.state.viewState.width=window.innerWidth;
      const viewport =new WebMercatorViewport(this.state.viewState);
      this.setPos(viewport.project([this.state.lng,this.state.lat]));
    }

    componentWillUnmount() {
      window.removeEventListener('mousemove', this.mouseMove)
    }
  
    render() {
      return (
          <svg
            id={this.state.id}
            ref={this.state.ref}
            style={{position:'absolute', pointerEvents:'none'}}
            width={2*this.state.r+2*this.state.strokeWidth} height={2*this.state.r+2*this.state.strokeWidth} >
            <circle
              style={{pointerEvents:'fill'}}
              cx={this.state.r+this.state.strokeWidth}
              cy={this.state.r+this.state.strokeWidth}
              r ={this.state.r} 
              fill={this.props.fill}
              stroke="black"
              strokeWidth={this.state.strokeWidth}
              opacity={this.props.opacity}
              onMouseDown={()=>window.addEventListener('mousemove', this.mouseMove)}
              onMouseUp={()=>window.removeEventListener('mousemove', this.mouseMove)}
            />
          </svg>
      );
    }
  }

  export default Point;
