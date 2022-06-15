import React, { Component } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

// https://stackoverflow.com/questions/52012591/react-leaflet-create-a-custom-components/52067137#52067137
// https://codesandbox.io/s/inspiring-http-p8lwj?file=/src/Map.js:292-303
class MapInfo extends React.Component {

    // constructor(props){
    //     super(props);
    
    //     this.state = {
    
    //     };
        
    // }
  createControl() {
    const MapInfo = L.Control.extend({
      onAdd: (map) => {
        const panelDiv = L.DomUtil.create("div", "info");

        map.addEventListener("mousemove", (ev) => {
          panelDiv.innerHTML = `<h2 style="background-color:#ffffff80; color:black;"><span>Lat:
            ${ev.latlng.lat.toFixed(4)}
            </span>&nbsp;<span>Lng:
            ${ev.latlng.lng.toFixed(4)}
            </span></h2>`;
        //   console.log(panelDiv.innerHTML);
        });
        return panelDiv;
      },
      
      onRemove: function (map) {
        // Nothing to do here
      }
    });
    return new MapInfo({ position: "bottomleft" });
    // return new MapInfo({ position: this.props.position });
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
