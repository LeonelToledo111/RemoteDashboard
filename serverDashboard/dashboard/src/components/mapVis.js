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
  }

  
  serverTiffasy = async (confFile) => {
    if( confFile == undefined ){
      confFile=this.backConfFile;
      confFile.time=this.refSliderL.state.value;
    }
    else{
      this.refSliderL.state.value=confFile.time;
    }
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
          "proxy" : "false",
      }
    };

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

    // Object.entries(response.data).forEach(([key,value]) => {
    //   console.log(key+' '+value);
    // });

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

    this.backConfFile=confFile;
    
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
                </LayerGroup>
              </LayersControl.Overlay>
              
            </LayersControl>

          </MapContainer>
        {/* </div>

        <div> */}
          <div>
            
            <button onClick={()=>this.serverTiffasy({
              // file:"/media/alex/Datos/netcdf/Zimbabwe/ssr/ssr-N(-16.0):W(30.0):S(-19.0):E(33.0)-31x31-1980.1.1_0:0:0-1989.12.31_23:0:0.nc",
              // file:"/media/alex/Datos/netcdf/Mali/wind/wind10m-N(14.0):W(-6.0):S(11.0):E(-3.0)-31x31-1980.1.1_0:0:0-1989.12.31_23:0:0.nc",
              // var:"v10",
              //file:"/media/alex/Datos/netcdf/Mozambique/wind/wind10m-N(-11.0):W(32.0):S(-26.0):E(41.0)-91x151-1950.1.1_1:0:0-1959.12.31_23:0:0.nc",
              file:"/media/alex/Datos/netcdf/Mozambique/ssr/ssr-N(-11.0):W(32.0):S(-26.0):E(41.0)-91x151-1950.1.1_1:0:0-1959.12.31_23:0:0.nc",
              time:37715
              }) }
              style={{background: "rgb(255, 128, 128)"}}
              >
                netCDF
            </button>

            <button onClick={()=>this.serverTiffasy({
              file:"/media/alex/Datos/CSV/structure_import.csv",
              var:"phase3.start"
              }) }
              style={{background: "rgb(128, 255, 128)"}}
              >
                CSV
            </button>

            <button onClick={()=>this.serverTiffasy({
              file:"/media/alex/Datos/SENTINEL/SENTINEL2A_20210603-082236-074_L2A_T35LRL_C_V1-0_ATB_R1.tif",
              band:1
              }) }
              style={{background: "rgb(128, 128, 255)"}}
              >
                Tif
            </button>

          </div>
          
        </div>
        
      </div>
    );
  }
}
    
export default MapboxContainerVis;
