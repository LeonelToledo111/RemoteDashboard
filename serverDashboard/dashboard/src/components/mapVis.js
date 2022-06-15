import React from 'react'
import axios from 'axios';
import { MapContainer, TileLayer, ScaleControl, LayersControl, Popup, Marker, icon, Circle, LayerGroup, ZoomControl} from 'react-leaflet';
// import Control from 'react-leaflet-control';

import CSVReader from 'react-csv-reader'
import ColorBar from './ColorBar';
// import CustomMarker from './CustomMarker';
import MapInfo from "./MapInfo";
import { LineUtil } from 'leaflet';





const MAPBOX_ACCESS_TOKEN  = 'pk.eyJ1IjoibGlnaHRidXJuIiwiYSI6ImNpeXViOGptcDAwMmYzMmxmZml6am0xZG0ifQ.FiaHv8Pwcxr_LyuxMtry3w';


class MapboxContainerVis extends React.Component {

  constructor(props){
    super(props);
    this.state = {
    };
    
    this.refTileLayerTiff = React.createRef();
    this.refSliderTime = React.createRef();
    this.refTextVar=React.createRef();
    this.refColorBar=React.createRef();
    this.refMapInfo=React.createRef();
    this.fileNameNetCDF =''
  }
  
  

  serverTiffasy = async (selectFile) => {
    console.log("Click en serverTiff:",selectFile);
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
          "proxy" : "false",
      }
    };

    if(selectFile)
      this.refSliderTime.current.value=0
    
    let timei=this.refSliderTime.current.value
    // https://codesandbox.io/s/0l64q?file=/src/components/GeoTiffLayer.js
    const response = await axios.post('http://127.0.0.1:8000/getGeoTiffHandle', {
        file:this.fileNameNetCDF,
        selectFile: selectFile,
        timei:timei
      },axiosConfig)

    let link="http://localhost:"+response.data.port+"/tiles/{z}/{x}/{y}.png?";
    link+="filename="+response.data.fileNameTiff;
    link+="&projection=EPSG:3857";
    link+="&band=1&palette=colorbrewer.diverging.RdYlGn_11";
    if(response.data['ext']=='tif'){
      link+="&min="+response.data['minRAW'];
      link+="&max="+response.data['maxRAW'];
    }
    
    // link+="&band=1&palette=colorbrewer.cyclic.hsv"
    Object.entries(response.data).forEach(([key,value]) => {
      console.log(key+' '+value);
    });

    this.fileNameNetCDF=response.data.fileNameNetCDF;
    this.refTileLayerTiff.current.setUrl(link);
    this.refSliderTime.current.max=response.data['timeN']-1
    this.refTextVar.current.innerText=("    "+response.data['nameVar']+"    "+response.data['datei']).replace(/ /g, "\u00a0")
    console.log("***********")
    console.log("******ColorBar ",this.refColorBar)
    this.refColorBar.state.title=response.data['nameVar'];
    this.refColorBar.state.min=response.data['min'].toFixed(2);
    this.refColorBar.state.max=response.data['max'].toFixed(2);
    this.refColorBar.props.map.update();
    console.log("link:",link);
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
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
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

            
            <ColorBar  childRef={ref => (this.refColorBar= ref)} />
            {/* <CustomMarker /> */}
            

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
                  <Circle
                    center={center}
                    pathOptions={{ color: 'green', fillColor: 'green' }}
                    radius={100}
                  />
                  
                </LayerGroup>
              </LayersControl.Overlay>
              
            </LayersControl>

          </MapContainer>
        </div>

        <div>
          <div>
            <button onClick={()=>this.serverTiffasy(true)}
                    style={{background: "rgb(230, 230, 230)"}}
            >
              netCDF
            </button>
            <span ref={this.refTextVar} style={{ width:"40%" }}></span>
          </div>
          <div>
            <input ref={this.refSliderTime}
                  onClick={()=>this.serverTiffasy(false)}
                  type="range" min="0" max="0"
                  defaultValue="0" step="1"
                  style={{ width:"100%" }}
            />
          </div>
          
        </div>
        <CSVReader onFileLoaded={(data, fileInfo, originalFile) => console.dir(data, fileInfo, originalFile)} />
        
      </div>
    );
  }
}
    
export default MapboxContainerVis;
