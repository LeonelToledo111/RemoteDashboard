import React, { Component } from "react";
import { useMap } from "react-leaflet";
import L from 'leaflet';

class ControlTiff extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            min:    this.props.min || 0,
            max:    this.props.max || 0,
            value:  this.props.value || 0,
            vars:   this.props.vars || [],
            var:   this.props.var || '',
            band:   this.props.band || 1,
            bandN:   this.props.bandN || 0,
            ext:   this.props.ext || '',

            step:   this.props.step || 1,
            title:  this.props.title || '',
            width:  this.props.width || 200,
            height: this.props.height || 20,
            eventSlider:  this.props.eventSlider,
            eventSelect:  this.props.eventSelect,
        };
    }

    createControl() {
        const ControlTiff = L.Control.extend({
            options:{
                position: this.props.position || 'bottomleft',
            },

            onAdd: (map) => {
              const container = L.DomUtil.create('div','sliderL-container');
              this.makeSlider(container);
                return container;
            },

            onRemove: function (map) {
            }
        });
        return new ControlTiff();
    }

    makeSlider(container){

      if( this.state.min != this.state.max ){
        const label = L.DomUtil.create('p', 'sliderL-label',container);
        this.label=label;
        
        label.innerHTML = this.state.title+'<br>'+this.state.value;

        const divSlider = L.DomUtil.create('div', 'sliderL',container);

        const txtmin = L.DomUtil.create('span', '',divSlider);
        txtmin.innerHTML = this.state.min;

        const sliderL = L.DomUtil.create('input', '',divSlider);
        this.sliderL=sliderL;

        const txtmax = L.DomUtil.create('span', '',divSlider);
        txtmax.innerHTML = this.state.max;

        sliderL.type="range";
        sliderL.min=this.state.min;
        sliderL.max=this.state.max;
        sliderL.step=this.state.step;
        sliderL.value=this.state.value;
        sliderL.innerHTML = "MiSlider";
        
        L.DomEvent.on(
          this.sliderL,
          "mousedown mouseup click touchstart",
          L.DomEvent.stopPropagation
        );
        // sliderL.addEventListener("input", () => {
        sliderL.addEventListener("click", () => {
          this.state.value=this.sliderL.value
          this.state.eventSlider(this.sliderL.value)
        });
      }
        

        const selectL = L.DomUtil.create('select', 'selectL',container);

        this.selectL=selectL;
        
        
        // this.divSelect=divSelect
        if( this.state.ext=="tif"){
          for(let i=1; i<=this.state.bandN; i++){
            let bandString = "Band"+String(i);
            const optionL = L.DomUtil.create('option', "",selectL);
            optionL.value=i;
            optionL.innerHTML = bandString;
            if(this.state.band == i){
              this.selectL.value = i;
            }
          }
        }
        else{
          this.state.vars.forEach(var_i => {
            const optionL = L.DomUtil.create('option', "",selectL);
            optionL.value=var_i;
            optionL.innerHTML = var_i;
            if(this.state.var!=""){
              this.selectL.value=this.state.var;
            }
          });
        }
        
        // for(let i=0;i<5;i++){
        //   const divOption = L.DomUtil.create('option', "",divSelect);
        //   divOption.value="Hola";
        //   divOption.innerHTML = "Hola";
        // }
        
        // const divOption2 = L.DomUtil.create('option', "",divSelect);
        // divOption2.value="Mundo";
        // divOption2.innerHTML = "Mundo";

        // for(let i; i<5;i++){
        //   const divOption = L.DomUtil.create('option', "Hola"+String(i),divSelect);
        //   divOption.value="Hola"+String(i);
        //   divOption.innerHTML = "Hola"+String(i);
        // }
        
        
        
      L.DomEvent.on(
        this.selectL,
        "mousedown mouseup click touchstart",
        L.DomEvent.stopPropagation
      );
      
      selectL.addEventListener("click", () => {
        this.state.value=this.selectL.value
        this.state.eventSelect(this.selectL.value)
      });
        
    }

    componentDidMount() {
      const { map } = this.props;
      this.control=this.createControl();
      this.control.addTo(map)
    }


    componentWillUnmount() {
      const { map } = this.props;
      this.control.remove(map);
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

export default withMap(ControlTiff);


