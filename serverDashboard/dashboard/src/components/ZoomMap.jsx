//************************************************** */
import React, { Component, useState, useRef, useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import L from 'leaflet';


class ZoomMap extends React.Component {

    

    constructor(props){
        super(props);
        this.state = {
            min:    this.props.min || 0,
            max:    this.props.max || 100,
            value:  this.props.value || 0,
            step:   this.props.step || 1,
            title:  this.props.title || '',
            width:  this.props.width || 200,
            height: this.props.height || 20,
            eventSlider:  this.props.eventSlider,
        };

        
    }

    myChart=undefined;
    configTimeSeries=undefined;
    configHistogram=undefined;
    selectedTimeSeries=true;

    

    createControl() {
        const ZoomMap = L.Control.extend({
            options:{
                position: this.props.position || 'bottomleft',
            },

            onAdd: (map) => {
              const container = L.DomUtil.create('div','sliderL-container');
              // console.log("value",this.state.value)

              this.makeSlider(container);
              // map.addEventListener("zoom-start", (ev) => {
              //   this.sliderL.value=2
              //   console.log("HOLA")
              // });
                return container;
            },

            onRemove: function (map) {
            }
        });


        return new ZoomMap();
    }

    makeSlider(container){

        const { map, zoomLevel} = this.props;
        // console.log("makeSlider",zoomLevel);

        const label = L.DomUtil.create('p', 'sliderL-label',container);
        this.label=label;
        label.innerHTML = this.state.title;

        // label.innerHTML = this.state.title+'<br>'+this.state.value;

        const divSlider = L.DomUtil.create('div', 'sliderL',container);

        // const txtmin = L.DomUtil.create('span', '',divSlider);
        // txtmin.innerHTML = this.state.min;

        const sliderL = L.DomUtil.create('input', '',divSlider);
        this.sliderL=sliderL;

        // const txtmax = L.DomUtil.create('span', '',divSlider);
        // txtmax.innerHTML = this.state.max;

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
    

    
    
    componentDidMount() {
        console.log("*******componentDidMount**********");
        const { map, zoomLevel } = this.props;
        // console.log("***",zoomLevel);
        this.control=this.createControl();
        this.control.addTo(map)
    }

    componentWillUnmount() {
        console.log("*******componentWillUnmount**********");
        const { map } = this.props;
        this.control.remove(map);
    }

    render() {
        return null;
    }

}

//https://stackoverflow.com/questions/48264529/how-to-get-map-object-in-react-leaflet-on-zoom-change-event
function withMap(Component) {
  return function WrappedComponent(props) {
    
    const [zoomLevel, setZoomLevel] = useState(5); // initial zoom level provided for MapContainer
    const valueZoom = useRef(zoomLevel);
    //let valueZoom2 = React.createRef();
    // refZoomMap = React.createRef();
    // const mapEvents = useMapEvents({
    //     zoomend: () => {
    //         setZoomLevel(mapEvents.getZoom());
    //     },
    // });

    const mapEvents = useMapEvents({
        zoomend: () => {
            const zoom=mapEvents.getZoom()
            setZoomLevel(zoom);
            //console.log("valueZoom.current--->",valueZoom.current);
            
            valueZoom.current.sliderL.value=zoom
            //console.log("valueZoom.current.sliderL.value--->",valueZoom.current.sliderL.value);
            //valueZoom.current.this.state.value=zoomLevel
            //valueZoom2.current.value=mapEvents.getZoom()
            // console.log("--->",mapEvents.getZoom());
            // setZoomLevel(0);
            //console.log("--->",zoom);
        },
    });  
    
    // console.log(zoomLevel);
    // const mapEvents = useMapEvents({});
    // mapEvents.zoomend=() => { setZoomLevel(mapEvents.getZoom());console.log("dos"); }
    const map = useMap();

    //map.setView([7.369722, 12.354722], 16);
    //map.setView(map._lastCenter, 16);
    
    // console.log("***",map._lastCenter);
    //_lastCenter.lat
    //_lastCenter.lng
    
    

    //console.log("zoom:",map.leafletElement.getZoom())
    return <Component {...props} map={map}
    //value={map._zoom}
    //value={valueZoom.current}
    ref={valueZoom}
    value={zoomLevel}
    eventSlider={(value)=>{
      //console.log("Hola",value,mapEvents.getZoom());
      //console.log("***",map._lastCenter,map._zoom);
      map.setView(map._lastCenter, value);
    }}/>;
  };
}

export default withMap(ZoomMap);


