import React, { Component } from "react";
import { useMap } from "react-leaflet";
import L from 'leaflet';
import {mapColor} from './mapColor.json'

/*
function ColorBar(props) {
  const context = useLeafletContext()
  //https://stackoverflow.com/questions/38678889/how-to-reference-the-leaflet-layer-of-a-react-leaflet-component
  //https://stackoverflow.com/questions/38678889/how-to-reference-the-leaflet-layer-of-a-react-leaflet-component
  // leaftlet control extend React.createRef
  //https://stackoverflow.com/questions/47772227/how-to-make-svg-paths-clickable-in-leaflet-and-get-path-id-by-clicking
  // https://stackoverflow.com/questions/27499803/adding-pre-defined-static-svg-to-a-leaflet-map-doesnt-work
  // Marker icono SVG https://stackoverflow.com/questions/23567203/leaflet-changing-marker-color
  //Control extend  https://stackoverflow.com/questions/62947152/react-leaflet-v3-custom-control
  //                https://leafletjs.com/examples/extending/extending-1-classes.html
  //                https://leafletjs.com/examples/extending/extending-2-layers.html
  //                https://leafletjs.com/examples/extending/extending-3-controls.html
  L.Control.ColorBar = L.Control.extend({
      onAdd: function (map) {
          // var img = L.DomUtil.create('img');
          // img.src = 'logo512.png';
          // img.style.width = '200px';
          // return img;
          const width=200;
          const height=20;

          console.log(props.min, props.max)

          this._container = L.DomUtil.create('div', 'leaflet-insets');
	    	    	    
	        var xHTML = '';
          xHTML += `<svg width=${1.2*width} height=${3*height} `;
          xHTML += 'style="background-color:#ffffff80"';
          xHTML += '>';
          

          const N=mapColor.length;
          mapColor.forEach((color,index)=>{
            xHTML += `<rect width=${width/N+1} height=${height} `;
            xHTML += `x=${0.1*width+width*index/N} y=${1.6*height} `;
            xHTML += `fill=rgb(${color}) />`;
          })
          // xHTML += `<rect x=${width} y=0 width=${width} height=${height} fill='white'/>`;
          // <text x="0" y="15" fill="red">I love SVG!</text>
                    
          xHTML += `<text x=${0.1*width} y=${1.4*height} text-anchor="middle" fill='black'>${props.min}</text>`;
          xHTML += `<text x=${0.6*width} y=${0.8*height} text-anchor="middle" fill='black'>${props.title}</text>`;
          xHTML += `<text x=${1.1*width} y=${1.4*height} text-anchor="middle" fill='black'>${props.max}</text>`;

          xHTML += '</svg>';

	        
	        this._container.innerHTML = xHTML;
        
	        return this._container;

      },

      onRemove: function (map) {
          // Nothing to do here
      }
  });

  L.control.colorBar = function (opts) {
      return new L.Control.ColorBar(opts);
  }

  useEffect(() => {
      const container = context.layerContainer || context.map

      const control = L.control.colorBar({ position: props.position })
      container.addControl(control)

      return () => {
          container.removeControl(control)
      }
  })

  return null
}

export default ColorBar;
*/



// https://stackoverflow.com/questions/52012591/react-leaflet-create-a-custom-components/52067137#52067137
// https://codesandbox.io/s/inspiring-http-p8lwj?file=/src/Map.js:292-303
class MapInfo extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            min:    this.props.min || 0,
            max:    this.props.max || 0,
            title:  this.props.title || '',
            width:  this.props.width || 200,
            height: this.props.height || 20,
        };
    }

    createControl() {
        const ColorBar = L.Control.extend({
            options:{
                //top right, topleft, bottom right, bottom left
                position: this.props.position || 'bottomleft',
            },

            onAdd: (map) => {

              console.log(this.state.min, this.state.max)
              this._container = L.DomUtil.create('div', 'leaflet-insets');
              this._container.innerHTML = this.makeBar();
              map.update=()=>{ this._container.innerHTML = this.makeBar();};
              return this._container;
            },

            onRemove: function (map) {
              // Nothing to do here
            }
        });
        return new ColorBar();
        // return new ColorBar({ position: "bottomleft" });
        // return new MapInfo({ position: this.props.position });
    }

    makeBar(){
      const width=this.state.width;
      const height=this.state.height;
      var xHTML = '';
      xHTML += `<svg width=${1.2*width} height=${3*height} `;
      xHTML += 'style="background-color:#ffffff80"';
      xHTML += '>';

      const N=mapColor.length;
      mapColor.forEach((color,index)=>{
        xHTML += `<rect width=${width/N+1} height=${height} `;
        xHTML += `x=${0.1*width+width*index/N} y=${1.6*height} `;
        xHTML += `fill=rgb(${color}) />`;
      })

      xHTML += `<text x=${0.1*width} y=${1.4*height} text-anchor="start" fill='black'>${this.state.min}</text>`;
      xHTML += `<text x=${0.6*width} y=${0.8*height} text-anchor="middle" fill='black'>${this.state.title}</text>`;
      xHTML += `<text x=${1.1*width} y=${1.4*height} text-anchor="end" fill='black'>${this.state.max}</text>`;
      xHTML += '</svg>';
      return xHTML;
    }

    componentDidMount() {
      const { map } = this.props;
      const control = this.createControl();
      control.addTo(map);

      const { childRef } = this.props;
      childRef(this);
    }


    componentWillUnmount() {
     const { childRef } = this.props;
      childRef(undefined);
    }

    render() {
      return null;
    }
}

