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
            event:  this.props.event
        };
    }

    show(map){
      if( this.state.show ){
        this.control.addTo(map);
      }                    
      else{
        this.control.remove(map);
      }
    }

    createControl() {
        const ChartL = L.Control.extend({
            options:{
                position: this.props.position || 'bottomleft',
            },

            onAdd: (map) => {
              this.map=map;

              // console.log("******ChartL*******",this.state.min, this.state.max)
              const container = L.DomUtil.create('div','chartL-container');
              // container.setAttribute('style', 'height:10vh; width:20vw');              // style="position: relative; height:40vh; width:80vw"
              container.setAttribute('style', 'height:200px; width:400px');
              this.container = container;
              this.makeChart(this.container);
              
              
              // console.log("this.map: ",this.map)
              this.update=()=>{
                this.show(map);
              };
              
              return this.container;
            },

            onRemove: function (map) {
            }
        });
        return new ChartL();
    }

    makeChart(container){

//       <canvas id="myChart" width="400" height="400"></canvas>
// <script>
        //const ctx = document.getElementById('myChart').getContext('2d');
        // const label1 = L.DomUtil.create('p', 'chartL-label',container);
        // label1.innerHTML = '**************************Hola*************************';




        const ctx = L.DomUtil.create('canvas', 'myChart',container);


        // const label2 = L.DomUtil.create('p', 'chartL-label',container);
        // label2.innerHTML = '**************************Mundo************************';


        const MONTHS = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ];

        function months(config) {
          var cfg = config || {};
          var count = cfg.count || 12;
          var section = cfg.section;
          var values = [];
          var i, value;
        
          for (i = 0; i < count; ++i) {
            value = MONTHS[Math.ceil(i) % 12];
            values.push(value.substring(0, section));
          }
        
          return values;
        }
      
        // <block:setup:1>
        const labels = months({count: 12});
        const data = {
          labels: labels,
          datasets: [{
            label: 'Maize',
            data: [200, 300, 100, 81, 56, 55, 40, 30, 90, 110, 76, 85],
            backgroundColor: [
              'rgba(255, 205, 86, 0.6)',
            ],
            borderColor: [
              'rgb(255, 205, 86)',
            ],
            borderWidth: 1
          },
          {
            label: 'Sogho',
            data: [120, 310, 200, 100, 80, 70, 20, 90, 110, 76, 85, 65],
            backgroundColor: [
              'rgba(255, 159, 64, 0.6)',
            ],
            borderColor: [
              'rgb(255, 159, 64)',
            ],
            borderWidth: 1
          },
          {
            label: 'Wheat',
            data: [110, 20, 70, 30, 90, 110, 76, 85, 210, 130, 210, 90],
            backgroundColor: [
              'rgba(54, 162, 235, 0.6)',
            ],
            borderColor: [
              'rgb(54, 162, 235)',
            ],
            borderWidth: 1
          }]
        };

        const config = {
          type: 'bar',
          data: data,
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
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
                ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
                ctx.fillRect(0, 0, chart.width, chart.height);
                ctx.restore();
              }
          }],
        };

        const myChart = new Chart(ctx, config
      //     {
      //     type: 'bar',
      //     data: {
      //         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      //         datasets: [{
      //             label: '# of Votes',
      //             data: [200,100,300],
      //             backgroundColor: [
      //                 'rgba(128, 99, 255, 0.2)',
      //                 'rgba(255, 99, 132, 0.2)',
      //                 'rgba(54, 162, 235, 0.2)',
      //                 'rgba(255, 206, 86, 0.2)',
      //                 'rgba(75, 192, 192, 0.2)',
      //                 'rgba(153, 102, 255, 0.2)',
      //                 'rgba(255, 159, 64, 0.2)'
      //             ],
      //             borderColor: [
      //                 'rgba(255, 99, 132, 1)',
      //                 'rgba(54, 162, 235, 1)',
      //                 'rgba(255, 206, 86, 1)',
      //                 'rgba(75, 192, 192, 1)',
      //                 'rgba(153, 102, 255, 1)',
      //                 'rgba(255, 159, 64, 1)'
      //             ],
      //             borderWidth: 1
      //         }]
      //     },
      //     options: {
      //         scales: {
      //             y: {
      //                 beginAtZero: true
      //             }
      //         }
      //     }
      // }
      );
        // const label = L.DomUtil.create('p', 'chartL-label',container);
        // this.label=label;
        
        // label.innerHTML = this.state.title+'<br>'+this.state.value;

        // const div = L.DomUtil.create('div', 'chartL',container);

        // const txtmin = L.DomUtil.create('span', '',div);
        // txtmin.innerHTML = this.state.min;

        // const chartL = L.DomUtil.create('input', '',div);

        // const txtmax = L.DomUtil.create('span', '',div);
        // txtmax.innerHTML = this.state.max;
        
        // chartL.type="range";
        // chartL.min=this.state.min;
        // chartL.max=this.state.max;
        // chartL.step=this.state.step;
        // chartL.value=this.state.value;
        // chartL.innerHTML = "MiSlider";
        // this.chartL=chartL;

        // L.DomEvent.on(
        //     this.chartL,
        //     "mousedown mouseup click touchstart",
        //     L.DomEvent.stopPropagation
        //   );

        //   chartL.addEventListener("click", () => {
        //   this.state.value=this.chartL.value
        //   this.state.event()
          
        // });
        
    }

    componentDidMount() {
      const { map } = this.props;
      const control = this.createControl();
      this.control=control;
      this.control.addTo(map);
      this.control.remove(map);
      this.show( map );
    
      const { childRef } = this.props;
      childRef(this);
    }


    componentWillUnmount() {
     const { childRef } = this.props;
      childRef(undefined);
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


