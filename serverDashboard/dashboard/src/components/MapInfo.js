import React, { Component } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

class MapInfo extends React.Component {

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
        });
        return panelDiv;
      },
      
      onRemove: function (map) {
      }
    });
    return new MapInfo({ position: "bottomleft" });
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
