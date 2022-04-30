import React from 'react'
import {WebMercatorViewport} from '@deck.gl/core';
import Point from './Point';

class Polygon extends React.Component {
    constructor(props){
      super(props);
  
      this.state = {
        viewState:this.props.viewState,
        lng:Number(this.props.lng),
        lat:Number(this.props.lat),
        r:Number(this.props.r),
        refSVG:React.createRef(),
        refPoly:React.createRef(),
        points:[],
        strokeWidth:2
      };

      this.changeChildamarillo= React.createRef();
      
    }

    changeView = (viewState) =>{
      this.state.viewState=viewState;
      const viewport =new WebMercatorViewport(viewState);

      this.state.points.forEach(p=>{ p.ref.current.changeView(this.state.viewState)})

      this.updatePoints();
    }

    updatePoints =()=>{
      const x=this.state.points.map(p=>p.ref.current.state.x);
      const y=this.state.points.map(p=>p.ref.current.state.y);
      const lng=this.state.points.map(p=>p.ref.current.state.lng);
      const lat=this.state.points.map(p=>p.ref.current.state.lat);
      const xmin=Math.min.apply(null,x);
      const xmax=Math.max.apply(null,x);
      const ymin=Math.min.apply(null,y);
      const ymax=Math.max.apply(null,y);

      this.state.refSVG.current.style.left=xmin;
      this.state.refSVG.current.style.top=ymin;
      this.state.refSVG.current.style.width=xmax-xmin;
      this.state.refSVG.current.style.height=ymax-ymin;

      let xy='';
      for(let i=0;i<x.length;i++){
        xy=xy+`${x[i]-xmin},${y[i]-ymin} `;
      }
      this.state.refPoly.current.setAttribute("points", xy );
    }
  
    componentDidMount() {
      this.state.viewState.height=window.innerHeight;
      this.state.viewState.width=window.innerWidth;
      const viewport =new WebMercatorViewport(this.state.viewState);
      
      this.updatePoints();
    }

    componentWillUnmount() {
    }
  
    render() {
        this.state.viewState.height=window.innerHeight;
        this.state.viewState.width=window.innerWidth;
        
        for (var i = 0; i < 5; i += 1) {
            const alpha=6.283185307*i/5.0;
            this.state.points.push(
                <Point
                    key={100+i}
                    r="5"
                    lng={this.props.viewState.longitude+0.5*Math.cos(alpha)}
                    lat={this.props.viewState.latitude+0.5*Math.sin(alpha)}
                    fill="magenta" opacity="0.6"
                    ref={React.createRef()}
                    updatePointsParent={this.updatePoints}
                    viewState={this.state.viewState}
                />    
            );
        }

      return (
          <>
          
          <svg
            id={this.state.id}
            ref={this.state.refSVG}
            style={{position:'absolute', pointerEvents:'none'}}
          >
          <polygon
            // style={{pointerEvents:'fill'}}
            ref={this.state.refPoly}
            fill={this.props.fill}
            fillOpacity="0.4"
            stroke={this.props.fill}
            strokeWidth="1"
          />
            
          </svg>
          

          {this.state.points}
          </>
      );
    }
  }

  export default Polygon;
