import React, { Component } from "react";
import { useMap } from "react-leaflet";
import L from 'leaflet';
import {mapColor} from './mapColor.json'


// https://stackoverflow.com/questions/52012591/react-leaflet-create-a-custom-components/52067137#52067137
// https://codesandbox.io/s/inspiring-http-p8lwj?file=/src/Map.js:292-303
class ColorBar extends React.Component {

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
              this.map=map;
              console.log("******ColorBar*******",this.state.min, this.state.max)
              const container = L.DomUtil.create('div', 'leaflet-insets');
              this.container = container;
              this.container.innerHTML = this.makeBar();
              this.update=()=>{
                console.log("******update ColorBar*******")
                this.container.innerHTML = this.makeBar();
              };


              return this.container;
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
      this.control=control;
      this.control.addTo(map);

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

export default withMap(ColorBar);


