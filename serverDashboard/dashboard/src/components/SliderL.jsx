import React, { Component } from "react";
import { useMap } from "react-leaflet";
import L from 'leaflet';
import {mapColor} from './mapColor.json'


// https://stackoverflow.com/questions/52012591/react-leaflet-create-a-custom-components/52067137#52067137
// https://codesandbox.io/s/inspiring-http-p8lwj?file=/src/Map.js:292-303
class SliderL extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            min:    this.props.min || 0,
            max:    this.props.max || 100,
            value:  this.props.value || 0,
            step:   this.props.step || 1,
            title:  this.props.title || '',
            show:   this.props.show || true,
            width:  this.props.width || 200,
            height: this.props.height || 20,
            event:  this.props.event
        };
    }

    createControl() {
        const ColorBar = L.Control.extend({
            options:{
                //top right, topleft, bottom right, bottom left
                position: this.props.position || 'bottomleft',
            },

            onAdd: (map) => {

              const container = L.DomUtil.create('div','sliderL-container');
              this.container = container;
              this._makeSlider(container);
              map.update=()=>{
                if( this.state.show ){
                    this.control.addTo(map);
                }                    
                else{
                    this.control.remove(map);
                }
                    
                //   this._container.innerHTML = this.makeBar();
              };
              
              return container;
            },

            onRemove: function (map) {
              // Nothing to do here
            }
        });
        return new ColorBar();
        // return new ColorBar({ position: "bottomleft" });
        // return new MapInfo({ position: this.props.position });
    }

    _makeSlider(container){
        const label = L.DomUtil.create('p', 'sliderL-label',container);
        this.label=label;
        label.innerHTML = this.state.title+' '+this.state.value;

        const div = L.DomUtil.create('div', 'sliderL',container);

        const txtmin = L.DomUtil.create('span', '',div);
        txtmin.innerHTML = this.state.min;

        const sliderL = L.DomUtil.create('input', '',div);

        const txtmax = L.DomUtil.create('span', '',div);
        txtmax.innerHTML = this.state.max;
        
        sliderL.type="range";
        sliderL.min=this.state.min;
        sliderL.max=this.state.max;
        sliderL.step=this.state.step;
        sliderL.value=this.state.value;
        sliderL.innerHTML = "MiSlider";
        this.sliderL=sliderL;

        L.DomEvent.on(
            this.sliderL,
            "mousedown mouseup click touchstart",
            L.DomEvent.stopPropagation
          );

        sliderL.addEventListener("click", () => {
          this.label.innerHTML=this.state.title+' '+this.sliderL.value
          this.state.value=this.sliderL.value
          this.state.event()
          
        });
        
    }

    componentDidMount() {
      const { map } = this.props;
      const control = this.createControl();
      this.control=control;
      this.control.addTo(map);
      this.control.remove(map);
    
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

export default withMap(SliderL);