function withMap(Component) {
  return function WrappedComponent(props) {
    const map = useMap();
    return <Component {...props} map={map} />;
  };
}

export default withMap(MapInfo);
// import React from 'react'
// import {WebMercatorViewport} from '@deck.gl/core';
// import Text from './Text';


// class ColorBar extends React.Component {
//     constructor(props){
//       super(props);
//       this.state = {
//         x:Number(this.props.x),
//         y:Number(this.props.y),

//         min:Number(this.props.min),
//         max:Number(this.props.max),

//         refSVG:React.createRef(),
//         strokeWidth:2,

//         width:Number(this.props.width),
//         height:Number(this.props.height),
//         offsetX:0,
//         offsetY:0,
//       };
//       this.arrayText={dom:[],pos:[]};
//       this.N=5;
//     }
    
//     setPos = ([x,y]) => {
//         this.state.refSVG.current.style.left=x;
//         this.state.refSVG.current.style.top=y;

//         for (var i = 0; i < this.arrayText.dom.length; i += 1) {
//           const alpha=i/(this.N-1);
//           this.arrayText.dom[i].ref.current.setPos([x+this.arrayText.pos[i].x,y+this.arrayText.pos[i].y]);
//         }
//     }
    
//     mouseMove = ({x,y}) => {
//         this.setPos([x-this.state.offsetX,y-this.state.offsetY]);
//     }

//     mouseDown = ({offsetX,offsetY}) => {
//         this.state.offsetX=offsetX;
//         this.state.offsetY=offsetY;
//         window.addEventListener('mousemove', this.mouseMove)
//     }
  
//     componentDidMount() {
//       this.setPos([this.props.x-this.state.width/2, this.props.y-this.state.height/2]);
//     }

//     componentWillUnmount() {
//       window.removeEventListener('mousedown', this.mouseDown);
//       window.removeEventListener('mousemove', this.mouseMove)
//     }
  
//     render() {
//       let index=0;
//       this.arrayText.pos.push({x:-20, y:this.state.height/2});
//       this.arrayText.dom.push(
//         <Text
//           ref={React.createRef()}
//           key={index}
//           x={this.state.x+this.arrayText.pos[index].x}
//           y={this.state.y+this.arrayText.pos[index].y}
//           rotate={true}
//         >
//         {"Variable"}
//         </Text>);
//       index=index+1;

//       for (var i = 0; i < this.N; i += 1) {
//         const alpha=i/(this.N-1);
//         this.arrayText.pos.push({x:this.state.width+5, y:this.state.height-this.state.height*alpha});
//         this.arrayText.dom.push(<Text
//           ref={React.createRef()}
//           key={index}
//           x={this.state.x+this.arrayText.pos[index].x}
//           y={this.state.y+this.arrayText.pos[index].y}
//           >
//           {this.state.min+(this.state.max-this.state.min)*alpha}
//           </Text>);
//         index++;
//       };
//       return (
//         <>
//           <svg
//             ref={this.state.refSVG}
//             style={{position:'absolute'}}
//             width={this.state.width} height={this.state.height} >
//             <defs>
//             	<linearGradient id='ColorMap' x1='0' y1='1' x2='0' y2='0'>
//             	<stop offset=  '0.00%' stopColor='rgb(153,102,255)'/>
//             	<stop offset= '16.66%' stopColor='rgb(0,0,255)'/>
//             	<stop offset= '33.33%' stopColor='rgb(0,255,0)'/>
//             	<stop offset= '50.00%' stopColor='rgb(255,255,255)'/>
//             	<stop offset= '66.66%' stopColor='rgb(255,255,0)'/>
//             	<stop offset= '83.33%' stopColor='rgb(255,102,0)'/>
//             	<stop offset='100.00%' stopColor='rgb(255,0,0)'/>
//             	</linearGradient>
//             </defs>

//             <rect
//                 width={this.state.width}
//                 height={this.state.height}
//                 fill='url(#ColorMap)'
//                 onMouseDown={()=>window.addEventListener('mousedown', this.mouseDown)}
//                 onMouseUp={()=>{window.removeEventListener('mousedown', this.mouseDown); window.removeEventListener('mousemove', this.mouseMove);}}
//             />
//           </svg>
//             {this.arrayText.dom}
//         </>
//       );
//     }
// }


// export default ColorBar;

