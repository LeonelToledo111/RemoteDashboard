import React from 'react'
import mapboxgl from 'mapbox-gl'
import { lineString as makeLineString} from '@turf/helpers';
import { greatCircle, point } from "@turf/turf";
import { turf } from "@turf/turf";
import DeckGL from '@deck.gl/react';
import {GridLayer} from '@deck.gl/aggregation-layers';
import {ScreenGridLayer} from '@deck.gl/aggregation-layers';
import {StaticMap} from 'react-map-gl';
import yieldData from './maize-yield-europe2.geojson';
import bikes from './bikes.json';
import out from './../PythonHelpers/out.json';

const MAPBOX_ACCESS_TOKEN  = 'pk.eyJ1IjoibGlnaHRidXJuIiwiYSI6ImNpeXViOGptcDAwMmYzMmxmZml6am0xZG0ifQ.FiaHv8Pwcxr_LyuxMtry3w';

class MapboxContainer2 extends React.Component {

   INITIAL_VIEW_STATE = {
    longitude: -9.25,
    latitude: 38.25,
    zoom: 7,
    pitch: 0,
    bearing: 0
  };

  yieldData3 =[
    [-117.30341,33.22547],
  [-118.67079,34.03948],
  [-118.33162,34.1104],
  [-118.13172,34.17861],
  [-121.56808,39.11559],
  [-117.91471,33.78928],
  [-122.04308,36.95624],
  [-122.03003,36.99908],
  [-118.13014,34.01371],
  [-122.24756,37.80969],
  [-122.39372,37.79396],
  [-124.17367,40.79938],
  [-122.05567,37.92846],
  [-121.99976,37.5344],
  [-122.03456,37.01582],
  [-118.03066,34.10788],
  [-117.6062,33.41253],
  [-118.36223,34.13903],
  [-118.36223,34.13903],
  ]

