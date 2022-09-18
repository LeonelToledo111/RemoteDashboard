import React from 'react'
import axios from 'axios';
import { MapContainer, TileLayer, ScaleControl, LayersControl, LayerGroup } from 'react-leaflet';
import * as L from "leaflet";

import ColorBar from './ColorBar';
import SliderL from './SliderL';
import MapInfo from "./MapInfo";
import ChartL from './ChartL';


const MAPBOX_ACCESS_TOKEN  = 'pk.eyJ1IjoibGlnaHRidXJuIiwiYSI6ImNpeXViOGptcDAwMmYzMmxmZml6am0xZG0ifQ.FiaHv8Pwcxr_LyuxMtry3w';

class MapboxContainerVis extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      layers:[]
    };
    
    this.refColorBar      = React.createRef();
    this.refSliderL       = React.createRef();
    this.refMapInfo       = React.createRef();
    this.refChartL        = React.createRef();
    this.backConfFile =''
    this.var=''

    this.serverTiffasy = this.serverTiffasy.bind(this)
    
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
    
    // confFile.path="/media/alex/Datos/netcdf/u_10m"

    console.log("***2serverTiffasy***:",confFile);

    const response = await axios.post('http://127.0.0.1:8000/getGeoTiffHandle', confFile ,axiosConfig)

    console.log("response:",response.data)

    const layers=[]
    response.data.files.forEach( file=>{
      console.log("*****",file.fileNameTiff)
      let item={};
      item.url="http://localhost:"+file.port+"/tiles/{z}/{x}/{y}.png";
      item.url_terracotta="http://localhost:"+file.port_terracotta+"/singleband/"+file.id+"/{z}/{x}/{y}.png";
      item.filename=file.fileNameTiff;
      item.projection="EPSG:3857";
      item.band=String(file.band);
      item.palette="colorbrewer.diverging.RdYlGn_11";
      item.min=String(file['minRAW']);
      item.max=String(file['maxRAW']);
      const corner1 = L.latLng(file['latitudeS'], file['longitudeE'])
      const corner2 = L.latLng(file['latitudeN'], file['longitudeW'])
      item.bounds = L.latLngBounds(corner1, corner2);
      // LatLngBoundsExpression
      // const bounds = new LatLngBounds([40.712216, -74.22655], [40.773941, -74.12544])
      // item.bounds = bounds
      layers.push(item)
    });

    layers.map((item) => (
      //<TileLayer url={item.url_terracotta+"?colormap=rdylgn&stretch_range=["+item.min+","+item.max+"]"} format="image/png" transparency={true} opacity={1.0} bounds={item.bounds}/>
      console.log("url:",item.url+"?filename="+item.filename+"&projection="+item.projection+"&band="+item.band+"&min="+item.min+"&max="+item.max+"&palette="+item.palette)
      // <TileLayer url={item.url+"?filename="+item.filename+"&projection="+item.projection+"&band="+item.band+"&palette="+item.palette} format="image/png" transparency={true} opacity={1.0} bounds={item.bounds}/>
    ))

    this.setState({
      ...this.prevState,
      layers: []
    })

    this.setState({
      ...this.prevState,
      layers: layers
    })

    console.log("***************layers:",this.state.layers.length);



    Object.entries(response.data.files[0]).forEach(([key,value]) => {
      console.log(key+' '+value);
    });

    // this.refTileLayerTiff.current.setUrl(link);

    

    this.refColorBar.state.title=response.data.files[0]['var'];
    this.refColorBar.state.min=response.data.files[0]['min'].toFixed(2);
    this.refColorBar.state.max=response.data.files[0]['max'].toFixed(2);
    this.refColorBar.update();

    if(response.data.files[0]['ext']=='nc'){
      this.refSliderL.state.show=true;
      this.refSliderL.state.min=0
      var date = new Date(response.data.files[0]['dateIni']);
      date.setTime(date.getTime() + parseInt(this.refSliderL.state.value) * parseInt(response.data.files[0]['datePeriod']) );//horas

      this.refSliderL.state.title=date.toString();
      this.refSliderL.state.max=response.data.files[0]['timeN']-1
    }
    else{
      this.refSliderL.state.show=false;
    }
    this.refSliderL.update();

    confFile.file=response.data.files[0].fileName;
    this.backConfFile=confFile;
    return {vars:response.data.files[0].vars, var:response.data.files[0].var}
    
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
              position="topright"
              event = { this.serverTiffasy }
            />

            {/* <ChartL
              childRef={ref => (this.refChartL= ref)}
              show={true}
              position="topright"
              // event = { console.log("Hola") }
            /> */}

            <MapInfo childRef={ref => (this.refMapInfo= ref)}/>

            <ScaleControl position="topright" />

            <LayersControl position="topright">
              <LayersControl.Overlay checked name="GeoTiff">
                <LayerGroup>
                  {/* <TileLayer url="http://localhost:34287/tiles/{z}/{x}/{y}.png?filename=/home/alex/temp2&projection=EPSG:3857&band=1&palette=colorbrewer.diverging.RdYlGn_11" format="image/png" transparency={true} opacity={0.8} /> */}
                  {/* <TileLayer url="http://localhost:38267/api/tiles/{z}/{x}/{y}.png?filename=/home/temp/GeoTIFF_5c08303a6d294bcaa8f5af94104f483c.tif&projection=EPSG:3857&band=1&min=-16212.198887597895&max=15284.235972435366&palette=colorbrewer.diverging.RdYlGn_11" format="image/png" transparency={true} opacity={0.8} /> */}
                  
                  {/* <TileLayer url="http://localhost:5001/singleband/2B/{z}/{x}/{y}.png?colormap=greys&stretch_range=[16,29]" format="image/png" transparency={true} opacity={0.8} /> */}
                  {/* http://localhost:5001/singleband/2A/{z}/{x}/{y}.png?colormap=rdylgn&stretch_range=[43,58] */}
                  
                  {
                    this.state.layers.map((item) => (
                      //<TileLayer url={item.url_terracotta+"?colormap=rdylgn&stretch_range=["+item.min+","+item.max+"]"} format="image/png" transparency={true} opacity={1.0} bounds={item.bounds}/>
                      // <TileLayer url={item.url+"?filename="+item.filename+"&projection="+item.projection+"&band="+item.band+"&palette="+item.palette} format="image/png" transparency={true} opacity={1.0} bounds={item.bounds}/>

                      <TileLayer url={item.url+"?filename="+item.filename+"&projection="+item.projection+"&band="+item.band+"&min="+item.min+"&max="+item.max+"&palette="+item.palette} format="image/png" transparency={true} opacity={1.0} bounds={item.bounds}/>
                      // <TileLayer url={item.url+"?filename="+item.filename+"&projection="+item.projection+"&band="+item.band+"&min="+item.min+"&max="+item.max+"&palette="+item.palette} format="image/png" transparency={true} opacity={1.0}/>
                    ))

                    
                  }

                  

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
