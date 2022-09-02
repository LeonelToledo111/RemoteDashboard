import React from 'react'
import axios from 'axios';
import { MapContainer, TileLayer, ScaleControl, LayersControl, LayerGroup } from 'react-leaflet';

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
      item.filename=file.fileNameTiff;
      item.projection="EPSG:3857";
      item.band=String(file.band);
      item.palette="colorbrewer.diverging.RdYlGn_11";
      item.min=String(file['minRAW']);
      item.max=String(file['maxRAW']);
      layers.push(item)
    });

    this.setState({
      ...this.prevState,
      layers: []
    })

    this.setState({
      ...this.prevState,
      layers: layers
    })

    // this.setState(() => {
    //   //const nlayers=[...this.state.layers];
    //   const nlayers=[]
    //   response.data.files.forEach( file=>{
    //     console.log("*****",file.fileNameTiff)
    //     let item={};
    //     item.url="http://localhost:"+file.port+"/tiles/{z}/{x}/{y}.png";
    //     item.filename=file.fileNameTiff;
    //     item.projection="EPSG:3857";
    //     item.band=String(file.band);
    //     item.palette="colorbrewer.diverging.RdYlGn_11";
    //     item.min=String(file['minRAW']);
    //     item.max=String(file['maxRAW']);
    //     nlayers.push(item)
    //   });
    //   return { layers:nlayers };
    // });



    
    // console.log("***************layers1:",layers);
    console.log("***************layers:",this.state.layers.length);


    // let link="http://localhost:"+response.data.files[0].port+"/tiles/{z}/{x}/{y}.png?";
    // link+="filename="+response.data.files[0].fileNameTiff;
    // link+="&projection=EPSG:3857";
    // link+=`&band=${response.data.files[0].band}`
    // link+="&palette=colorbrewer.diverging.RdYlGn_11";
    // if(response.data.files[0]['ext']=='tif'){
    //   link+="&min="+response.data.files[0]['minRAW'];
    //   link+="&max="+response.data.files[0]['maxRAW'];
    // }

    // console.log("link:",link);

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
    // const listaLayers=JSON.parse("{'layers':[ <TileLayer url='http://localhost:34015/tiles/{z}/{x}/{y}.png?filename=/home/alex/temp/GeoTIFF9184cc09-78df-4f14-adc7-39ff5fc26d8f.tif&projection=EPSG:3857&band=1&palette=colorbrewer.diverging.RdYlGn_11' format='image/png' transparency={true} opacity={0.8} />, <TileLayer url='http://localhost:34015/tiles/{z}/{x}/{y}.png?filename=/home/alex/temp/GeoTIFFe59d7ebd-e15a-4c37-b49c-c8cb249bf83b.tif&projection=EPSG:3857&band=1&palette=colorbrewer.diverging.RdYlGn_11' format='image/png' transparency={true} opacity={0.8} /> ]}")
    // var data = '{"layers":"';
    // data.concat('Hola');
    // // data.concat('[');
    // // data.concat('<TileLayer url="http://localhost:34015/tiles/{z}/{x}/{y}.png?filename=/home/alex/temp/GeoTIFF9184cc09-78df-4f14-adc7-39ff5fc26d8f.tif&projection=EPSG:3857&band=1&palette=colorbrewer.diverging.RdYlGn_11" format="image/png" transparency={true} opacity={0.8} />');
    // // data.concat(',');
    // // data.concat('<TileLayer url="http://localhost:34015/tiles/{z}/{x}/{y}.png?filename=/home/alex/temp/GeoTIFFe59d7ebd-e15a-4c37-b49c-c8cb249bf83b.tif&projection=EPSG:3857&band=1&palette=colorbrewer.diverging.RdYlGn_11" format="image/png" transparency={true} opacity={0.8} />');
    // // data.concat(']');

    // data.concat('"}');

    // mylayer.push(JSON.parse("<TileLayer url='http://localhost:34015/tiles/{z}/{x}/{y}.png?filename=/home/alex/temp/GeoTIFF9184cc09-78df-4f14-adc7-39ff5fc26d8f.tif&projection=EPSG:3857&band=1&palette=colorbrewer.diverging.RdYlGn_11' format='image/png' transparency={true} opacity={0.8} />"));
    // mylayer.push(JSON.parse("<div></div>"));

    // JSON.parse(data);
    // let data = '{"layers":[';
    // data = data.concat("<TileLayer url='http://localhost:34015/tiles/{z}/{x}/{y}.png?filename=/home/alex/temp/GeoTIFF9184cc09-78df-4f14-adc7-39ff5fc26d8f.tif&projection=EPSG:3857&band=1&palette=colorbrewer.diverging.RdYlGn_11' format='image/png' transparency={true} opacity={0.8} />");
    // data = data.concat(',');
    // data = data.concat("<TileLayer url='http://localhost:34015/tiles/{z}/{x}/{y}.png?filename=/home/alex/temp/GeoTIFFe59d7ebd-e15a-4c37-b49c-c8cb249bf83b.tif&projection=EPSG:3857&band=1&palette=colorbrewer.diverging.RdYlGn_11' format='image/png' transparency={true} opacity={0.8} />");
    // data = data.concat(']}');
    // console.log("data:",data);
    //const listaLayers=[ <TileLayer url='http://localhost:34015/tiles/{z}/{x}/{y}.png?filename=/home/alex/temp/GeoTIFF9184cc09-78df-4f14-adc7-39ff5fc26d8f.tif&projection=EPSG:3857&band=1&palette=colorbrewer.diverging.RdYlGn_11' format='image/png' transparency={true} opacity={0.8} />, <TileLayer url='http://localhost:34015/tiles/{z}/{x}/{y}.png?filename=/home/alex/temp/GeoTIFFe59d7ebd-e15a-4c37-b49c-c8cb249bf83b.tif&projection=EPSG:3857&band=1&palette=colorbrewer.diverging.RdYlGn_11' format='image/png' transparency={true} opacity={0.8} /> ]
    // const listaLayers2=JSON.parse("{'layers':[ <TileLayer url='http://localhost:34015/tiles/{z}/{x}/{y}.png?filename=/home/alex/temp/GeoTIFF9184cc09-78df-4f14-adc7-39ff5fc26d8f.tif&projection=EPSG:3857&band=1&palette=colorbrewer.diverging.RdYlGn_11' format='image/png' transparency={true} opacity={0.8} />, <TileLayer url='http://localhost:34015/tiles/{z}/{x}/{y}.png?filename=/home/alex/temp/GeoTIFFe59d7ebd-e15a-4c37-b49c-c8cb249bf83b.tif&projection=EPSG:3857&band=1&palette=colorbrewer.diverging.RdYlGn_11' format='image/png' transparency={true} opacity={0.8} /> ]}")
    // const listaLayers=JSON.parse(data);
    // console.log("listaLayers:",listaLayers);
    // console.log("listaLayers2:",listaLayers2.layers);
    // console.log("listaLayers3:",listaLayers2.layers[0]);


    
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
                  {/* <TileLayer
                    url=''
                    format="image/png"
                    transparency={true}
                    opacity={0.8}
                    ref={this.refTileLayerTiff}
                  /> */}
                  {/* {listaLayers.layers[0]} */}

                  {/* <TileLayer url="http://localhost:34287/tiles/{z}/{x}/{y}.png?filename=/home/alex/temp2&projection=EPSG:3857&band=1&palette=colorbrewer.diverging.RdYlGn_11" format="image/png" transparency={true} opacity={0.8} /> */}

                  
                  {
                    this.state.layers.map((item) => (
                      <TileLayer url={item.url+"?filename="+item.filename+"&projection="+item.projection+"&band="+item.band+"&min="+item.min+"&max="+item.max+"&palette="+item.palette} format="image/png" transparency={true} opacity={1.0} />
                      // <TileLayer onChange={this.serverTiffasy} url={item.url+"?filename="+item.filename+"&projection="+item.projection+"&band="+item.band+"&min="+item.min+"&max="+item.max+"&palette="+item.palette} format="image/png" transparency={true} opacity={1.0} />
                      // <div>
                      //   <TileLayer url={item.url+"?filename="+item.filename+"&projection="+item.projection+"&band="+item.band+"&min="+item.min+"&max="+item.max+"&palette="+item.palette} format="image/png" transparency={true} opacity={1.0} />
                      // <b>**************************************{item.url+"?filename="+item.filename+"&projection="+item.projection+"&band="+item.band+"&min="+item.min+"&max="+item.max+"&palette="+item.palette}</b>
                      // </div>
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
