//************************************************** */
import React, { Component } from "react";
import { useMap } from "react-leaflet";
import L from 'leaflet';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
} from 'chart.js';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);
class ChartL2 extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            width:  this.props.width || 200,
            height: this.props.height || 20,
            
            // event:  this.props.event,
            x:      this.props.x || [],
            y:      this.props.y || [],
            color:      this.props.color || [],
            label:      this.props.label || [],
            type:   this.props.type || "bar",
            xi: this.props.xi || 0,
            var: this.props.var || "",
            // data:   this.props.data || {},
            // options:   this.props.options || {}

        };

        //this.setData = this.setData.bind(this)
        
    }

    ChartL2 = L.Control.extend({
      options:{
          position: this.props.position || 'bottomleft',
      },

      onAdd: (map) => {
        this.map=map;

        // console.log("******ChartL*******",this.state.data)
        const container = L.DomUtil.create('div','chartL-container');
        // container.setAttribute('style', 'height:10vh; width:20vw');              // style="position: relative; height:40vh; width:80vw"
        container.setAttribute('style', 'height:800px; width:400px');
        //container.setAttribute('style', 'height:10vh; width:20vw');
        this.container = container;
        this.makeChart(this.container);
        
        return this.container;
      },

      onRemove: function (map) {
      }
    });

    // setData = (x,y) => {
    //   const data = {
    //     labels: x,
    //     datasets: [{
    //       label: 'Area',
    //       data: y,
    //       backgroundColor: [
    //         'rgba(255, 205, 86, 0.6)',
    //       ],
    //       borderColor: [
    //         'rgb(255, 205, 86)',
    //       ],
    //       borderWidth: 1
    //     }]
    //   };

    //   this.setState({
    //     ...this.prevState,
    //     data: data,
    //   })
    // }

    // show(map){
    //   if( this.state.show ){
    //     this.control.addTo(map);
    //   }                    
    //   else{
    //     this.control.remove(map);
    //   }
    // }

    createControl() {
        
        return new this.ChartL2();
    }

    
    // download = function (data) {
  
    //     const blob = new Blob([data], { type: 'text/csv' });
    //     const url = window.URL.createObjectURL(blob)
    //     const a = document.createElement('a')
    //     a.setAttribute('href', url)
    //     a.setAttribute('download', 'download.csv');
    //     a.click()
    // }
   
    // csvmaker = function(data){
    
    //     let csvRows = [];
    //     const headers = Object.keys(data);
    //     csvRows.push(headers.join(','));
    //     const values = Object.values(data).join(',');
    //     csvRows.push(values)
    //     return csvRows.join('\n')
    // }
   
    save = async function () {
    
        let csvRows = [];
        let headers="Crop";
        this.state.data.datasets.forEach(( {label} )=>{
          headers+=", "+label;
        });
        csvRows.push(headers);
        this.state.data.labels.forEach((label, index)=>{
          let row=label;
          this.state.data.datasets.forEach(( {data} )=>{
            row+=", "+data[index];
          });
          csvRows.push(row);
        });
        
        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.setAttribute('href', url)
        a.setAttribute('download', 'download.csv');
        a.click()
        //this.download(csvdata);
    }
   
    makeChart(container){
        // console.log("makeChart");
        const ctxContainer = L.DomUtil.create('canvas', 'myChart',container);
        ctxContainer.setAttribute('width', '1000');
        ctxContainer.setAttribute('height', '800');

        const bttn = L.DomUtil.create('input','bttn_name',container);
        bttn.setAttribute('width', '1000');
        //bttn.width="1000";
        bttn.type="button";
        //bttn.title="No cat";
        bttn.value = "Save";
        // bttn.onclick = () => {this.save};
        //bttn.addEventListener('click', this.save);

        // this.state.data.label.forEach((num1, index) => {
        //   console.log("num",index,num1)
        // });

        bttn.addEventListener('click', ()=>{
          // this.state.data.label.forEach((num1, index) => {
          //   console.log("num",index,num1)
          // });
          this.save()
        });

        // let data2=this.state.data;

        let datasets=[]
        for (let i = 0; i < this.state.y.length; i++) {
            datasets.push({
                label: this.state.label[i],
                data: this.state.y[i],
                backgroundColor: [
                    this.state.color[i],
                ],
                borderColor: [
                    this.state.color[i],
                ],
                borderWidth: 1
              });
        }

        const config = {
          type: this.state.type,
          data: {
              labels: this.state.x,
              datasets: datasets,
            },

          options: {
            plugins:{
              responsive: true,
              // title: {
              //   text: 'CROP',
              //   position: 'top',
              //   display: true
              // },
              legend: {
                display: true,
                labels: {
                  
                  // filter: function(legendItem, data) {
                  //   //console.log("hiddenGlobal: ",data.datasets[legendItem.datasetIndex].hiddenGlobal);
                  //   //console.log("hiddenGlobal: ",data.datasets[legendItem.datasetIndex].hiddenGlobal);
                  //   return !data.datasets[legendItem.datasetIndex].hiddenGlobal
                  // },
                  // https://www.youtube.com/watch?v=0VcybDX-kk0
                  // generateLabels: (chart) => {
                  //   return chart.data.datasets.map((dataset,index) => ({
                  //       text: dataset.label,
                  //       fillStyle: dataset.backgroundColor[0],
                  //     })
                  //   )
                  // }
                }
              },
              tooltip: {
                callbacks: {
                    label: (item) =>
                        `${item.dataset.label}: ${item.formattedValue} ${(item.dataset.label=="Area")?"hectares":""}`,
                },
              },
            },
            scales: {
              xAxes: {
                ticks: {
                    autoSkip: false,
                    maxRotation: 90,
                    minRotation: 90,
                    font:{
                      size:10
                    }
                }
              },
              yArea: {
                beginAtZero: true,
                type: 'linear',
                display: true,
                position: 'left',
                title:{
                  display:true,
                  align:'center',
                  text:this.state.var,
                  // text:"Area (hectares)",
                  font:{
                    size:12
                  }
                },
                ticks:{
                  font:{
                    size:10
                  }
                }
              },
              // yYield:{
              //   beginAtZero: true,
              //   type: 'linear',
              //   display: true,
              //   position: 'right',
              //   title:{
              //     display:true,
              //     align:'center',
              //     text:"Yield",
              //     font:{
              //       size:12
              //     }
              //   },
              //   ticks:{
              //     font:{
              //       size:10
              //     }
              //   }
              // },
            },

            animation: {
              duration: 0 // general animation time
            },
            hover: {
              animationDuration: 0 // duration of animations when hovering an item
            },
          },
          

          plugins: [
          {
              afterDraw: (chart) => {
                var ctx = chart.ctx;
                var xAxis = chart.scales.xAxes;
                var yAxis = chart.scales.yAxes;
                console.log("chart.scales:",chart.scales)
                // console.log("xAxis:",xAxis)
                // const x = xAxis.getPixelForValue(20);
                // const y_a = yAxis.getPixelForValue(0);
                // const y_b = yAxis.getPixelForValue(300);
                const x_a = chart.scales.xAxes.left;
                const x_b = chart.scales.xAxes.right;
                const x_c = chart.scales.xAxes.left + (chart.scales.xAxes.right-chart.scales.xAxes.left)*this.state.xi/(this.state.x.length-1)
                const y_a = chart.scales.yArea.top;
                const y_b = chart.scales.yArea.bottom;
                
                ctx.save();
                ctx.strokeStyle = 'rgba(99, 99, 99,0.5)';
                ctx.strokeWidth = 6;
                ctx.lineWidth = 6;
                ctx.beginPath();
                ctx.moveTo(x_c,y_a);
                ctx.lineTo(x_c,y_b);
                ctx.stroke();
                ctx.restore();
              },
              beforeDraw: (chart) => {//antes
                const ctxCanvas = chart.canvas.getContext('2d');
                ctxCanvas.save();
                ctxCanvas.globalCompositeOperation = 'destination-over';
                ctxCanvas.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctxCanvas.fillRect(0, 0, chart.width, chart.height);
                ctxCanvas.restore();
              }
          }],
        };
        
        // let myChart;

        // if (typeof myChart == 'object'){
        //   myChart.destroy();
        // }

        // console.log("*******new Chart**********");

        const myChart = new Chart(ctxContainer, config);
        
    }

    componentDidMount() {
        const { map } = this.props;
        this.control=this.createControl();
        this.control.addTo(map)
    }

    componentWillUnmount() {
        const { map } = this.props;
        this.control.remove(map);
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

export default withMap(ChartL2);


