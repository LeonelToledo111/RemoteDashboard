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
            ymin:   this.props.ymin,
            ymax:   this.props.ymax,
            // color:      this.props.color || [],
            backgroundColor:  this.props.backgroundColor || [],
            borderColor:      this.props.borderColor || [],
            label:      this.props.label || [],
            type:   this.props.type || "bar",
            xi: this.props.xi || 0,
            var: this.props.var || "",
            frequencies: this.props.frequencies || [],
            subinterval: this.props.subinterval || [],
            frequenciesColor: this.props.frequenciesColor || [],
            mean: this.props.mean || 0,
            std: this.props.std || 0,
            // data:   this.props.data || {},
            // options:   this.props.options || {}
            

        };
        

        //this.setData = this.setData.bind(this)

        console.log("*****Constructor")
        
    }

    myChart=undefined;
    configTimeSeries=undefined;
    configHistogram=undefined;
    selectedTimeSeries=false;

    // changeSelected(){
    //   this.selectedTimeSeries=!this.selectedTimeSeries;
    // }

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

        if(this.state.subinterval.length>0 || this.state.x.length>0 ){
          this.makeChart(this.container);
        }
        
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

      if(this.selectedTimeSeries){
        let headers="Time, "+this.state.var+"_max, "+this.state.var+"_mean, "+this.state.var+"_min";
        csvRows.push(headers);
        this.state.x.forEach((label, index)=>{
          let row=label+", "+this.state.y[0][index]+", "+this.state.y[1][index]+", "+this.state.y[2][index];
          csvRows.push(row);
        });
      }
      else{
        let headers="boundarie1, boundarie2, frequencie";
        csvRows.push(headers);
        this.state.frequencies.forEach((freq, index)=>{
          let row=this.state.subinterval[index]+", "+this.state.subinterval[index+1]+", "+freq;
          csvRows.push(row);
        });
      }

      const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.setAttribute('href', url)
      a.setAttribute('download', 'download.csv');
      a.click()
      
        
        //this.download(csvdata);
    }

    makeList(xlist,ylist){
      return ylist.map(function(y,i){
        return {
          "x":(xlist[i]+xlist[i+1])/2,
          "y":y}
      })
    }

    numInSciNot(each_element){
        const num = {};
        [num.coefficient, num.exponent] =
        each_element.toExponential().split('e').map(item => Number(item));
        if(num.exponent==0)
          return `${num.coefficient.toFixed(2)}`;
        else
          return `${num.coefficient.toFixed(2)} e${num.exponent}`;
      }
   
    makeChart(container){
        // console.log("makeChart");
        const ctxContainer = L.DomUtil.create('canvas', 'myChart',container);
        ctxContainer.setAttribute('width', '1000');
        ctxContainer.setAttribute('height', '800');

        console.log("this.state.subinterval.length:",this.state.subinterval.length)
        console.log("this.state.x.length:",this.state.x.length)
        console.log("and:",this.state.subinterval.length && this.state.x.length)
        if(this.state.subinterval.length>0 && this.state.x.length>0 ){
          console.log("Dentro if")
          const change_TimeSeries_Histogram = L.DomUtil.create('input','bttn_change',container);
          change_TimeSeries_Histogram.setAttribute('width', '1000');
          change_TimeSeries_Histogram.type="button";
          change_TimeSeries_Histogram.value = "Time Series⟺Histogram";
          change_TimeSeries_Histogram.addEventListener('click', ()=>{
            console.log("TIME")
            // configTimeSeries=undefined;
            // configHistogram=undefined;
            this.selectedTimeSeries=!this.selectedTimeSeries;
            //this.changeSelected()
  
            let config=this.selectedTimeSeries?this.configTimeSeries:this.configHistogram;
  
            if (typeof this.myChart == 'object'){
              this.myChart.destroy();
            }
            this.myChart = new Chart(ctxContainer, config);
          });
        }


        

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
                    this.state.backgroundColor[i],
                ],
                borderColor: [
                    this.state.borderColor[i],
                ],
                borderWidth: 1,
                pointRadius: 2,
              });
        }
        let dy=0.3*(this.state.ymax-this.state.ymin)

        this.configTimeSeries = {
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
                    autoSkip: true,
                    maxRotation: 90,
                    minRotation: 90,
                    // font:{
                    //   size:10
                    // }
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
                },
                min:this.state.ymin-dy,
                max:this.state.ymax+dy
              },
              // y:{
              //   min:200,
              //   max:300
              // }
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
                ctx.strokeWidth = 2;
                ctx.lineWidth = 2;
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
        console.log("x,y:")
        console.log("freq:",this.state.frequencies)
        console.log("subinterval:",this.state.subinterval.map(function(x,i){
          return { "x":x, "i":i}
        }))
        // console.log("frequencies:",this.state.frequencies.map(function(y,i){
        //   return {
        //     "y":y,
        //     "i":i,
        //     "q":this.state.subinterval[0],
        //   }
        // }))

        this.configHistogram = {
          type: 'bar',
          data: {
            // labels: this.state.subinterval.map(function(each_element){return Number(each_element.toFixed(2));}),
            // labels: this.state.subinterval.map(function(each_element){return each_element.toExponential(2);}),
            // labels: this.state.subinterval.map(function(each_element){
            //   const numInSciNot = {};
            //   [numInSciNot.coefficient, numInSciNot.exponent] =
            //   each_element.toExponential().split('e').map(item => Number(item));
            //   return `${numInSciNot.coefficient.toFixed(2)} e${numInSciNot.exponent}`;
            // }),

            // labels: this.state.subinterval,
            datasets: [{
              label: 'Frequencies',
              // data: this.state.frequencies,
              data:this.makeList(this.state.subinterval,this.state.frequencies),
              
              backgroundColor: this.state.frequenciesColor,
              barPercentage: 1,
              categoryPercentage: 1,
            }]
          },
          options: {
            scales: {
              x:{
                type: 'linear'
              },
              // xAxes: [{
              //   display: false,
              //   barPercentage: 1,
              //   ticks: {
              //     max: 3,
              //   },
              // }, {
              //   display: true,
              //   ticks: {
              //     autoSkip: false,
              //     max: 4,
              //   }
              // }],
              // yAxes: [{
              //   ticks: {
              //     beginAtZero: true
              //   }
              // }]
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
                beforeDraw: (chart) => {//antes
                  const ctxCanvas = chart.canvas.getContext('2d');
                  ctxCanvas.save();
                  ctxCanvas.globalCompositeOperation = 'destination-over';
                  ctxCanvas.fillStyle = 'rgba(255, 255, 255, 0.8)';
                  ctxCanvas.fillRect(0, 0, chart.width, chart.height);
                  ctxCanvas.restore();
                },
                afterDraw: chart => {//despues
                  // console.log("---------afterDraw-----------")
                  var ctx = chart.ctx;
                  var xAxis = chart.scales.x;
                  var yAxis = chart.scales.y;
                  // console.log("chart.scales:",chart.scales)
                  const x_1 = xAxis.getPixelForValue(this.state.mean-this.state.std);
                  const x_2 = xAxis.getPixelForValue(this.state.mean);
                  const x_3 = xAxis.getPixelForValue(this.state.mean+this.state.std);
                  const yi = yAxis.getPixelForValue(0);
                  const yf = yAxis.getPixelForValue(Math.max( ...this.state.frequencies ));

                  // const x0=xAxis.getPixelForValue(0)
                  // const x1=xAxis.getPixelForValue(1)
                  // const x2=xAxis.getPixelForValue(2)
                  
                  // console.log("chart.scales x_1 x_2 x_3:",x_1,x_2,x_3)
                  // console.log("chart.scales mean std:",this.state.mean,this.state.std)
                  // console.log("subinterval min-max:",this.state.subinterval[0],this.state.subinterval[this.state.subinterval.length-1])
                  // console.log("yi yf:",yi,yf)
                  // console.log("chart.width, chart.height",chart.width, chart.height)
                  // console.log("x=0 x=1 x=2",x0,x1,x2)
                  // const x_1 = xAxis.getPixelForValue(this.state.subinterval[1]);
                  // const x_2 = xAxis.getPixelForValue(this.state.subinterval[3]);
                  // const y_1 = yAxis.getPixelForValue(this.state.frequencies[1]);
                  // const y_2 = yAxis.getPixelForValue(this.state.frequencies[2]);

                  // ctx.save();
                  // ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                  // ctx.fillRect(0, 0, chart.width, chart.height);
                  // ctx.restore();

                  ctx.save();

                  ctx.strokeStyle = 'rgba(116, 116, 116,0.8)';
                  
                  ctx.beginPath();
                  ctx.setLineDash([20,5]);
                  ctx.moveTo(x_1, yi);
                  ctx.lineTo(x_1, yf+20);
                  ctx.moveTo(x_2, yi);
                  ctx.lineTo(x_2, yf+20);
                  ctx.moveTo(x_3, yi);
                  ctx.lineTo(x_3, yf+20);
                  ctx.stroke();

                  ctx.font = "20px sans-serif";
                  ctx.font = "14px Arial";
                  ctx.fillStyle = "rgb(116, 116, 116)";
                  // ctx.textAlign = "left";
                  ctx.textAlign = "center";
                  ctx.textBaseline = "bottom";
                  ctx.fillText("x̄="+this.numInSciNot(this.state.mean)+" \t σ="+this.numInSciNot(this.state.std), x_2, yf);

                  ctx.textAlign = "center";
                  
                  ctx.textBaseline = "top";
                  // ctx.textAlign = "left";
                  ctx.fillText("x̄-σ="+this.numInSciNot(this.state.mean-this.state.std), x_1, yf);
                  
                  ctx.fillText("x̄", x_2, yf);
                  // ctx.textAlign = "right";
                  ctx.fillText("x̄+σ="+this.numInSciNot(this.state.mean+this.state.std), x_3, yf);

                  // ctx.textAlign = "center";
                  // ctx.fillText("center-aligned", x, 85);
                  //σ x̄

                  
                  // ctx.strokeStyle = 'rgba(255, 0, 132,0.8)';
                  // ctx.fillStyle = 'rgba(255,26,104,0.5)';
                  // ctx.fillRect(x_1, yi, x_2-x_1, yf-yi)
                  
                  // ctx.strokeStyle = 'rgba(0, 255, 132,0.8)';
                  // ctx.fillStyle = 'rgba(26,255,104,0.5)';
                  // ctx.fillRect(x_2, yi, x_3-x_2, yf-yi)
                  
                  ctx.restore();

                }
            },
          ],

        }
        
        // let myChart;
        console.log("*******this.selectedTimeSeries**********",this.selectedTimeSeries);
        let config=this.selectedTimeSeries?this.configTimeSeries:this.configHistogram;

        if (typeof this.myChart == 'object'){
          this.myChart.destroy();
        }
        this.myChart = new Chart(ctxContainer, config);
        

        // console.log("*******new Chart**********");

        // const myChart = new Chart(ctxContainer, config);
        
    }

    componentDidMount() {
        console.log("*******componentDidMount**********");
        const { map } = this.props;
        this.control=this.createControl();
        this.control.addTo(map)
    }

    componentWillUnmount() {
        console.log("*******componentWillUnmount**********");
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