  yieldData2 = 
    [
{ "RACKS":200,"SPACES":4000, "COORDINATES": [ 26.75, 47.25 ] } ,
{ "RACKS":100,"SPACES":2000,  "COORDINATES": [ 27.25, 47.25 ] } ,
{ "type": "Feature",  "COORDINATES": [ 27.75, 47.25 ] },
{ "type": "Feature", "properties": { "lon": 28.25, "lat": 47.25, "yield": "6.16234" }, "geometry": { "type": "Point", "COORDINATES": [ 28.25, 47.25 ] } },
{ "type": "Feature", "properties": { "lon": 28.75, "lat": 47.25, "yield": "6.05127" }, "geometry": { "type": "Point", "COORDINATES": [ 28.75, 47.25 ] } },
{ "type": "Feature", "properties": { "lon": 29.25, "lat": 47.25, "yield": "5.82665" }, "geometry": { "type": "Point", "COORDINATES": [ 29.25, 47.25 ] } },
{ "type": "Feature", "properties": { "lon": 29.75, "lat": 47.25, "yield": "5.63293" }, "geometry": { "type": "Point", "COORDINATES": [ 29.75, 47.25 ] } },
{ "type": "Feature", "properties": { "lon": 30.25, "lat": 47.25, "yield": "4.89711" }, "geometry": { "type": "Point", "COORDINATES": [ 30.25, 47.25 ] } },
{ "type": "Feature", "properties": { "lon": 30.75, "lat": 47.25, "yield": "3.27032" }, "geometry": { "type": "Point", "COORDINATES": [ 30.75, 47.25 ] } },
{ "type": "Feature", "properties": { "lon": 31.25, "lat": 47.25, "yield": "3.43357" }, "geometry": { "type": "Point", "COORDINATES": [ 31.25, 47.25 ] } },
{ "type": "Feature", "properties": { "lon": 31.75, "lat": 47.25, "yield": "2.94118" }, "geometry": { "type": "Point", "COORDINATES": [ 31.75, 47.25 ] } },
{ "type": "Feature", "properties": { "lon": 32.25, "lat": 47.25, "yield": "3.25197" }, "geometry": { "type": "Point", "COORDINATES": [ 32.25, 47.25 ] } },
{ "type": "Feature", "properties": { "lon": 32.75, "lat": 47.25, "yield": "3.14566" }, "geometry": { "type": "Point", "COORDINATES": [ 32.75, 47.25 ] } },
{ "type": "Feature", "properties": { "lon": 33.25, "lat": 47.25, "yield": "2.85553" }, "geometry": { "type": "Point", "COORDINATES": [ 33.25, 47.25 ] } },
{ "type": "Feature", "properties": { "lon": 33.75, "lat": 47.25, "yield": "2.79545" }, "geometry": { "type": "Point", "COORDINATES": [ 33.75, 47.25 ] } },
{ "type": "Feature", "properties": { "lon": 34.25, "lat": 47.25, "yield": "2.22357" }, "geometry": { "type": "Point", "COORDINATES": [ 34.25, 47.25 ] } },
{ "type": "Feature", "properties": { "lon": 34.75, "lat": 47.25, "yield": "2.13249" }, "geometry": { "type": "Point", "COORDINATES": [ 34.75, 47.25 ] } },
{ "type": "Feature", "properties": { "lon": 35.25, "lat": 47.25, "yield": "2.55634" }, "geometry": { "type": "Point", "COORDINATES": [ 35.25, 47.25 ] } },
{ "type": "Feature", "properties": { "lon": 35.75, "lat": 47.25, "yield": "2.99797" }, "geometry": { "type": "Point", "COORDINATES": [ 35.75, 47.25 ] } },
{ "type": "Feature", "properties": { "lon": 36.25, "lat": 47.25, "yield": "3.24474" }, "geometry": { "type": "Point", "COORDINATES": [ 36.25, 47.25 ] } },
{ "type": "Feature", "properties": { "lon": 36.75, "lat": 47.25, "yield": "3.38301" }, "geometry": { "type": "Point", "COORDINATES": [ 36.75, 47.25 ] } },
{ "type": "Feature", "properties": { "lon": 37.25, "lat": 47.25, "yield": "2.8321" }, "geometry": { "type": "Point", "COORDINATES": [ 37.25, 47.25 ] } },
{ "type": "Feature", "properties": { "lon": 37.75, "lat": 47.25, "yield": "2.84478" }, "geometry": { "type": "Point", "COORDINATES": [ 37.75, 47.25 ] } },
{ "type": "Feature", "properties": { "lon": 38.25, "lat": 47.25, "yield": "3.16033" }, "geometry": { "type": "Point", "COORDINATES": [ 38.25, 47.25 ] } },
{ "type": "Feature", "properties": { "lon": 38.75, "lat": 47.25, "yield": "2.97425" }, "geometry": { "type": "Point", "COORDINATES": [ 38.75, 47.25 ] } },
{ "type": "Feature", "properties": { "lon": 39.25, "lat": 47.25, "yield": "3.10086" }, "geometry": { "type": "Point", "COORDINATES": [ 39.25, 47.25 ] } },
{ "type": "Feature", "properties": { "lon": 39.75, "lat": 47.25, "yield": "3.86776" }, "geometry": { "type": "Point", "COORDINATES": [ 39.75, 47.25 ] } },
{ "type": "Feature", "properties": { "lon": 40.25, "lat": 47.25, "yield": "3.25098" }, "geometry": { "type": "Point", "COORDINATES": [ 40.25, 47.25 ] } },
    ]
  

  render() {      

        const layers = [
          new GridLayer({
            id: 'GridLayer',
            //data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf-bike-parking.json',
            data: out,
            opacity: 0.8,
            minColor: [0, 0, 0, 0],
            getPosition: d => d.COORDINATES,
            cellSize: 75000,
            //cellSize: 200,
            pickable: true,
            extruded: true,
          })
        ];
    
        return (
          <div>

            <div className="mapContainer">
            <DeckGL
            controller={true}
            initialViewState={this.INITIAL_VIEW_STATE}
          //  getTooltip={(layers) => ({
         //     text: "Under Construction"
          //  })}
            layers={layers} 
            
            >
              
    


            <StaticMap 
            
            mapStyle="mapbox://styles/mapbox/satellite-streets-v9"
            mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
            </DeckGL>
            </div>
          </div>
          
          
        );
      }
    }
    
    export default MapboxContainer2;
