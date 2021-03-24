import React from 'react'
import mapboxgl from 'mapbox-gl'
import { lineString as makeLineString} from '@turf/helpers';
import { greatCircle, point } from "@turf/turf";
import { turf } from "@turf/turf";
import DeckGL from '@deck.gl/react';
import {GridLayer} from '@deck.gl/aggregation-layers';
import {LineLayer} from '@deck.gl/layers';


mapboxgl.accessToken = 'pk.eyJ1IjoibGlnaHRidXJuIiwiYSI6ImNpeXViOGptcDAwMmYzMmxmZml6am0xZG0ifQ.FiaHv8Pwcxr_LyuxMtry3w';

class MapboxContainer2 extends React.Component {

   map;

  deckFunction({data, viewState}){

  }

 
    state = {
        activate: null,
      };
    
      clickActivate = () => {
        const activate = '/item41/a';
    
        this.setState({ activate });
      };
    
    
      constructor(props) {
        super(props);
        this.state = {
          lng: 5,
          lat: 34,
          zoom: 1.5
        };
      }
      
      
    
      componentDidMount() {
        const { lng, lat, zoom } = this.state;
    
         this.map = new mapboxgl.Map({
          container: this.mapContainer,
          style: 'mapbox://styles/mapbox/satellite-streets-v9',
          center: [lng, lat],
          zoom
        });
        
        var bbox = [-95, 30 ,-85, 40];
        var cellSide = 50;
        var options = {units: 'miles'};
        
       // var squareGrid = turf.squareGrid(bbox, cellSide, options);

  //      var bbox = [121.51083, 25.05127, 121.5441, 25.06838];
    //    var data = turf.bboxPolygon(bbox);
      //  var squareGrid = turf.squareGrid(bbox, 0.25, 'kilometers');
        

      //map.data.addGeoJson(squareGrid);

        this.map.on('move', () => {
          const { lng, lat } = this.map.getCenter();
    
          this.setState({
            lng: lng.toFixed(4),
            lat: lat.toFixed(4),
            zoom: this.map.getZoom().toFixed(2)
          });
        });
      }
    
      render() {

      
      //  console.log(point([100, 0]));

        
        const { lng, lat, zoom } = this.state;
    
        return (
          <div>
            <div className="mapTextContainer">
              <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
            </div>
            <div ref={el => this.mapContainer = el} className="mapContainer" />
          </div>
          
          
        );
      }
    }
    
    export default MapboxContainer2;
