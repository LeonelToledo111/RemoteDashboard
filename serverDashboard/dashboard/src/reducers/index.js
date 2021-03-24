import selectionReducer from './setModuleSelection';
import dummyReducer from './dummyReducer';
import coordinateReducer from './coordinateReducer'
import coordMaxLat from './coordMaxLat'
import coordMinLon from './coordMinLon'
import coordMinLat from './coordMinLat'
import met_10m_u_component_of_wind_Reducer from './meteorologicalVariablesReducer'
import otherThing from './meteorologicalVariablesReducer'
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    moduleSelection: selectionReducer,
    dummy: dummyReducer,
    min_lon: coordMinLon,
    max_lon: coordinateReducer,
    max_lat: coordMaxLat,
    min_lat: coordMinLat,
    met_10m_u_component_of_wind: met_10m_u_component_of_wind_Reducer,
    other: otherThing,

});

export default allReducers; 