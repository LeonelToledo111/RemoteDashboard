import React from 'react'
import DeckGL from '@deck.gl/react';
import {BitmapLayer} from '@deck.gl/layers';

import GL from '@luma.gl/constants';
import {StaticMap} from 'react-map-gl';

import ColorBar from './ColorBar';
import Polygon from './Polygon';


const MAPBOX_ACCESS_TOKEN  = 'pk.eyJ1IjoibGlnaHRidXJuIiwiYSI6ImNpeXViOGptcDAwMmYzMmxmZml6am0xZG0ifQ.FiaHv8Pwcxr_LyuxMtry3w';



class MapboxContainerVis extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      viewState:this.INITIAL_VIEW_STATE
    };
    
    this.refPolygon= React.createRef();
  }

  
//   layers = [
//     new BitmapLayer(
//       {
//         bounds: [	[29.729181024020665,-9.124949795153519],
//                   [29.722060686155697,-8.132910271036955],
//                   [30.717158464545914,-8.125022545077010],
//                   [30.726869064542330,-9.116085005469523]
//                 ],
//         image: imagen,

//         textureParameters:
//         {
//           [GL.TEXTURE_MIN_FILTER]: GL.NEAREST,
//           [GL.TEXTURE_MAG_FILTER]: GL.NEAREST
//         },
//         opacity: 0.5,
//         desaturate: 0,
//       }),
//   ];


  INITIAL_VIEW_STATE = {
    longitude: -9.25,
    latitude: 38.25,
    zoom: 7,
    pitch: 0,
    bearing: 0
  };

  onViewStateChange = ({viewState}) => {
    const {width,height,latitude,longitude}=viewState;
    this.state.viewState=viewState;
    this.refPolygon.current.changeView(viewState);
    
  };
  
  updateDimensions = () => {
    this.state.viewState.width=window.innerWidth;
    this.state.viewState.height=window.innerHeight;
    this.refPolygon.current.changeView(this.state.viewState);
  };
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }
  
  render() {
    return (
      <div>
        <div className="mapContainer">
        <DeckGL
          className="mapContainer2"
          controller={true}
          initialViewState={this.INITIAL_VIEW_STATE}
          onViewStateChange={this.onViewStateChange}
          layers={this.layers}>
          <StaticMap mapStyle="mapbox://styles/mapbox/satellite-streets-v9" mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
        </DeckGL>

        <Polygon
          r="10" lng="-7.0" lat="38.0"
          fill="gray" opacity="0.6"
          ref={this.refPolygon}
          viewState={this.INITIAL_VIEW_STATE}
        />
        
        <ColorBar x="200" y="500" width="20" height="400" min="-2" max="7"/>
        </div>
      </div>
    );
  }

}
    
export default MapboxContainerVis;
