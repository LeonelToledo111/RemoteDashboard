//************************************************** */
// import React, { useEffect, useRef } from 'react'
import React from 'react'
import axios from 'axios';
import { MapContainer, TileLayer, ScaleControl, LayersControl, LayerGroup, Map, FeatureGroup, Circle, GeoJSON } from 'react-leaflet';

import * as L from "leaflet";

import ColorBar from './ColorBar';
import SliderL from './SliderL';
import MapInfo from "./MapInfo";
import ChartL from './ChartL';
// import {Map, TileLayer, FeatureGroup, Circle} from "react-leaflet"
import {EditControl} from "react-leaflet-draw"

//import pruebaJSON from "/home/alex/Pruebas/ShapeFileLeaflet/Mexico/estados"


//let pruebaJSON =""
const MAPBOX_ACCESS_TOKEN  = 'pk.eyJ1IjoibGlnaHRidXJuIiwiYSI6ImNpeXViOGptcDAwMmYzMmxmZml6am0xZG0ifQ.FiaHv8Pwcxr_LyuxMtry3w';

// https://stackoverflow.com/questions/68758035/how-to-render-geojson-polygon-in-react-leaflet-mapcontainer
// const MyData = () => {
//   // create state variable to hold data when it is fetched
//   const [data, setData] = React.useState();

//   // useEffect to fetch data on mount
//   useEffect(() => {
//     // async function!
//     const getData = async () => {
//       // 'await' the data
//       const response = await axios.get("/home/alex/Pruebas/ShapeFileLeaflet/Mexico/estados.js");
//       // save data to state
//       setData(response.data);
//     };
//     getData();
//   }, []);

//   // render react-leaflet GeoJSON when the data is ready
//   if (data) {
//     return <GeoJSON data={data} />;
//   } else {
//     return null;
//   }
// };

