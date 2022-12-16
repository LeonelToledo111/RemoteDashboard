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
class ChartL extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            min:    this.props.min || 0,
            max:    this.props.max || 100,
            value:  this.props.value || 0,
            step:   this.props.step || 1,
            title:  this.props.title || '',
            show:   this.props.show || true,
            width:  this.props.width || 200,
            height: this.props.height || 20,
            event:  this.props.event,
            x:      this.props.x || [],
            y:      this.props.y || [],
            data:   this.props.data || {},
            options:   this.props.options || {}

        };

        //this.setData = this.setData.bind(this)
        
    }

    ChartL = L.Control.extend({
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
        
        this.update=(data)=>{
          // this.state.data=data
          this.setState({
            ...this.prevState,
            data: data,
          })
          if( this.state.show ){
            this.control.addTo(map);
          }                    
          else{
            this.control.remove(map);
          }
          // this.show(map);

          // console.log("********update")
        };
        
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
        
        return new this.ChartL();
    }


    makeChart(container){
        // console.log("makeChart");
        const ctx = L.DomUtil.create('canvas', 'myChart',container);
        ctx.setAttribute('width', '1000');
        ctx.setAttribute('height', '800');

        const config = {
          type: 'bar',
          data: this.state.data,
          //options: this.state.options,

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
                  text:"Area (hectares)",
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
              yYield:{
                beginAtZero: true,
                type: 'linear',
                display: true,
                position: 'right',
                title:{
                  display:true,
                  align:'center',
                  text:"Yield",
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
            },
          },
          

          plugins: [
          {
              afterDraw: chart => {
              },
              beforeDraw: (chart) => {
                const ctx = chart.canvas.getContext('2d');
                ctx.save();
                ctx.globalCompositeOperation = 'destination-over';
                // ctx.fillStyle = '#8591f9';
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.fillRect(0, 0, chart.width, chart.height);
                ctx.restore();
              }
          }],
        };
        
        // let myChart;

        // if (typeof myChart == 'object'){
        //   myChart.destroy();
        // }

        // console.log("*******new Chart**********");

        const myChart = new Chart(ctx, config
      
      );
        
    }

    componentDidMount() {
      // console.log("*******componentDidMount Chart**********");
      const { map } = this.props;
      const control = this.createControl();
      this.control=control;
      this.control.addTo(map);
      // this.control.remove(map);
      // this.show( map );
    
      const { childRef } = this.props;
      childRef(this);
    }


    componentWillUnmount() {
     const { childRef } = this.props;
      childRef(undefined);
    }

    componentDidUpdate(prevProps){
      // console.log("***********componentDidUpdate**************")

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

export default withMap(ChartL);


