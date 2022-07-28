import React from 'react'
import axios from 'axios';
import { MapContainer, TileLayer, ScaleControl, LayersControl, LayerGroup } from 'react-leaflet';

import ColorBar from './ColorBar';
import SliderL from './SliderL';
import MapInfo from "./MapInfo";


const MAPBOX_ACCESS_TOKEN  = 'pk.eyJ1IjoibGlnaHRidXJuIiwiYSI6ImNpeXViOGptcDAwMmYzMmxmZml6am0xZG0ifQ.FiaHv8Pwcxr_LyuxMtry3w';

class MapboxContainerVis extends React.Component {

  constructor(props){
    super(props);
    this.state = {
    };
    
    this.refTileLayerTiff = React.createRef();
    this.refColorBar      = React.createRef();
    this.refSliderL       = React.createRef();
    this.refMapInfo       = React.createRef();
    this.backConfFile =''
    this.var=''
  }

  
  serverTiffasy = async (confFile) => {
    console.log("***1serverTiffasy***:",confFile);
    if( confFile == undefined ){
      confFile=this.backConfFile;
      confFile.time=this.refSliderL.state.value;
      confFile.var=this.var;
    }
    else{
      if( confFile.time == undefined ){
        this.refSliderL.state.value=0;
      }
      else{
        this.refSliderL.state.value=confFile.time;
      }
    }
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
          "proxy" : "false",
      }
    };
    console.log("***2serverTiffasy***:",confFile);

    const response = await axios.post('http://127.0.0.1:8000/getGeoTiffHandle', confFile ,axiosConfig)


    let link="http://localhost:"+response.data.port+"/tiles/{z}/{x}/{y}.png?";
    link+="filename="+response.data.fileNameTiff;
    link+="&projection=EPSG:3857";
    link+=`&band=${response.data.band}`
    link+="&palette=colorbrewer.diverging.RdYlGn_11";
    if(response.data['ext']=='tif'){
      link+="&min="+response.data['minRAW'];
      link+="&max="+response.data['maxRAW'];
    }

    Object.entries(response.data).forEach(([key,value]) => {
      console.log(key+' '+value);
    });

    this.refTileLayerTiff.current.setUrl(link);

    this.refColorBar.state.title=response.data['var'];
    this.refColorBar.state.min=response.data['min'].toFixed(2);
    this.refColorBar.state.max=response.data['max'].toFixed(2);
    this.refColorBar.update();

    if(response.data['ext']=='nc'){
      this.refSliderL.state.show=true;
      this.refSliderL.state.min=0
      var date = new Date(response.data['dateIni']);
      date.setTime(date.getTime() + parseInt(this.refSliderL.state.value) * parseInt(response.data['datePeriod']) );//horas

      this.refSliderL.state.title=date.toString();
      this.refSliderL.state.max=response.data['timeN']-1
    }
    else{
      this.refSliderL.state.show=false;
    }
    this.refSliderL.update();

    confFile.file=response.data.fileName;
    this.backConfFile=confFile;
    return response.data.vars
    
  }

  INITIAL_VIEW_STATE = {
    longitude: 12.354722,
    latitude: 7.369722,
    zoom: 4,
    pitch: 0,
    bearing: 0
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    const { childRef } = this.props;
    childRef(this);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
    const { childRef } = this.props;
    childRef(undefined);
  }
  
  render() {
    const url=`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`;
    const center=[this.INITIAL_VIEW_STATE.latitude,this.INITIAL_VIEW_STATE.longitude];
    return (
      <div >
        <div className="mapContainer">
          <MapContainer center={center} zoom={this.INITIAL_VIEW_STATE.zoom} scrollWheelZoom={true}>
            {/* <ZoomControl position="topright" /> */}

            <TileLayer
              url={url}
              format="image/png"
            />
            
            <ColorBar
              childRef={ref => (this.refColorBar= ref)}
              position="bottomright"
            />

            <SliderL
              childRef={ref => (this.refSliderL= ref)}
              show={false}
              position="bottomright"
              event = { this.serverTiffasy }
            />

            <MapInfo childRef={ref => (this.refMapInfo= ref)}/>

            <ScaleControl position="bottomleft" />

            <LayersControl position="topright">
              <LayersControl.Overlay checked name="GeoTiff">
                <LayerGroup>
                  <TileLayer
                    url=''
                    format="image/png"
                    transparency={true}
                    opacity={0.8}
                    ref={this.refTileLayerTiff}
                  />
                </LayerGroup>
              </LayersControl.Overlay>
              
            </LayersControl>

          </MapContainer>

        </div>
        
      </div>
    );
  }
}
    
export default MapboxContainerVis;
