(this.webpackJsonpdashboard=this.webpackJsonpdashboard||[]).push([[0],{126:function(e,a,t){e.exports=t(232)},131:function(e,a,t){e.exports=t.p+"static/media/logo.5d5d9eef.svg"},139:function(e,a,t){},159:function(e,a,t){e.exports=t.p+"static/media/countriesSorted.57bab6bd.csv"},232:function(e,a,t){"use strict";t.r(a);var l=t(0),n=t.n(l),i=t(16),r=t.n(i),c=(t(93),t(131),t(9)),o=t(6),s=t(10),m=t(11),d=t(12),u=t(113),b=t.n(u),p=t(114),E=t.n(p),v=t(116),h=t.n(v),f=t(117),y=t.n(f),g=t(115),_=t.n(g),x=t(50),C=t(5),S=t(255),O=t(257),M=t(256),w=t(112),j=t.n(w),N=t(111),k=t.n(N),I=t(258),L=t(17),A=function(e){return{type:"SET",payload:e}};function R(e){var a,t=e.depthStep,l=void 0===t?10:t,i=e.depth,r=void 0===i?0:i,c=(e.expanded,e.item),o=Object(C.a)(e,["depthStep","depth","expanded","item"]),s=n.a.useState(!0),m=Object(x.a)(s,2),d=m[0],u=m[1],b=c.label,p=c.items,E=c.Icon,v=c.onClick,h=Object(L.b)();return Array.isArray(p)&&p.length&&(a=d?n.a.createElement(j.a,{className:"sidebar-item-expand-arrow"}):n.a.createElement(k.a,{className:"sidebar-item-expand-arrow sidebar-item-expand-arrow-expanded"})),n.a.createElement(n.a.Fragment,null,n.a.createElement(O.a,Object.assign({className:"sidebar-item",onClick:function(e){Array.isArray(p)&&u((function(e){return!e})),v&&(v(e,c),function(e){"meteorological"===e.name&&h(A(0)),"crop"===e.name&&h(A(1)),"indices"===e.name&&h(A(2)),"policy"===e.name&&h(A(3)),"climate"===e.name&&h(A(4)),"losses"===e.name&&h(A(5)),"payout"===e.name&&h(A(6))}(c))},button:!0,dense:!0},o),n.a.createElement("div",{style:{paddingLeft:r*l},className:"sidebar-item-content"},E&&n.a.createElement(E,{className:"sidebar-item-icon",fontSize:"small"}),n.a.createElement("div",{className:"sidebar-item-text"},b)),a),n.a.createElement(I.a,{in:!d,timeout:"auto",unmountOnExit:!0},Array.isArray(p)?n.a.createElement(S.a,{disablePadding:!0,dense:!0},p.map((function(e,a){return n.a.createElement(n.a.Fragment,{key:"".concat(e.name).concat(a)},"divider"===e?n.a.createElement(M.a,{style:{margin:"6px 0"}}):n.a.createElement(R,{depth:r+1,depthStep:l,item:e}))}))):null))}var F=function(e){var a=e.items,t=e.depthStep,l=e.depth,i=e.expanded;return n.a.createElement("div",{className:"sidebar"},n.a.createElement(S.a,{disablePadding:!0,dense:!0},a.map((function(e,a){return n.a.createElement(n.a.Fragment,{key:"".concat(e.name).concat(a)},"divider"===e?n.a.createElement(M.a,{style:{margin:"6px 0"}}):n.a.createElement(R,{depthStep:t,depth:l,expanded:i,item:e}))}))))};t(139);function T(e,a){}var D=[{name:"home",label:"Home",Icon:b.a},{name:"modules",label:"Modules",Icon:E.a,items:[{name:"meteorological",label:"Meteorological Variables",onClick:T},{name:"crop",label:"Crop Modelling",onClick:T},{name:"indices",label:"Meteorological Indices",onClick:T},{name:"policy",label:"Policy Computation",onClick:T},{name:"climate",label:"Climate",onClick:T},{name:"losses",label:"Losses Computation",onClick:T},{name:"payout",label:"Payout Optimization",onClick:T}]},"divider",{name:"settings",label:"Settings",Icon:_.a,items:[{name:"profile",label:"Profile"},{name:"insurance",label:"Insurance",onClick:T},"divider",{name:"notifications",label:"Notifications",Icon:h.a,items:[{name:"email",label:"Email",onClick:T},{name:"desktop",label:"Desktop",Icon:y.a,items:[{name:"schedule",label:"Schedule",onClick:T},{name:"frequency",label:"Frequency"}]},{name:"sms",label:"SMS"}]}]}];var P=function(){return n.a.createElement("div",null,n.a.createElement(F,{items:D}))},H=t(21),G=t.n(H),V=t(37),z=t(118),W=function(e){function a(e){var t;return Object(c.a)(this,a),(t=Object(s.a)(this,Object(m.a)(a).call(this,e))).state={on:[]},t.toggle=function(e){var a=t.props.single;t.setState((function(t){var l=t.on;return l.includes(e)?{on:a?[]:l.filter((function(a){return a!==e}))}:{on:a?[e]:l.concat(e)}}))},t.isOn=function(e){return t.state.on.includes(e)},t.state={on:e.defaultOn?e.defaultOn:[]},t}return Object(d.a)(a,e),Object(o.a)(a,[{key:"render",value:function(){return this.props.children(Object(z.a)({},this.state,{toggle:this.toggle,isOn:this.isOn}))}}]),a}(n.a.Component);W.defaultProps={single:!0};var J=W,U=function(e){var a=e.n,t=Array(void 0===a?1:a).join("\xa0");return n.a.createElement("span",null,t)};function q(e){var a=Object(L.b)();return 1===e.idValue&&(window.alert("ESTA NOCHE DOY SERRUCHO"),a({type:"SET_10m_COMPONENT_OF_WIND",payload:e.idValue}),console.log("ID VALUE IS :"+e.idValue)),n.a.createElement("p",null)}var X=function(e){return console.log("Arriving Value is :"+e),n.a.createElement("div",null,n.a.createElement(q,{idValue:e}))},B=function(e){function a(e){var t;return Object(c.a)(this,a),(t=Object(s.a)(this,Object(m.a)(a).call(this,e))).myRef=null,t.handleChange=function(e){t.props.onChange(e.target.checked),t.state.currentID=t.props.id,window.alert(t.state.currentID+" "+t.props.label)},t.state={currentID:-1},t}return Object(d.a)(a,e),Object(o.a)(a,[{key:"render",value:function(){var e=this,a=this.props,t=a.id,l=a.checked,i=a.label;return n.a.createElement("div",null,n.a.createElement("label",null,t,n.a.createElement("input",{ref:function(a){return e.myRef=a},type:"checkbox",checked:l,onChange:this.handleChange}),n.a.createElement(U,{n:3}),i),n.a.createElement("div",null,X(this.state.currentID)))}}]),a}(n.a.PureComponent),Y=function(e){function a(){return Object(c.a)(this,a),Object(s.a)(this,Object(m.a)(a).apply(this,arguments))}return Object(d.a)(a,e),Object(o.a)(a,[{key:"sampleFunction",value:function(){window.alert("Que se arme el bailongo")}},{key:"render",value:function(){var e=this.props.items;return n.a.createElement(J,{single:!1},(function(a){var t=a.toggle,l=a.isOn;return e.map((function(e,a){return n.a.createElement("div",null,n.a.createElement(B,Object.assign({checked:l(a),onChange:function(){return t(a)}},e)))}))}))}}]),a}(n.a.PureComponent),Q=function(e){var a=e.id,t=e.label,l=e.checked,i=e.onChange;return n.a.createElement("label",{forHtml:a},n.a.createElement("input",{type:"radio",checked:l,onChange:i}),n.a.createElement(U,{n:3}),t)},Z=function(e){function a(){return Object(c.a)(this,a),Object(s.a)(this,Object(m.a)(a).apply(this,arguments))}return Object(d.a)(a,e),Object(o.a)(a,[{key:"render",value:function(){var e=this.props.items;return n.a.createElement(J,null,(function(a){var t=a.toggle,l=a.isOn;return e.map((function(e,a){return n.a.createElement("div",null,n.a.createElement(Q,Object.assign({checked:l(a),onChange:function(){return t(a)}},e)))}))}))}}]),a}(n.a.PureComponent),$=t(79),K=t.n($),ee=t(38),ae=t.n(ee),te=t(26),le=t(119),ne=t.n(le);t(158);function ie(e,a,t,l){console.log(e.maxLonValue);var i=Object(L.b)();return"undefined"!==typeof e.maxLatValue&&(i({type:"SET_MAX_LAT",payload:e.maxLatValue}),i(function(e){return{type:"SET_MAX_LON",payload:e}}(e.maxLonValue)),i(function(e){return{type:"SET_MIN_LON",payload:e}}(e.minLonValue)),i(function(e){return{type:"SET_MIN_LAT",payload:e}}(e.minLatValue))),n.a.createElement("p",null)}var re=function(e,a,t,l){return n.a.createElement("div",null,n.a.createElement(ie,{maxLatValue:e,minLatValue:a,maxLonValue:t,minLonValue:l}))},ce=function(e){function a(e){var t;return Object(c.a)(this,a),(t=Object(s.a)(this,Object(m.a)(a).call(this,e))).example=1123,t.state={current:1,data:[],countries:[],countriesdict:{},min_lat:[],min_lon:[],max_lat:[],max_lon:[],keys:["a","b","c"],id:[],value:-1,selected:""},t.updateData=t.updateData.bind(Object(te.a)(t)),t._onSelect=t._onSelect.bind(Object(te.a)(t)),t}return Object(d.a)(a,e),Object(o.a)(a,[{key:"_onSelect",value:function(e){var a=this.state.countriesdict[e.label];this.state.current=a,console.log("Happy value = ",a),console.log("You selected ",e.label),console.log("Its index is:",this.state.current),this.setState({selected:e}),console.log("max lat ",this.state.max_lat[this.state.current]),console.log("min lat ",this.state.min_lat[this.state.current]),console.log("max lon ",this.state.max_lon[this.state.current]),console.log("min lon ",this.state.min_lon[this.state.current])}},{key:"componentDidMount",value:function(){var e=t(159);t(160).parse(e,{header:!0,download:!0,skipEmptyLines:!0,transformHeader:function(e){return e.toLowerCase().replace(/\W/g,"_")},complete:this.updateData})}},{key:"updateData",value:function(e){var a=this,t=e.data;e.data.map((function(e,t){a.state.countries[t]=e.country_name.replace(/_/g," "),a.state.max_lat[t]=e.max_lat,a.state.max_lon[t]=e.max_lon,a.state.min_lat[t]=e.min_lat,a.state.min_lon[t]=e.min_lon,a.state.countriesdict[e.country_name.replace(/_/g," ")]=t,a.state.id[t]=e.id})),this.setState({data:t})}},{key:"render",value:function(){return n.a.createElement("div",null,n.a.createElement("div",null,n.a.createElement(ne.a,{options:this.state.countries,onChange:this._onSelect,value:this.state.selected,placeholder:"Please select a Country"})),n.a.createElement("div",null,re(this.state.max_lat[this.state.current],this.state.min_lat[this.state.current],this.state.max_lon[this.state.current],this.state.min_lon[this.state.current])))}}]),a}(l.Component),oe=t(120),se=t.n(oe),me=(t(161),function(e){function a(){var e,t;Object(c.a)(this,a);for(var l=arguments.length,n=new Array(l),i=0;i<l;i++)n[i]=arguments[i];return(t=Object(s.a)(this,(e=Object(m.a)(a)).call.apply(e,[this].concat(n)))).state={startDate:new Date},t.handleChange=function(e){t.setState({startDate:e})},t}return Object(d.a)(a,e),Object(o.a)(a,[{key:"render",value:function(){return n.a.createElement(se.a,{selected:this.state.startDate,onChange:this.handleChange})}}]),a}(n.a.Component));function de(){}function ue(){return be.apply(this,arguments)}function be(){return(be=Object(V.a)(G.a.mark((function e(){var a,t;return G.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={headers:{"Content-Type":"application/json;charset=UTF-8","Access-Control-Allow-Origin":"*",proxy:"false"}},e.next=3,ae.a.post("http://192.168.1.134:8000/meteorologicalVariablesHandler",{firstName:"Fred",lastName:"Flintstone",m_u_component_of_wind:"value",m_v_component_of_wind:"value",m_dewpoint_temperature:"value",m_temperature:"value",surface_net_solar_radiation:"value",total_precipitation:"value",surface_pressure:"value",forecast_albedo:"value",evaporation_from_bare_soil:"value",evaporation_from_open_water_surfaces_excluding_oceans:"value",evaporation_from_the_top_of_canopy:"value",evaporation_from_vegetation_transpiration:"value",lake_bottom_temperature:"value",lake_ice_depth:"value",lake_ice_temperature:"value",lake_mix_layer_depth:"value",lake_mix_layer_temperature:"value",lake_shape_factor:"value",lake_total_layer_temperature:"value",leaf_area_index_high_vegetation:"value",leaf_area_index_low_vegetation:"value",potential_evaporation:"value",runoff:"value",skin_reservoir_content:"value",skin_temperature:"value",snow_albedo:"value",snow_cover:"value",snow_density:"value",snow_depth:"value",snow_depth_water_equivalent:"value",snow_evaporation:"value",snowfall:"value",snowmelt:"value",soil_temperature_level_1:"value",soil_temperature_level_2:"value",soil_temperature_level_3:"value",soil_temperature_level_4:"value",sub_surface_runoff:"value",surface_latent_heat_flux:"value",surface_net_thermal_radiation:"value",surface_runoff:"value",surface_sensible_heat_flux:"value",surface_solar_radiation_downwards:"value",surface_thermal_radiation_downwards:"value",temperature_of_snow_layer:"value",total_evaporation:"value",volumetric_soil_water_layer_1:"value",volumetric_soil_water_layer_2:"value",volumetric_soil_water_layer_3:"value",volumetric_soil_water_layer_4:"valueFinal"},a);case 3:t=e.sent,console.log(t.data);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var pe=function(){var e=Object(L.c)((function(e){return e.min_lon})),a=Object(L.c)((function(e){return e.max_lon})),t=Object(L.c)((function(e){return e.min_lat})),l=Object(L.c)((function(e){return e.max_lat}));return n.a.createElement("div",null,n.a.createElement("div",null,n.a.createElement("div",{className:"variables"},n.a.createElement("h3",null,"ERA5Land (ECMWF)"),n.a.createElement(M.a,{style:{margin:"6px 0"}}),n.a.createElement("div",{className:"blockVariables"},n.a.createElement(Y,{items:[{id:1,label:"10m u-component of wind"},{id:2,label:"10m v-component of wind"},{id:3,label:"2m dewpoint temperature"},{id:4,label:"2m temperature"},{id:5,label:"Evaporation from bare soil"},{id:6,label:"Evaporation from open water surfaces excluding oceans"},{id:7,label:"Evaporation from the top of canopy"},{id:8,label:"Evaporation from vegetation transpiration"},{id:9,label:"Forecast albedo"},{id:10,label:"Lake bottom temperature"},{id:11,label:"Lake ice depth"},{id:12,label:"Lake ice temperature"},{id:13,label:"Lake mix-layer depth"},{id:14,label:"Lake mix-layer temperature"},{id:15,label:"Lake shape factor"},{id:16,label:"Lake total layer temperature"},{id:17,label:"Leaf area index, high vegetation"},{id:18,label:"Leaf area index, low vegetation"},{id:19,label:"Potential evaporation"},{id:20,label:"Runoff"},{id:21,label:"Skin reservoir content"},{id:22,label:"Skin temperature"},{id:23,label:"Snow albedo"},{id:24,label:"Snow cover"},{id:25,label:"Snow density"},{id:26,label:"Snow depth"},{id:27,label:"Snow depth water equivalent"},{id:28,label:"Snow evaporation"},{id:29,label:"Snowfall"},{id:30,label:"Snowmelt"},{id:31,label:"Soil temperature level 1"},{id:32,label:"Soil temperature level 2"},{id:33,label:"Soil temperature level 3"},{id:34,label:"Soil temperature level 4"},{id:35,label:"Sub-surface runoff"},{id:36,label:"Surface latent heat flux"},{id:37,label:"Surface net solar radiation"},{id:38,label:"Surface net thermal radiation"},{id:39,label:"Surface pressure"},{id:40,label:"Surface runoff"},{id:41,label:"Surface sensible heat flux"},{id:42,label:"Surface solar radiation downwards"},{id:43,label:"Surface thermal radiation downwards"},{id:44,label:"Temperature of snow layer"},{id:45,label:"Total evaporation"},{id:46,label:"Total precipitation"},{id:47,label:"Volumetric soil water layer 1"},{id:48,label:"Volumetric soil water layer 2"},{id:49,label:"Volumetric soil water layer 3"},{id:50,label:"Volumetric soil water layer 4"},{id:51,label:"Select All"}]})),n.a.createElement(M.a,{style:{margin:"6px 0"}})),n.a.createElement("div",{className:"precipitation"},n.a.createElement("div",{className:"blockPrecipitation"},n.a.createElement("h3",null,"Precipitation Datasets"),n.a.createElement(Z,{items:[{id:1,label:"CHIRPS"},{id:2,label:"CMORPH"},{id:3,label:"ARC 2"},{id:4,label:"RFE"}]})),n.a.createElement(M.a,{style:{margin:"6px 0"}})),n.a.createElement("div",{className:"processed"},n.a.createElement("div",{className:"blockProcessed"},n.a.createElement("h3",null,"Processed Variables"),n.a.createElement(Y,{items:[{id:1,label:"Potential Evapotranspiration"},{id:2,label:"Onset of Planting date"},{id:3,label:"Soil Moisture"},{id:4,label:"Select All"}],onChange:void 0})),n.a.createElement(M.a,{style:{margin:"6px 0"}})),n.a.createElement("div",{className:"result"},n.a.createElement(ce,null)),n.a.createElement("div",{className:"coordinates"},n.a.createElement("h1",null,"Coordinates"),n.a.createElement(M.a,{style:{margin:"6px 0"}}),n.a.createElement("form",{className:"standardForm"},n.a.createElement("label",null,"Minimum Longitude:",n.a.createElement("input",{type:"text",value:e,name:"Minimum Longitude",onChange:de}),n.a.createElement("br",null),"Maximum Longitude:",n.a.createElement("input",{type:"text",value:a,name:"Minimum Longitude",onChange:de}),n.a.createElement("br",null),"Minimum Latitude:",n.a.createElement("input",{type:"text",value:t,name:"Minimum Longitude",onChange:de}),n.a.createElement("br",null),"Maximum Latitude:",n.a.createElement("input",{type:"text",value:l,name:"Minimum Longitude",onChange:de}),n.a.createElement("br",null))),n.a.createElement(M.a,{style:{margin:"6px 0"}})),n.a.createElement("div",{className:"period"},n.a.createElement("h1",null,"Period"),n.a.createElement("p",null,"Start Date: "),n.a.createElement(M.a,{style:{margin:"6px 0"}}),n.a.createElement(me,null),n.a.createElement(M.a,{style:{margin:"6px 0"}}),n.a.createElement("p",null,"End Date: "),n.a.createElement(me,null),n.a.createElement(M.a,{style:{margin:"6px 0"}})),n.a.createElement("div",{className:"myButton"},n.a.createElement("button",{onClick:ue}," RUN "))))},Ee=function(e){function a(){return Object(c.a)(this,a),Object(s.a)(this,Object(m.a)(a).apply(this,arguments))}return Object(d.a)(a,e),Object(o.a)(a,[{key:"render",value:function(){return n.a.createElement("div",null,n.a.createElement("div",null,n.a.createElement("div",{className:"indexType"},n.a.createElement("div",{className:"block"},n.a.createElement("h3",null,"Index Type"),n.a.createElement(Y,{items:[{id:1,label:"Drought Index"},{id:2,label:"Excess Rainfall"},{id:3,label:"Excess Temperature"},{id:4,label:"Random Deficit Index"},{id:5,label:"Excess wind /  Wind Gusts"},{id:6,label:"Soil Moisture Index"},{id:7,label:"Hybrid Drought Index"},{id:8,label:"Select All"}]})),n.a.createElement(M.a,{style:{margin:"6px 0"}})),n.a.createElement("div",{className:"precipitation"},n.a.createElement("div",{className:"block"},n.a.createElement("h3",null,"Precipitation Datasets"),n.a.createElement(Z,{items:[{id:11,label:"CHIRPS"},{id:12,label:"CMORPH"},{id:13,label:"ARC 2"},{id:14,label:"RFE"}]})),n.a.createElement(M.a,{style:{margin:"6px 0"}})),n.a.createElement("div",{className:"coordinates"},n.a.createElement("h1",null,"Computation Files"),n.a.createElement("p",null,"Crop Type"),n.a.createElement("p",null,"Weather"),n.a.createElement("p",null,"Locations"),n.a.createElement(M.a,{style:{margin:"6px 0"}})),n.a.createElement("div",{className:"myButton"},n.a.createElement("button",null," RUN "))))}}]),a}(l.Component);var ve=function(){return n.a.createElement("div",{className:"container"},n.a.createElement(K.a,{cssClass:"react-csv-input",onFileLoaded:function(e,a){return console.dir(e,a)},parserOptions:{header:!0,dynamicTyping:!0,skipEmptyLines:!0,transformHeader:function(e){return e.toLowerCase().replace(/\W/g,"_")}}}))},he=function(e){function a(){return Object(c.a)(this,a),Object(s.a)(this,Object(m.a)(a).apply(this,arguments))}return Object(d.a)(a,e),Object(o.a)(a,[{key:"render",value:function(){return n.a.createElement("div",null,n.a.createElement("div",null,n.a.createElement("div",{className:"indexType"},n.a.createElement("div",{className:"block"},n.a.createElement("h3",null,"Index Type"),n.a.createElement(Y,{items:[{id:1,label:"Drought Coverage"},{id:2,label:"Excess Rainfall Coverage"},{id:3,label:"Excess Temperature Coverage"},{id:4,label:"Random Deficit Coverage"},{id:5,label:"Excess wind /  Wind Gusts Coverage"},{id:6,label:"Soil Moisture Index Coverage"},{id:7,label:"Hybrid Drought Index Coverage"},{id:8,label:"Select All"}]})),n.a.createElement(M.a,{style:{margin:"6px 0"}})),n.a.createElement("div",{className:"precipitation"},n.a.createElement("div",{className:"block"},n.a.createElement("h3",null,"Exposure Characteristics"),n.a.createElement("p",null,"Acreage File"),n.a.createElement("p",null,"Exposure File"),n.a.createElement("p",null,"Income File"),n.a.createElement("p",null,"Crop Price File")),n.a.createElement(M.a,{style:{margin:"6px 0"}})),n.a.createElement("div",{className:"coordinates"},n.a.createElement("h1",null,"Input Files"),n.a.createElement("p",null,"Indices File 1"),n.a.createElement(ve,null),n.a.createElement("p",null,"Indices File 2"),n.a.createElement("p",null,"Indices File 3"),n.a.createElement(M.a,{style:{margin:"6px 0"}})),n.a.createElement("div",{className:"myButton"},n.a.createElement("button",null," RUN "))))}}]),a}(l.Component),fe=function(e){function a(){return Object(c.a)(this,a),Object(s.a)(this,Object(m.a)(a).apply(this,arguments))}return Object(d.a)(a,e),Object(o.a)(a,[{key:"render",value:function(){return n.a.createElement("div",null,n.a.createElement("div",null,n.a.createElement("h3",null,"Crop Model"),n.a.createElement(M.a,{style:{margin:"6px 0"}}),n.a.createElement("div",{className:"cropModel"},n.a.createElement(Y,{items:[{id:1,label:"DSSAT"},{id:2,label:"EPIC"},{id:3,label:"APSIM"},{id:4,label:"SARAH-H"},{id:5,label:"SARAH-O"},{id:6,label:"STICS"},{id:7,label:"WRSI"},{id:8,label:"AQUACROP"},{id:9,label:"Select All"}]}),n.a.createElement(M.a,{style:{margin:"6px 0"}})),n.a.createElement("div",{className:"soilDataset"},n.a.createElement("h3",null,"Soil dataset"),n.a.createElement(M.a,{style:{margin:"6px 0"}}),n.a.createElement(Z,{items:[{id:1,label:"IIASA"},{id:2,label:"MRDC"}]}),n.a.createElement(M.a,{style:{margin:"6px 0"}})),n.a.createElement("div",{className:"calibration"},n.a.createElement("h3",null,"Calibration Files"),n.a.createElement(M.a,{style:{margin:"6px 0"}}),n.a.createElement("div",{className:"csv"},n.a.createElement("h1",null,"Fertilizer"),n.a.createElement(M.a,{style:{margin:"6px 0"}})),n.a.createElement("p",null,"Fertilizer"),n.a.createElement("p",null,"Planting Method"),n.a.createElement("p",null,"Planting Density"),n.a.createElement(M.a,{style:{margin:"6px 0"}})),n.a.createElement("div",{className:"management"},n.a.createElement("h3",null,"Management Scenario"),n.a.createElement(M.a,{style:{margin:"6px 0"}}),n.a.createElement("p",null,"Intercropping"),n.a.createElement("p",null,"Rotation"),n.a.createElement("p",null,"Tillage"),n.a.createElement(M.a,{style:{margin:"6px 0"}})),n.a.createElement("div",{className:"agroMeteorological"},n.a.createElement("h3",null,"Agro-meteorological datasets"),n.a.createElement(M.a,{style:{margin:"6px 0"}}),n.a.createElement("p",null,"Meteorological variables dataset"),n.a.createElement(M.a,{style:{margin:"6px 0"}})),n.a.createElement("h3",null,"Crop Type"),n.a.createElement(M.a,{style:{margin:"6px 0"}}),n.a.createElement("div",{className:"cropModel"},n.a.createElement(Y,{items:[{id:1,label:"Maize"},{id:2,label:"Sweet maize"},{id:3,label:"Rice"},{id:4,label:"Wheat"},{id:2,label:"Sunflower"},{id:3,label:"Tobacco"},{id:4,label:"Soybean"},{id:2,label:"Sugar cane"}]}),n.a.createElement(M.a,{style:{margin:"6px 0"}})),n.a.createElement("div",{className:"myButton"},n.a.createElement("button",null," RUN "))))}}]),a}(l.Component),ye=t(122),ge=function(e){function a(e){var t;return Object(c.a)(this,a),(t=Object(s.a)(this,Object(m.a)(a).call(this,e))).myJson={Analyst:{name:"Jack",email:"jack@xyz.com"},"Loaded by":"Jills","Load id":34,"git id":"xxqaygqertqsg98qhpughqer","Analysis Id":"7asdlnagsd98gfaqsgf","Load Date":"July 12, 2018","Data Source":"Study XY123-456","Jira Ticket":"Foo-1","Confluence URL":"http://myserver/wxyz","Study sponsors":[{name:"john",email:"john@@xyz.com"},{name:"jane",email:"jane@@xyz.com"}]},t.items=[{name:"Louise",age:27,color:"red"},{name:"Margaret",age:15,color:"blue"},{name:"Lisa",age:34,color:"yellow"},{Analyst:{name:"Jack",email:"jack@xyz.com"},"Loaded by":"Jills","Load id":34,"git id":"xxqaygqertqsg98qhpughqer","Analysis Id":"7asdlnagsd98gfaqsgf","Load Date":"July 12, 2018","Data Source":"Study XY123-456","Jira Ticket":"Foo-1","Confluence URL":"http://myserver/wxyz","Study sponsors":[{name:"john",email:"john@@xyz.com"},{name:"jane",email:"jane@@xyz.com"}]}],t.state={data:{}},t}return Object(d.a)(a,e),Object(o.a)(a,[{key:"getJson",value:function(){var e=Object(V.a)(G.a.mark((function e(){var a;return G.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ae.a.get("https://dog.ceo/api/breeds/list/all");case 2:a=e.sent,this.data=JSON.stringify(a.data),console.log(this.data);case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return this.getJson(),n.a.createElement("div",null,n.a.createElement("div",{className:"policyFile"},n.a.createElement("h3",null,"Policy File"),n.a.createElement(M.a,{style:{margin:"6px 0"}}),n.a.createElement("p",null,"Input File"),n.a.createElement(M.a,{style:{margin:"6px 0"}})),n.a.createElement("div",null,n.a.createElement("p",null,"Aqui va el resultado del JSON"),n.a.createElement("div",null,n.a.createElement(ye.JsonToTable,{json:this.items}))),n.a.createElement("div",{className:"myButton"},n.a.createElement("button",null," RUN ")))}}]),a}(l.Component),_e=function(e){function a(){return Object(c.a)(this,a),Object(s.a)(this,Object(m.a)(a).apply(this,arguments))}return Object(d.a)(a,e),Object(o.a)(a,[{key:"render",value:function(){return n.a.createElement("div",null,n.a.createElement("div",null,n.a.createElement("div",{className:"highResolutionRemote"},n.a.createElement("h3",null,"High Resolution Remote Sensing"),n.a.createElement(M.a,{style:{margin:"6px 0"}}),n.a.createElement(Y,{items:[{id:1,label:"Sentinel2A"},{id:2,label:"MODIS"},{id:3,label:"GaoFeng2"},{id:4,label:"GoogleEarth"},,{id:5,label:"Select All"}]}),n.a.createElement(M.a,{style:{margin:"6px 0"}})),n.a.createElement("div",{className:"farmCrop"},n.a.createElement("h3",null,"Farm-level Crop Yield Computations"),n.a.createElement(M.a,{style:{margin:"6px 0"}}),n.a.createElement(Z,{items:[{id:1,label:"Maize"},{id:2,label:"Sweet maize"},{id:3,label:"Rice"},{id:4,label:"Wheat"},{id:2,label:"Sunflower"},{id:3,label:"Tobacco"},{id:4,label:"Soybean"},{id:2,label:"Sugar cane"}]}),n.a.createElement(M.a,{style:{margin:"6px 0"}})),n.a.createElement("div",{className:"computations"},n.a.createElement("h3",null,"Computations"),n.a.createElement(M.a,{style:{margin:"6px 0"}}),n.a.createElement("p",null,"Plot Mapping"),n.a.createElement("p",null,"Crop Recognition"),n.a.createElement("p",null,"Crop Yield"),n.a.createElement("p",null,"Payout Optimization"),n.a.createElement(M.a,{style:{margin:"6px 0"}})),n.a.createElement("div",{className:"policy"},n.a.createElement("h3",null,"Policy"),n.a.createElement(M.a,{style:{margin:"6px 0"}}),n.a.createElement("p",null,"Policy File"),n.a.createElement("p",null,"Loss File"),n.a.createElement(M.a,{style:{margin:"6px 0"}})),n.a.createElement("div",{className:"myButton"},n.a.createElement("button",null," RUN "))))}}]),a}(l.Component);function xe(){return Ce.apply(this,arguments)}function Ce(){return(Ce=Object(V.a)(G.a.mark((function e(){var a,t;return G.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={headers:{"Content-Type":"application/json;charset=UTF-8","Access-Control-Allow-Origin":"*",proxy:"false"}},e.next=3,ae.a.post("http://192.168.1.134:8000/climateVariablesHandler",{firstName:"Fred",lastName:"Flintstone"},a);case 3:t=e.sent,console.log(t.data);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Se(){return Oe.apply(this,arguments)}function Oe(){return(Oe=Object(V.a)(G.a.mark((function e(){var a,t;return G.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={headers:{"Content-Type":"application/json;charset=UTF-8","Access-Control-Allow-Origin":"*",proxy:"false"}},e.next=3,ae.a.post("http://192.168.1.134:8000/climateIndicesHandler",{firstName:"Fred",lastName:"Flintstone"},a);case 3:t=e.sent,console.log(t.data);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var Me=function(e){function a(){return Object(c.a)(this,a),Object(s.a)(this,Object(m.a)(a).apply(this,arguments))}return Object(d.a)(a,e),Object(o.a)(a,[{key:"testChange",value:function(){window.alert("Im a test"),console.log("TESTING CHAAANGE")}},{key:"render",value:function(){return n.a.createElement("div",null,n.a.createElement("div",null,n.a.createElement("div",{className:"project"},n.a.createElement("h3",null,"Project"),n.a.createElement(M.a,{style:{margin:"6px 0"}}),n.a.createElement(Z,{items:[{id:1,label:"CMIP5"},{id:2,label:"CMIP6"}]}),n.a.createElement(M.a,{style:{margin:"6px 0"}})),n.a.createElement("div",null,n.a.createElement("h3",null,"Model"),n.a.createElement(M.a,{style:{margin:"6px 0"}})),n.a.createElement("div",{className:"model"},n.a.createElement(Y,{items:[{id:1,label:"ACCESS1.0"},{id:2,label:"ACCESS1.3"},{id:3,label:"CCSM4 (2)"},{id:4,label:"CFSv2-2011"},{id:5,label:"CMCC-CESM"},{id:6,label:"CMCC-CM"},{id:7,label:"CMCC-CMS"},{id:8,label:"CNRM-CM5"},{id:9,label:"CNRM-CM5-2"},{id:10,label:"CSIRO-Mk3.6.0"},{id:11,label:"CSIRO-Mk3L-1-2"},{id:12,label:"CanAM4"},{id:13,label:"CanCM4"},{id:14,label:"CanESM2"},{id:15,label:"EC-EARTH"},{id:16,label:"FGOALS-g2"},{id:17,label:"FGOALS-gl"},{id:18,label:"FGOALS-s2"},{id:19,label:"GEOS-5"},{id:20,label:"GFDL-CM2.1"},{id:21,label:"GFDL-CM3"},{id:22,label:"GFDL-ESM2G"},{id:23,label:"GFDL-ESM2M"},{id:24,label:"GFDL-HIRAM-C180"},{id:25,label:"GFDL-HIRAM-C360"},{id:26,label:"GISS-E2-H"},{id:27,label:"GISS-E2-H-CC"},{id:28,label:"GISS-E2-R"},{id:29,label:"GISS-E2-R-CC"},{id:30,label:"HadCM3"},{id:31,label:"HadGEM2-A"},{id:32,label:"HadGEM2-AO"},{id:33,label:"HadGEM2-CC"},{id:34,label:"HadGEM2-ES"},{id:35,label:"INM-CM4"},{id:36,label:"IPSL-CM5A-LR"},{id:37,label:"IPSL-CM5A-MR"},{id:38,label:"IPSL-CM5B-LR"},{id:39,label:"MIROC-ESM"},{id:40,label:"MIROC-ESM-CHEM"},{id:41,label:"MIROC4h"},{id:42,label:"MIROC5"},{id:43,label:"MPI-ESM-LR"},{id:44,label:"MPI-ESM-MR"},{id:45,label:"MPI-ESM-P"},{id:46,label:"MRI-AGCM3.2H"},{id:47,label:"MRI-AGCM3.2S"},{id:48,label:"MRI-CGCM3"},{id:49,label:"MRI-ESM1"},{id:50,label:"NICAM-09"},{id:51,label:"NorESM1-M"},{id:52,label:"NorESM1-ME"}],onChange:this.testChange}),n.a.createElement(M.a,{style:{margin:"6px 0"}})),n.a.createElement("div",null,n.a.createElement("h3",null,"Experiment"),n.a.createElement(M.a,{style:{margin:"6px 0"}})),n.a.createElement("div",{className:"experiment"},n.a.createElement(Y,{items:[{id:1,label:"historical"},{id:2,label:"historicalExt"},{id:3,label:"historicalGHG"},{id:4,label:"historicalMisc"},{id:5,label:"historicalNat"},{id:6,label:"rcp26"},{id:7,label:"rcp45"},{id:8,label:"rcp60"},{id:9,label:"rcp85"}]}),n.a.createElement(M.a,{style:{margin:"6px 0"}})),n.a.createElement("div",null,n.a.createElement("h3",null,"Variables"),n.a.createElement(M.a,{style:{margin:"6px 0"}})),n.a.createElement("div",{className:"variable"},n.a.createElement(Y,{items:[{id:1,label:"albisccp"},{id:2,label:"albs"},{id:3,label:"ccb"},{id:4,label:"cct"},{id:5,label:"cl"},{id:6,label:"clcalipso"},{id:7,label:"clhcalipso"},{id:8,label:"cli"},{id:9,label:"cliscsp"},{id:10,label:"clivi"},{id:11,label:"cllcalipso"},{id:12,label:"clmcalipso"},{id:13,label:"clt"},{id:14,label:"cltcalipso"},{id:15,label:"cltiscsp"},{id:16,label:"clw"},{id:17,label:"clwvi"},{id:18,label:"hfls"},{id:19,label:"hfss"},{id:20,label:"hur"},{id:21,label:"hus"},{id:22,label:"huss"},{id:23,label:"mc"},{id:24,label:"mrro"},{id:25,label:"mrros"},{id:26,label:"mrsos"},{id:27,label:"omldamax"},{id:28,label:"orog"},{id:29,label:"parasol"},{id:30,label:"Refl"},{id:31,label:"pctiscsp"},{id:32,label:"pfull"},{id:33,label:"phalf"},{id:34,label:"pr"},{id:35,label:"prc"},{id:36,label:"prsm"},{id:37,label:"ps"},{id:38,label:"psl"},{id:39,label:"rhs"},{id:40,label:"rhsmax"},{id:41,label:"rhsmin"},{id:42,label:"rlds"},{id:43,label:"rldscs"},{id:44,label:"rlus"},{id:45,label:"rlut"},{id:46,label:"rlutcs"},{id:47,label:"rsds"},{id:48,label:"rsdscs"},{id:49,label:"rsdt"},{id:50,label:"rsus"},{id:51,label:"rsuscs"},{id:52,label:"rsut"},{id:27,label:"omldamax"},{id:28,label:"orog"},{id:29,label:"parasol"},{id:30,label:"Refl"},{id:31,label:"pctiscsp"},{id:32,label:"pfull"},{id:33,label:"phalf"},{id:34,label:"pr"},{id:35,label:"prc"},{id:36,label:"prsm"},{id:37,label:"ps"},{id:38,label:"psl"},{id:39,label:"rhs"},{id:40,label:"rhsmax"},{id:41,label:"rhsmin"},{id:42,label:"rlds"},{id:43,label:"rldscs"},{id:44,label:"rlus"},{id:45,label:"rlut"},{id:46,label:"rlutcs"},{id:47,label:"rsds"},{id:48,label:"rsdscs"},{id:49,label:"rsdt"},{id:50,label:"rsus"},{id:51,label:"rsuscs"},{id:52,label:"rsut"},{id:53,label:"rsutcs"},{id:54,label:"sfcWind"},{id:55,label:"sfcWindmax"},{id:56,label:"sic"},{id:57,label:"sit"},{id:58,label:"snc"},{id:59,label:"snd"},{id:60,label:"snw"},{id:61,label:"swit"},{id:62,label:"ta"},{id:63,label:"ta700"},{id:64,label:"tas"},{id:65,label:"tasmax"},{id:66,label:"tasmin"},{id:67,label:"tos"},{id:68,label:"tossq"},{id:69,label:"ts"},{id:70,label:"tslsi"},{id:71,label:"ua"},{id:72,label:"uas"},{id:73,label:"usi"},{id:74,label:"va"},{id:75,label:"vas"},{id:76,label:"vsi"},{id:77,label:"wap"},{id:78,label:"wap500"},{id:79,label:"zg"}]}),n.a.createElement(M.a,{style:{margin:"6px 0"}}),n.a.createElement("div",{className:"myButton"},n.a.createElement("button",{onClick:xe}," RUN! "))),n.a.createElement("div",null,n.a.createElement("h3",null,"Climate Indices"),n.a.createElement(M.a,{style:{margin:"6px 0"}})),n.a.createElement("div",{className:"variable"},n.a.createElement(Y,{items:[{id:1,label:"AEJ"},{id:2,label:"DCI"},{id:3,label:"IOD"},{id:4,label:"E5w"},{id:5,label:"NAO"},{id:6,label:"NINO3/4/1-2/3-4"},{id:7,label:"PWE"},{id:8,label:"SIW"},{id:9,label:"SOI"},{id:10,label:"STA"},{id:11,label:"UEQ"},{id:12,label:"W5w"},{id:13,label:"WAMI"}]}),n.a.createElement(M.a,{style:{margin:"6px 0"}})),n.a.createElement("div",{className:"myButton"},n.a.createElement("button",{onClick:Se}," RUN! "))))}}]),a}(l.Component);t(223);var we=function(){var e,a=Object(L.c)((function(e){return e.moduleSelection}));return n.a.createElement("div",{className:"activeModule"},n.a.createElement("div",null,0===(e=a)?n.a.createElement("div",null,n.a.createElement(pe,null)):1===e?n.a.createElement("div",null,n.a.createElement(fe,null)):2===e?n.a.createElement("div",null,n.a.createElement(Ee,null)):3===e?n.a.createElement("div",null,n.a.createElement(he,null)):4===e?n.a.createElement("div",null,n.a.createElement(Me,null)):5===e?n.a.createElement("div",null,n.a.createElement(ge,null)):6===e?n.a.createElement("div",null,n.a.createElement(_e,null)):void 0))},je=t(90),Ne=t.n(je);Ne.a.accessToken="pk.eyJ1IjoibGlnaHRidXJuIiwiYSI6ImNpeXViOGptcDAwMmYzMmxmZml6am0xZG0ifQ.FiaHv8Pwcxr_LyuxMtry3w";var ke=function(e){function a(e){var t;return Object(c.a)(this,a),(t=Object(s.a)(this,Object(m.a)(a).call(this,e))).state={activate:null},t.clickActivate=function(){t.setState({activate:"/item41/a"})},t.state={lng:5,lat:34,zoom:1.5},t}return Object(d.a)(a,e),Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=this,a=this.state,t=a.lng,l=a.lat,n=a.zoom;this.map=new Ne.a.Map({container:this.mapContainer,style:"mapbox://styles/mapbox/satellite-streets-v9",center:[t,l],zoom:n}),this.map.on("move",(function(){var a=e.map.getCenter(),t=a.lng,l=a.lat;e.setState({lng:t.toFixed(4),lat:l.toFixed(4),zoom:e.map.getZoom().toFixed(2)})}))}},{key:"render",value:function(){var e=this,a=this.state,t=a.lng,l=a.lat,i=a.zoom;return n.a.createElement("div",null,n.a.createElement("div",{className:"mapTextContainer"},n.a.createElement("div",null,"Longitude: ".concat(t," Latitude: ").concat(l," Zoom: ").concat(i))),n.a.createElement("div",{ref:function(a){return e.mapContainer=a},className:"mapContainer"}))}}]),a}(n.a.Component),Ie=function(e){function a(){return Object(c.a)(this,a),Object(s.a)(this,Object(m.a)(a).apply(this,arguments))}return Object(d.a)(a,e),Object(o.a)(a,[{key:"render",value:function(){return n.a.createElement("div",{className:"baseWrapper"},n.a.createElement("div",{className:"mapWrapper"},n.a.createElement(ke,null)),n.a.createElement("div",{className:"flexLeft"},n.a.createElement("div",{className:"leftOverlay"},n.a.createElement(P,null)),n.a.createElement("div",{className:"moduleOverlay"},n.a.createElement(we,null))))}}]),a}(l.Component);var Le=function(){return n.a.createElement("div",null,n.a.createElement(Ie,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Ae=t(46),Re=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"SET":return a.payload;default:return e}},Fe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"SET":default:return e}},Te=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-10,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"SET_MAX_LON":return a.payload;default:return e}},De=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-9,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"SET_MAX_LAT":return a.payload;default:return e}},Pe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-8,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"SET_MIN_LON":return a.payload;default:return e}},He=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-7,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"SET_MIN_LAT":return a.payload;default:return e}},Ge=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-11,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"SET_10m_COMPONENT_OF_WIND":return a.payload;default:return e}},Ve=Object(Ae.b)({moduleSelection:Re,dummy:Fe,min_lon:Pe,max_lon:Te,max_lat:De,min_lat:He,met_10m_u_component_of_wind:Ge,other:Ge}),ze=Object(Ae.c)(Ve,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());r.a.render(n.a.createElement(L.a,{store:ze},n.a.createElement(Le,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},93:function(e,a,t){}},[[126,1,2]]]);
//# sourceMappingURL=main.b193aed5.chunk.js.map