class MapboxContainerVis extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      layers:[],
      rawGeoJSON:{},

      dataChart:{
        data:{
          labels: [],
          datasets: []
        },
        show:false
      },
      listGeoJSON:[],
      selected:[],
      //selectedGeoJSON:[],
      //code2index:{},
      onAddChart: false,

      mapLayers: [],
    };
    
    this.refColorBar      = React.createRef();
    this.refSliderL       = React.createRef();
    this.refMapInfo       = React.createRef();
    this.refChartL        = React.createRef();
    //this.refGeoJson       = React.createRef();
    this.backConfFile =''
    this.var=''
    //this.mapColor={}
    this.properties={}
    this.backDataChart={data:{},show:[]}
    this.boundingBox=[]
    this.colorMap=[]
    
    

    this.serverTiffasy = this.serverTiffasy.bind(this)
    this.setDataChart = this.setDataChart.bind(this)
    this.setShowDataChart =this.setShowDataChart.bind(this)
    this._onCreated =this._onCreated.bind(this)
    
  }

  // getColor = ( code ) => {
	// 	// if( this.mapColor[id] === undefined ){
	// 	// 	this.mapColor[id] = "#"+Math.floor(Math.random()*16777215).toString(16);
	// 	// }
	// 	// return this.mapColor[id];
  //   // if( this.properties[id] === undefined ){
  //   //   return "#"+Math.floor(Math.random()*16777215).toString(16);
  //   // }
  //   return this.properties[code].backgroundColor
  //   //return "#"+Math.floor(Math.random()*16777215).toString(16);
	// }
  
  //https://stackoverflow.com/questions/18947892/creating-range-in-javascript-strange-syntax
  makeColorMap = ( N ) => {
    const radio=0.9;
    let r=radio*Math.sqrt(2.0)/2.0;
    let g=radio*Math.sqrt(2.0)/2.0;
    let b=0.0;
    let e=Math.sqrt(3.0);
    let er=1.0/e;
    let eg=1.0/e;
    let eb=1.0/e;
    let exv_r=eg*b-eb*g;
    let exv_g=eb*r-er*b;
    let exv_b=er*g-eg*r;
    let ev=er*r+eg*g+eb*b;
    const theta0=Math.PI/4;
    this.colorMap=Array.apply(null, { length: N }).map((value,index)=>{
      const theta=theta0+index*2.0*Math.PI/N;
      const cos=Math.cos(theta)
      const sin=Math.sin(theta)
      const R=cos*r+sin*exv_r+(1-cos)*ev*er;
      const G=cos*g+sin*exv_g+(1-cos)*ev*eg;
      const B=cos*b+sin*exv_b+(1-cos)*ev*eb;
      return "rgb("+Math.floor(255*R)+", "+Math.floor(255*G)+", "+Math.floor(255*B)+")";
      //return "rgba("+Math.floor(255*R)+", "+Math.floor(255*G)+", "+Math.floor(255*B)+", 0.5)";
    })
    //return colorMap
  }

  // getDataChart = () => {
  //   return {
  //     labels: [1,2,3],
  //     datasets: [{
  //       label: 'Area',
  //       data: [11,12,13],
  //       backgroundColor: [
  //         'rgba(255, 205, 86, 0.6)',
  //       ],
  //       borderColor: [
  //         'rgb(255, 205, 86)',
  //       ],
  //       borderWidth: 1,
  //       // hidden: true,
  //     }]
  //   }
  // }

  getbbox = (geometry) => {
    let xmin=geometry.coordinates[0][0][0]
    let ymin=geometry.coordinates[0][0][1]
    let xmax=xmin
    let ymax=ymin
    geometry.coordinates.forEach( (polygon) => {
      polygon.forEach( (point)=>{
        if( xmin > point[0] ){
          xmin = point[0];
        }
        else if( xmax < point[0] ){
          xmax = point[0]
        }
        if( ymin > point[1] ){
          ymin = point[1];
        }
        else if( ymax < point[1] ){
          ymax = point[1]
        }
      })
    })
    return {
      xmin: xmin,
      ymin: ymin,
      xmax: xmax,
      ymax: ymax,
    }
  }

  //caracteristicas
  setDataChart = ( features ) => {

    //console.log("****feature desde setDataChart",features)
    if(features==undefined)return;

        //{ "type": "Feature", "properties": {"OBJECTID": 704331, "PARCELID": "31.0000004069425.001", "STARTDATE": "2019/01/01 00:00:00.000", "ENDDATE": "2020/01/01 00:00:00.000", "YIELD": 1.41, "CROPCODE": 5, "SOWDATE": null, "HARVESTDATE": null, "CROPNAME": "Avoine d'hiver", "HOLDINGID": 211471554, "SHAPE_Leng": 48.970081, "SHAPE_Area": 129.5}, "geometry": { "type": "Polygon", "coordinates": [ [ [ -102.287865179837326, 22.416490050491376 ], [ -102.03636367982125, 22.161466140462625 ],  [ -102.057012479676956, 21.806073550617089 ], [ -102.719348020164432, 21.729538340032899 ],[ -102.718493580019796, 22.090839049978253 ], [ -102.46919368955777, 22.333225570181309 ], [ -102.287865179837326, 22.416490050491376 ] ] ] } }
    //const labels = features.map((item)=>{return item.properties.CROPCODE})
    
    // properties{ code: {backgroundColor:, borderColor:, borderWidth:, label:, data:[areas]} }
    // properties es una lista 

    

    let dataChart = {
      // xcode: [],
      data: {
        
        labels: [],
        datasets: [
          {
            label: 'Area',
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1,
            yAxisID: 'yArea',
          },
          {
            label: 'Yield',
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1,
            yAxisID: 'yYield',
          }
        ]
      },
      show:true
    }
    let listGeoJSON2=[]
    
    // let code2index_2={}

    features.forEach((item,index)=>{
      // console.log("Features:",item)
      const CROPNAME=item.properties.CROPNAME;
      const CODE=item.properties.CODE;

      if( dataChart.data.labels.includes(CROPNAME) ){
        const indexCrop=dataChart.data.labels.indexOf(CROPNAME);
        dataChart.data.datasets[0].data[indexCrop]+=item.properties.SHAPE_Area/100.0;
        dataChart.data.datasets[1].data[indexCrop]+=item.properties.YIELD;
        // item.selected=(item.properties.SHAPE_Area<1000)?true:false;
        item.selected=false;
        item.style={
          type: "Style",
          fillColor: '', 
          weight: 1, 
          opacity: 1, 
          color: 'black', 
          dashArray: '3', 
          fillOpacity: 0.7 
        }
        listGeoJSON2[indexCrop].push(item)
        this.boundingBox[indexCrop].push( this.getbbox(item.geometry) )
        // listGeoJSON2[indexCrop].index.push(index)
      }
      else{
        // dataChart.xcode.push(code);
        dataChart.data.labels.push(CROPNAME);
        dataChart.data.datasets[0].data.push(item.properties.SHAPE_Area/100.0);
        dataChart.data.datasets[0].backgroundColor.push("");
        dataChart.data.datasets[0].borderColor.push("");
        dataChart.data.datasets[1].data.push(item.properties.YIELD);
        dataChart.data.datasets[1].backgroundColor.push("");
        dataChart.data.datasets[1].borderColor.push("");
        //item.selected=(item.properties.SHAPE_Area<1000)?true:false;
        item.selected=false;
        item.style={
          type: "Style",
          fillColor: '', 
          weight: 1, 
          opacity: 1, 
          color: 'black', 
          dashArray: '3', 
          fillOpacity: 0.7 
        }

        listGeoJSON2.push([item]);
        this.backDataChart.show.push(true);
        this.boundingBox.push([ this.getbbox(item.geometry) ])
      }
    })

    //console.log("boundingBox:",this.boundingBox)

    this.backDataChart.data = dataChart.data;

    this.makeColorMap(dataChart.data.labels.length)
    // console.log("ColorMap:",this.getColorMap(10))
    this.colorMap.forEach((color,index) =>{
      dataChart.data.datasets[0].backgroundColor[index] = color
      dataChart.data.datasets[0].borderColor[index] = color
      dataChart.data.datasets[1].backgroundColor[index] = color
      dataChart.data.datasets[1].borderColor[index] = color
      // listGeoJSON2[index].style.fillColor = color
      listGeoJSON2[index].forEach((data)=>{
        data.style.fillColor = color
      })
      
      // listGeoJSON2[index].data.forEach((data,indexData)=>{
      //   listGeoJSON2[index].style.fillColor.push(color)
      // })
      
    })

    const selectedPolygon={
      BB:{
        xmin:5.0,
        xmax:5.4,
        ymin:46.1,
        ymax:46.3
      },
      points:[
        {lng:5.0, lat:46.1},
        {lng:5.2, lat:46.15},
        {lng:5.4, lat:46.1},
        {lng:5.3, lat:46.2},
        {lng:5.4, lat:46.3},
        {lng:5.2, lat:46.25},
        //{x:5.3, y:46.2},
        {lng:5.0, lat:46.3}

        // {x:5.0, y:46.1},
        // {x:5.2, y:46.3},
        // {x:5.4, y:46.1},
        // {x:5.4, y:46.3},
        // {x:5.2, y:46.1},
        // {x:5.0, y:46.3}
      ]
    }

    // https://programmerclick.com/article/2166959151/
    /*
    listGeoJSON2.forEach( ( crop, indexCrop ) => {
      //listGeoJSON2[indexCrop].data.push(item)
      
      crop.forEach( ( data, indexData ) => {
        const bb=this.boundingBox[indexCrop][indexData]
        if( selectedPolygon.BB.xmin < bb.xmin &&
            bb.xmax < selectedPolygon.BB.xmax &&
            selectedPolygon.BB.ymin < bb.ymin &&
            bb.ymax < selectedPolygon.BB.ymax
          ){
            //console.log("*****poligono{ cultivo:",indexCrop,", data",indexData,"}");
            let noneZeroMode=true;
            // console.log("*****data:",data.geometry.coordinates);
            data.selected=true;
            data.geometry.coordinates.forEach( (polygon) => {
              polygon.every( (point)=>{
                let oddNodes = false;
                let zeroState=0;
                let point1=selectedPolygon.points[selectedPolygon.points.length-1];
                // console.log("********previo{zeroState",zeroState,", oddNodes:",oddNodes,"}");
                selectedPolygon.points.forEach((point2)=>{
                  if (((point2.lat > point[1]) != (point1.lat > point[1])) && (point[0] < (point1.lng - point2.lng) * (point[1] - point2.lat) / (point1.lat - point2.lat) + point2.lng)) {
                    oddNodes = !oddNodes;
                    if (point2.lat > point1.lat ) {
                      zeroState++;
                    }
                    else {
                      zeroState--;
                    }
                  }
                  //console.log("********(",indexPoint,")",point, point1, point2,"{zeroState",zeroState,", oddNodes:",oddNodes,"}");
                  point1=point2;
                })
                //console.log("********{zeroState",zeroState,", oddNodes:",oddNodes,"}");
                //data.selected=noneZeroMode?zeroState!=0:oddNodes;
                if(zeroState==0){
                  data.selected=false;
                  return false;
                }
                return true;
              })
            })

          }
          else{
            data.selected=false;
          }
          

      })
      
    })*/

    // if( listGeoJSON2[index]. )

    

    // console.log("********data:",dataChart)
    
    // console.log("********listGeoJSON2:",listGeoJSON2)


    // this.properties={}
    // features.forEach((item)=>{
    //   const code=item.properties.CROPCODE

    //   if( this.properties[code] === undefined ){
        
    //     this.properties[code] = {
    //       backgroundColor: [0],
    //       borderColor: [0],
    //       borderWidth: 1,
    //       label: item.properties.CROPNAME,
    //       data: [item.properties.SHAPE_Area/100.0, item.properties.YIELD],
          
    //     }
    //   }
    //   else{
    //     this.properties[code].data[0]+=item.properties.SHAPE_Area/100.0;
    //     this.properties[code].data[1]+=item.properties.YIELD;
    //   }
    // })

    // const N=Object.keys(this.properties).length
    // let index=0
    // const radio=0.9;
    // let r=radio*Math.sqrt(2.0)/2.0;
    // let g=radio*Math.sqrt(2.0)/2.0;
    // let b=0.0;
    // // r=1.0;g=1.0;b=1.0;
    // let e=Math.sqrt(3.0);
    // let er=1.0/e;
    // let eg=1.0/e;
    // let eb=1.0/e;
    // let exv_r=eg*b-eb*g;
    // let exv_g=eb*r-er*b;
    // let exv_b=er*g-eg*r;
    // let ev=er*r+eg*g+eb*b;
    // //const theta0=Math.random()*2.0*Math.PI
    // const theta0=Math.PI/4;
    // Object.keys(this.properties).forEach((code) =>{
    //   const theta=theta0+index*2.0*Math.PI/N;
    //   const cos=Math.cos(theta)
    //   const sin=Math.sin(theta)
    //   const R=cos*r+sin*exv_r+(1-cos)*ev*er;
    //   const G=cos*g+sin*exv_g+(1-cos)*ev*eg;
    //   const B=cos*b+sin*exv_b+(1-cos)*ev*eb;
    //   // console.log(index," Color: (",R,",",G,",",B,")");
    //   // console.log(index," Color: (",Math.floor(255*R),",",Math.floor(255*G),",",Math.floor(255*B),")");

    //   const color_num=16777216*Math.floor(255*R)+65536*Math.floor(255*G)+256*Math.floor(255*B)+Math.floor(128)
    //   // console.log(color_num);
    //   //const color="#"+color_num.toString(16);
    //   const color="rgb("+Math.floor(255*R)+", "+Math.floor(255*G)+", "+Math.floor(255*B)+")";
    //   //const color="#"+Math.floor(255*R).toString(16)+Math.floor(255*G).toString(16)+Math.floor(255*B).toString(16);
    //   // console.log(color);
    //   this.properties[code].backgroundColor = [color]
    //   this.properties[code].borderColor = [color]
    //   this.properties[code].hidden = false
    //   this.properties[code].hiddenGlobal = false
    //   this.properties[code].key = code
    //   index=index+1;
    // })

    // var datasets = Object.keys(this.properties).map((code) => this.properties[code]);
    //console.log("****properties:",this.properties)
    //console.log("****datasets:",datasets)
    
    // const dataChart={
    //   data:{
    //     // labels: ["Total area (hectare)", "Total yield"],
    //     labels: [null, "Total yield"],

    //     datasets: datasets
    //   },
    //   show:true
      
    // }

    //const labels;

    

    // const dataChart=this.state.dataChart+[{
    //   labels: ["Total area"],
    //   datasets: datasets
    // }]

    //console.log("antes:",this.state.dataChart)
    // this.setState({
    //   ...this.prevState,
    //   dataChart: []
    // })
    //console.log("medio:",this.state.dataChart)


    
    // let code2index={}
    // let listGeoJSON={}
    // Object.keys(this.properties).forEach( (code,index)=>{
    //     listGeoJSON[code]=features.filter ((item)=> item.properties.CROPCODE == code )
    //     code2index[code]=index;

    //     //nombre codigo shape color
    // })


    // const dataChart={
    //   data:{
    //     labels: ["Total area (hectare)", "Total yield"],
    //     datasets: datasets
    //   },
    //   show:true
      
    // }

    // const dataChart={
    //   data:data,
    //   show:true
      
    // }

    this.setState({
      //PruebaCambio...this.prevState,
      dataChart: dataChart,
      listGeoJSON: listGeoJSON2,
      // selectedGeoJSON: listGeoJSONSelectedPolygon,
      //listGeoJSON: listGeoJSONSelectedPolygon
      // code2index: code2index
    })
    console.log("final:",this.state.dataChart)
	}
  addDataChart = ( code ) => {
    //**const dataChart=this.state.dataChart;

    //dataChart.show=false;
    //**dataChart.data.datasets[ this.state.code2index[code] ].hidden=false;
    //**dataChart.data.datasets[ this.state.code2index[code] ].hiddenGlobal=false;
    //dataChart.data.datasets[20].hiddenGlobal=true;
    //dataChart.data.datasets[21].hiddenGlobal=true;
    
    //this.properties[key].hiddenGlobal = true
    // this.setState({
    //   ...this.prevState,
    //   dataChart: [],
    // })
    // this.setState({
      // ...this.prevState,
      // dataChart: dataChart,
    // })
    console.log("addChart on:",this.state.onAddChart)
    if(this.state.onAddChart){
      this.setState(prevState => {
        let dataChart = Object.assign({}, prevState.dataChart);  // creating copy of state variable jasper
        dataChart.data.datasets[ this.state.code2index[code] ].hidden=false;
        dataChart.data.datasets[ this.state.code2index[code] ].hiddenGlobal=false;
        return { dataChart };                                 // return new object jasper object
      })
  
      // this.refChartL.update();
      console.log("mapVis addDataChart:",this.state.dataChart)
    }
    
  }

  setShowDataChart = ( CROPNAME, show ) => {
    // console.log("removeDataChart")
    // const dataChart=this.state.dataChart;

    // // dataChart.show=false;
    // dataChart.data.datasets[ this.state.code2index[code] ].hidden=true;
    // dataChart.data.datasets[ this.state.code2index[code] ].hiddenGlobal=true;
    // //dataChart.data.datasets[20].hiddenGlobal=true;
    // //dataChart.data.datasets[21].hiddenGlobal=true;
    
    // //this.properties[key].hiddenGlobal = true
    // // this.setState({
    // //   ...this.prevState,
    // //   dataChart: [],
    // // })
    // this.setState({
    //   ...this.prevState,
    //   dataChart: dataChart,
    // })

    // this.setState(prevState => {
    //   let dataChart = Object.assign({}, prevState.dataChart);
    //   dataChart.data.datasets[ this.state.code2index[code] ].hidden=true;
    //   dataChart.data.datasets[ this.state.code2index[code] ].hiddenGlobal=true;
      
    //   return { dataChart, onAddChart:true };
    // })

    // this.setState(prevState => {
    //   let dataChart = Object.assign({}, prevState.dataChart);
    //   // dataChart.data.datasets[ this.state.code2index[code] ].hidden=true;
    //   // dataChart.data.datasets[ this.state.code2index[code] ].hiddenGlobal=true;

    //   const index=dataChart.data.labels.indexOf(CROPNAME);
    //   dataChart.data.datasets[0].data[index]=null;
    //   dataChart.data.datasets[1].data[index]=null;
    //   dataChart.data.labels[index]=null;
    //   return { dataChart, onAddChart:true };
    // })

    if( !( show && this.state.dataChart.data.labels.includes(CROPNAME) ) ){
      const index=this.backDataChart.data.labels.indexOf(CROPNAME);
      this.backDataChart.show[index]=show;
  
      let dataChart = {
        data: {
          
          labels: [],
          datasets: [
            {
              label: 'Area',
              data: [],
              backgroundColor: [],
              borderColor: [],
              borderWidth: 1,
              yAxisID: 'yArea',
            },
            {
              label: 'Yield',
              data: [],
              backgroundColor: [],
              borderColor: [],
              borderWidth: 1,
              yAxisID: 'yYield',
            }
          ]
        },
        show:true
      }
  
      //this.backChart.data = dataChart.data;
      this.backDataChart.show.forEach((show,index)=>{
        if( show ){
          dataChart.data.labels.push(this.backDataChart.data.labels[index]);
  
          dataChart.data.datasets[0].data.push(this.backDataChart.data.datasets[0].data[index]);
          dataChart.data.datasets[0].backgroundColor.push(this.backDataChart.data.datasets[0].backgroundColor[index]);
          dataChart.data.datasets[0].borderColor.push(this.backDataChart.data.datasets[0].borderColor[index]);
  
          dataChart.data.datasets[1].data.push(this.backDataChart.data.datasets[1].data[index]);
          dataChart.data.datasets[1].backgroundColor.push(this.backDataChart.data.datasets[1].backgroundColor[index]);
          dataChart.data.datasets[1].borderColor.push(this.backDataChart.data.datasets[1].borderColor[index]);
        }
      })
      // console.log("newdataChart",dataChart)
      // console.log("statedataChart",this.state.dataChart)
  
      // dataChart.data.labels.push(CROPNAME);
      // dataChart.data.datasets[0].data.push(item.properties.SHAPE_Area/100.0);
      // dataChart.data.datasets[0].backgroundColor.push("");
      // dataChart.data.datasets[0].borderColor.push("");
      // dataChart.data.datasets[1].data.push(item.properties.YIELD);
      // dataChart.data.datasets[1].backgroundColor.push("");
      // dataChart.data.datasets[1].borderColor.push("");
  
      //dataChart=this.state.dataChart;
  
      this.setState({
        ...this.prevState,
        dataChart: dataChart,
      })
  
      this.refChartL.update(dataChart.data);
    }
    
    //console.log("remove:",this.state.dataChart)
	}
  
  style = (feature) => {
    //console.log("***features desde style:",prueba, "style:", style)
    const newStyle=feature.style;
    if( feature.selected ){
      newStyle.color="white";
    }
    
		// return { 
			// fillColor: this.getColor(feature.properties.CROPCODE), 
      // fillColor: 'red',
			// weight: 1, 
			// opacity: 1, 
			// color: 'black', 
			// dashArray: '3', 
			// fillOpacity: 0.7 
		// }; 
    return newStyle;
	}

 

  popup = (feature, layer) => {
    layer.bindPopup("Crop name: "+feature.properties.CROPNAME
      +"<br> Leng: "+(feature.properties.SHAPE_Leng).toFixed(2)
      +"<br> Area: "+(feature.properties.SHAPE_Area/100.0).toFixed(2)+" hectares"
      +"<br> Yield: "+(feature.properties.YIELD).toFixed(2)
    );
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
    let rawGeoJSON={}//this.state.rawGeoJSON

     console.log("antes pruebaJSON",this.state.rawGeoJSON)
    response.data.files.forEach( file=>{
      console.log("file['dataJson']:",file['dataJson'])
      if( !(typeof file['dataJson']=='object')){
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
        item.ext=file.ext;
        // LatLngBoundsExpression
        // const bounds = new LatLngBounds([40.712216, -74.22655], [40.773941, -74.12544])
        // item.bounds = bounds
        layers.push(item)
      }
      else{
        //this.state.pruebaJSON=file['dataJson']
        file['dataJson']['name']=file.fileName
        // rawGeoJSON.push(file['dataJson'])
        rawGeoJSON=file['dataJson']
        //console.log("despues pruebaJSON",this.state.rawGeoJSON)
      }
      
      
    });

    layers.map((item) => (
      //<TileLayer url={item.url_terracotta+"?colormap=rdylgn&stretch_range=["+item.min+","+item.max+"]"} format="image/png" transparency={true} opacity={1.0} bounds={item.bounds}/>
      console.log("url:",item.url+"?filename="+item.filename+"&projection="+item.projection+"&band="+item.band+"&min="+item.min+"&max="+item.max+"&palette="+item.palette)
      // <TileLayer url={item.url+"?filename="+item.filename+"&projection="+item.projection+"&band="+item.band+"&palette="+item.palette} format="image/png" transparency={true} opacity={1.0} bounds={item.bounds}/>
    ))

    console.log("antes de setDataChart:",rawGeoJSON)
    // this.setDataChart(rawGeoJSON[0].features)
    this.setDataChart(rawGeoJSON.features)

    console.log("despues de setDataChart:",rawGeoJSON)

    this.setState({
      ...this.prevState,
      layers: [],
      pruebaJSON: []
    })

    console.log("entres setState")

    this.setState({
      ...this.prevState,
      layers: layers,
      pruebaJSON: rawGeoJSON
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
    //this.refGeoJson.update();

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

  //const [mapLayers, setMapLayers] = useState([]);


  _onCreated = (e) =>{
    console.log("_onCreated");
    //const {layerType, layer}=e;
    const {layer,layerType,type,target,sourceTarget}=e;

    //let lastAddedPolygonID;
    console.log("e:"+Object.keys(e));
    console.log("*layer:"+Object.keys(layer));
    console.log("*layerType:"+layerType);

    const { _events } = layer;
    console.log("*layer_events:"+Object.keys(_events) );

    //layer:options,_bounds,_latlngs,_initHooksCalled,_events,editing,_leaflet_id,_eventParents,_mapToAdd,_renderer,_map,_zoomAnimated,_path,_rings,_rawPxBounds,_pxBounds,_parts,_firingCount

    if(layerType === "polygon"){
      const { _leaflet_id } = layer;
      console.log("#### _leaflet_id:", _leaflet_id);
      // if (lastAddedPolygonID) {
      //   e.sourceTarget._layers[lastAddedPolygonID].remove();
      // }
      // lastAddedPolygonID = _leaflet_id;


      console.log("#### _leaflet_id:", _leaflet_id);
      console.log("#### LatLngs:", layer.getLatLngs()[0].length," -> ",layer.getLatLngs()[0]);

      const selectedPolygon={}

      selectedPolygon.points=layer.getLatLngs()[0];
      let xmin=selectedPolygon.points[0].lng;
      let xmax=xmin;
      let ymin=selectedPolygon.points[0].lat;
      let ymax=ymin;
      selectedPolygon.points.push(selectedPolygon.points[0])
      selectedPolygon.points.forEach((point,index)=>{
        if(xmin>point.lng){xmin=point.lng;}
        else if(xmax<point.lng){xmax=point.lng;}
        if(ymin>point.lat){ymin=point.lat;}
        else if(ymax<point.lat){ymax=point.lat;}
        console.log(index," -> lat=",point.lat," lng=",point.lng)
      })
      
      
      selectedPolygon.BB={xmin:xmin,xmax:xmax,ymin:ymin,ymax:ymax}

      console.log("selectedPolygon:", selectedPolygon );

      //console.log("#### LatLngs:", layer.getLatLngs());

      // this.state.setMapLayers((layers)=>[
      //   ...layers,
      //   { id: _leaflet_id, latlngs: layer.getLatLngs()[0]},
      // ]);
      //let listGeoJSON2=[...this.state.listGeoJSON];


      let listGeoJSON2 = this.state.listGeoJSON;
      let selected = [];
      listGeoJSON2.forEach( ( crop, indexCrop ) => {
        
        crop.forEach( ( data, indexData ) => {
          const bb=this.boundingBox[indexCrop][indexData]
          if( selectedPolygon.BB.xmin < bb.xmin &&
              bb.xmax < selectedPolygon.BB.xmax &&
              selectedPolygon.BB.ymin < bb.ymin &&
              bb.ymax < selectedPolygon.BB.ymax
            ){
              //let noneZeroMode=true;
              //data.selected=true;

              data.selected=data.geometry.coordinates[0].every( (point)=>{
                let i;
                let j;
                let nvert=selectedPolygon.points.length;
                //let c=1;
                let c=0;

                for(i=0, j=nvert-1;i<nvert; j= i++){
                  if (((selectedPolygon.points[i].lat > point[1]) != (selectedPolygon.points[j].lat > point[1])) &&
                  (point[0] < (selectedPolygon.points[j].lng - selectedPolygon.points[i].lng) * (point[1] - selectedPolygon.points[i].lat) / (selectedPolygon.points[j].lat - selectedPolygon.points[i].lat) + selectedPolygon.points[i].lng)) {
                    //c=c*(-1);
                    c=!c;
                  }
                }

                return Boolean(c);
                })
              //console.log("poligono"+data.selected)
                


              // data.geometry.coordinates.forEach( (polygon) => {
              //   data.selected=polygon.every( (point)=>{
              //     let oddNodes = false;
              //     let zeroState=0;
              //     let point1=selectedPolygon.points[selectedPolygon.points.length-1];
              //     selectedPolygon.points.forEach((point2)=>{
              //       if (((point2.lat > point[1]) != (point1.lat > point[1])) && (point[0] < (point1.lng - point2.lng) * (point[1] - point2.lat) / (point1.lat - point2.lat) + point2.lng)) {
              //         oddNodes = !oddNodes;
              //         if (point2.lat > point1.lat ) {
              //           zeroState++;
              //         }
              //         else {
              //           zeroState--;
              //         }
              //       }
              //       point1=point2;
              //     })
              //     //data.selected=noneZeroMode?zeroState!=0:oddNodes;
              //     if(zeroState==0){
              //       //data.selected=false;
              //       return false;

              //     }
              //     return true;
              //     // else{
              //     //   this.setState(
              //     //     prevState => {
              //     //       const listGeoJSON = [ ...prevState.listGeoJSON ];
              //     //       listGeoJSON[indexCrop] = [ ...listGeoJSON[indexCrop] ];
              //     //       listGeoJSON[indexCrop][indexCrop] = {...listGeoJSON[indexCrop][indexCrop],["selected"]:true}
              //     //       return { listGeoJSON };
              //     //     }
              //     //   )
              //     // }
              //   })
              // })
  
            }
            else{
              data.selected=false;
            }
          if(data.selected)selected.push({indexCrop: indexCrop, indexData: indexData})
  
        })
        
      })

      let dataChart = {
        // xcode: [],
        data: {
          
          labels: [],
          datasets: [
            {
              label: 'Area',
              data: [],
              backgroundColor: [],
              borderColor: [],
              borderWidth: 1,
              yAxisID: 'yArea',
            },
            {
              label: 'Yield',
              data: [],
              backgroundColor: [],
              borderColor: [],
              borderWidth: 1,
              yAxisID: 'yYield',
            }
          ]
        },
        show:true
      }

      selected.forEach((item) => {
        const data=listGeoJSON2[item.indexCrop][item.indexData]
        

        const CROPNAME=data.properties.CROPNAME;
        const CODE=data.properties.CODE;

        if( dataChart.data.labels.includes(CROPNAME) ){
          const indexCrop=dataChart.data.labels.indexOf(CROPNAME);
          dataChart.data.datasets[0].data[indexCrop]+=data.properties.SHAPE_Area/100.0;
          dataChart.data.datasets[1].data[indexCrop]+=data.properties.YIELD;
        }
        else{
          dataChart.data.labels.push(CROPNAME);
          dataChart.data.datasets[0].data.push(data.properties.SHAPE_Area/100.0);
          dataChart.data.datasets[0].backgroundColor.push(this.colorMap[item.indexCrop]);
          dataChart.data.datasets[0].borderColor.push(this.colorMap[item.indexCrop]);
          dataChart.data.datasets[1].data.push(data.properties.YIELD);
          dataChart.data.datasets[1].backgroundColor.push(this.colorMap[item.indexCrop]);
          dataChart.data.datasets[1].borderColor.push(this.colorMap[item.indexCrop]);
          this.backDataChart.show.push(true);
        }
      })
      //////////

      console.log("selected:vacio");
      this.setState({
        //...this.prevState,
        //dataChart: {},
        selected: []
      })
      
      console.log("selected:nuevo");
      this.setState({
        ...this.prevState,
        dataChart: dataChart,
        //...this.prevState,
        //dataChart: dataChart,
        selected: selected
      })
      console.log("selected:despues");

      //console.log("dataChart: ",dataChart.data);
      
      //console.log("this.refChartL.update antes");
      this.refChartL.update(dataChart.data);
      console.log("this.refChartL.update despues");
      //console.log("selected:", this.state.selected );

      //this.setState({listGeoJSON: listGeoJSON2 })
      //console.log("xxxlistGeoJSON:", this.state.listGeoJSON );
      

      // this.setState({
      //   //PruebaCambio...this.prevState,
      //   listGeoJSON: []
      // })
      // //https://stackoverflow.com/questions/71185474/component-not-re-rendering-after-change-in-an-array-state-in-react

      // this.setState({
      //   listGeoJSON: listGeoJSON2
      // })



//https://stackoverflow.com/questions/43040721/how-to-update-nested-state-properties-in-react
      // let listGeoJSON2=this.state.listGeoJSON;
      // this.setState({
      //   listGeoJSON: []
      // })
      
      // this.setState( state => {
      //   const listGeoJSON = listGeoJSON2.map( ( crop, indexCrop ) => {
      //     const newcrop=crop.map( ( data, indexData ) => {
      //       const bb=this.boundingBox[indexCrop][indexData]
      //       if( selectedPolygon.BB.xmin < bb.xmin &&
      //           bb.xmax < selectedPolygon.BB.xmax &&
      //           selectedPolygon.BB.ymin < bb.ymin &&
      //           bb.ymax < selectedPolygon.BB.ymax
      //         ){
      //           //console.log("*****poligono{ cultivo:",indexCrop,", data",indexData,"}");
      //           let noneZeroMode=true;
      //           // console.log("*****data:",data.geometry.coordinates);
      //           data.selected=true;
      //           data.geometry.coordinates.forEach( (polygon) => {
      //             polygon.every( (point)=>{
      //               let oddNodes = false;
      //               let zeroState=0;
      //               let point1=selectedPolygon.points[selectedPolygon.points.length-1];
      //               // console.log("********previo{zeroState",zeroState,", oddNodes:",oddNodes,"}");
      //               selectedPolygon.points.forEach((point2)=>{
      //                 if (((point2.lat > point[1]) != (point1.lat > point[1])) && (point[0] < (point1.lng - point2.lng) * (point[1] - point2.lat) / (point1.lat - point2.lat) + point2.lng)) {
      //                   oddNodes = !oddNodes;
      //                   if (point2.lat > point1.lat ) {
      //                     zeroState++;
      //                   }
      //                   else {
      //                     zeroState--;
      //                   }
      //                 }
      //                 //console.log("********(",indexPoint,")",point, point1, point2,"{zeroState",zeroState,", oddNodes:",oddNodes,"}");
      //                 point1=point2;
      //               })
      //               //console.log("********{zeroState",zeroState,", oddNodes:",oddNodes,"}");
      //               //data.selected=noneZeroMode?zeroState!=0:oddNodes;
      //               if(zeroState==0){
      //                 data.selected=false;
      //               }
      //             })
      //           })
              
      //         }
      //         else{
      //           data.selected=false;
      //         }
            
      //       return data;
      //     })
      //     return newcrop;

      //   })

      //   return {
      //     listGeoJSON,
      //   };
      // })

      //this.forceUpdate();
      //this.forceUpdate();

      //console.log("listGeoJSON:", this.state.listGeoJSON );
      

      // console.log("listGeoJSON2:", listGeoJSON2 );

      // this.setState({
      //   //PruebaCambio...this.prevState,
      //   listGeoJSON: []
      // })
      // //https://stackoverflow.com/questions/71185474/component-not-re-rendering-after-change-in-an-array-state-in-react

      // /*
      // this.setState({
      //   ...this.prevState,
      //   listGeoJSON: [...listGeoJSON2]
      // })*/
      // this.setState({
      //   //PruebaCambio */...this.prevState,
      //   listGeoJSON: listGeoJSON2
      // })


      
    }
    //{JSON.stringify(mapLayers,0,2)}
    // console.log("#### _onCreate ####");
    // console.log("##layerType ",layerType);
    // console.log("##layer", layer);
    console.log("fin de polygon");

  }

  
  
  
  render() {
    const url=`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`;
    // const url=`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`;
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

            {/* <MapInfo childRef={ref => (this.refMapInfo= ref)} position="topright" /> */}
            <MapInfo position="topright" />

            <ScaleControl position="topright" />

            {/* <MyData /> */}
            {/* if( this.state.pruebaJSON!="" ) <GeoJSON data={this.state.pruebaJSON} />; */}
            
            {/* {
              this.state.dataChart.map((item) => {
                console.log("**********dataChartxxx:",item)
                return(
                  <div>
                    <ChartL
                      // childRef={ref => (this.refChartL= ref)}
                      show={true}
                      position="topright"
                      data={item}
                    />
                  </div>
                )
              })
            } */}
{/* https://codingbeautydev.com/blog/react-remove-element-onclick/#:~:text=Remove%20stand%2Dalone%20element%20onclick%20in%20React&text=Attach%20an%20event%20handler%20to,the%20element%20from%20the%20DOM. */}
                    
            
            {/* <GeoJSON
              data={this.state.pruebaJSON}
              //childRef={ref => (this.refGeoJson= ref)}
            /> */}
            {/* if( typeof this.state.pruebaJSON=='object' ) <GeoJSON data={this.state.pruebaJSON} />; */}


            <FeatureGroup>
              <EditControl
                position="topright"
                onCreated={this._onCreated}
                //onEdited={this._onCreated}
                onDeleted={()=>console.log("onDeleted")}
                draw={{
                  polyline: false,
                  rectangle: false,
                  circle: false,
                  marker: false,
                  circlemarker: false
                }}
              />
            </FeatureGroup>
            

            <LayersControl position="topright">
              <LayersControl.Overlay checked name="GeoTiff">
                <LayerGroup>
                  {/* <TileLayer url="http://localhost:34287/tiles/{z}/{x}/{y}.png?filename=/home/alex/temp2&projection=EPSG:3857&band=1&palette=colorbrewer.diverging.RdYlGn_11" format="image/png" transparency={true} opacity={0.8} /> */}
                  {/* <TileLayer url="http://localhost:38267/api/tiles/{z}/{x}/{y}.png?filename=/home/temp/GeoTIFF_5c08303a6d294bcaa8f5af94104f483c.tif&projection=EPSG:3857&band=1&min=-16212.198887597895&max=15284.235972435366&palette=colorbrewer.diverging.RdYlGn_11" format="image/png" transparency={true} opacity={0.8} /> */}
                  
                  {/* <TileLayer url="http://localhost:5001/singleband/2B/{z}/{x}/{y}.png?colormap=greys&stretch_range=[16,29]" format="image/png" transparency={true} opacity={0.8} /> */}
                  {/* http://localhost:5001/singleband/2A/{z}/{x}/{y}.png?colormap=rdylgn&stretch_range=[43,58] */}
                  
                  {
                    this.state.layers.map((item) => {
                      //<TileLayer url={item.url_terracotta+"?colormap=rdylgn&stretch_range=["+item.min+","+item.max+"]"} format="image/png" transparency={true} opacity={1.0} bounds={item.bounds}/>
                      // <TileLayer url={item.url+"?filename="+item.filename+"&projection="+item.projection+"&band="+item.band+"&palette="+item.palette} format="image/png" transparency={true} opacity={1.0} bounds={item.bounds}/>
                      if(item.ext=='tif')
                        return <TileLayer url={item.url+"?filename="+item.filename+"&projection="+item.projection+"&band="+item.band+"&min="+item.min+"&max="+item.max+"&palette="+item.palette} format="image/png" transparency={true} opacity={1.0}/>
                      else
                        return <TileLayer url={item.url+"?filename="+item.filename+"&projection="+item.projection+"&band="+item.band+"&min="+item.min+"&max="+item.max+"&palette="+item.palette} format="image/png" transparency={true} opacity={1.0}/>
                        //return <TileLayer url={item.url+"?filename="+item.filename+"&projection="+item.projection+"&band="+item.band+"&min="+item.min+"&max="+item.max+"&palette="+item.palette} format="image/png" transparency={true} opacity={1.0} bounds={item.bounds}/>
                      // <TileLayer url={item.url+"?filename="+item.filename+"&projection="+item.projection+"&band="+item.band+"&min="+item.min+"&max="+item.max+"&palette="+item.palette} format="image/png" transparency={true} opacity={1.0}/>

                    })

                  }
                </LayerGroup>
              </LayersControl.Overlay>

              
                {/* <LayerGroup> */}

                {/* https://stackoverflow.com/questions/68581429/how-to-listen-to-the-layer-control-events-of-a-react-leaflet-map */}
                {/* {
                  this.state.pruebaJSON.map((item) => {
                    console.log("GeoJson:",item)
                    console.log("item.properties.name",item.name)
                    return(
                      <div>
                        <LayersControl.Overlay checked name={item.name}>
                        <LayerGroup>
                          <GeoJSON
                            data={item.features[19]}
                            style={this.style}
                            onEachFeature={this.popup}
                          />
                        </LayerGroup>
                        </LayersControl.Overlay>
                        
                      </div>
                    )
                  })
                } */}
                {
                  // for (const [key, value] of Object.entries(this.state.features)) {
                  //   console.log(`${key}: ${value}`);
                  // }
                  // return 0

                  // Object.entries(geo2).map( ([key,val])=>val)
                  //Object.entries(this.state.listGeoJSON).map(([code,data]) => {
                  this.state.listGeoJSON.map((item,index) => {
                    // console.log("GeoJson:",item)
                    //console.log("item.properties.name",code)
                    //console.log("GeoJson:",code)
                    // this.state.onAddChart=false;
                    const name=this.backDataChart.data.labels[index];
                    return(
                      <div>
                        {/* <LayersControl.Overlay checked name={code+" "+this.properties[code].label}> */}
                        <LayersControl.Overlay checked name={name}>

                        
                        <LayerGroup>
                          <GeoJSON
                            //key={this.state.listGeoJSON.crop.data.selected}
                          //selected
                            //data={item.data.filter(itemData=> itemData.selected)}
                            data={item}
                            //style={item.style}
                            style={this.style}

                            //style funcion
                            //https://leafletjs.com/examples/geojson/
                            //punto dentro de poligono
                            //https://programmerclick.com/article/2166959151/
                            onEachFeature={this.popup}

                            eventHandlers={{
                              add: (e) => {
                                //console.log("Added Layer:", e.target);
                                this.setShowDataChart(name,true);
                              },
                              remove: (e) => {
                                // console.log("Removed layer:", e.target);
                                // console.log("key:", code);
                                this.setShowDataChart(name,false);
                              }
                            }}
                          />
                        
                          {/* <GeoJSON
                            data={this.state.selectedGeoJSON[index].data}
                            style={this.state.selectedGeoJSON[index].style}
                            onEachFeature={this.popup}
                          /> */}
                        </LayerGroup>

                        </LayersControl.Overlay>
                        
                      </div>
                    )
                  })

                }
                {
                  /*****************/
                  this.state.selected.map((item,index) => {
                    //console.log("index:"+index)
                    //console.log("index:"+index+" indexCrop:"+item.indexCrop+" indexData:"+item.indexData)
                    return(
                      <div>
                        
                          <GeoJSON
                            data={this.state.listGeoJSON[item.indexCrop][item.indexData]}
                            onEachFeature={this.popup}
                          />
                      </div>
                    )
                  })
                }

                    {this.state.dataChart.show &&
                      <ChartL
                        childRef={ref => (this.refChartL= ref)}
                        show={true}
                        position="topright"
                        data={this.state.dataChart.data}
                        // options={{
                        //   filter: function(legendItem, data) {
                        //     /* filter already loops throw legendItem & data (console.log) to see this idea */
                        //     //var index = legendItem.index;
                        //     //var currentDataValue =  data.datasets[0].data[index];
                        //     //console.log("current value is: " + currentDataValue)

                        //       return true;
                        //   }
                        // }}
                      />
                      // ||
                      // console.log("******Creando Chart*****")
                    }

                {/* </LayerGroup> */}
              {/* </LayersControl.Overlay> */}
              
            </LayersControl>

            

          </MapContainer>

        </div>
        
      </div>
    );
  }
}
    
export default MapboxContainerVis;
