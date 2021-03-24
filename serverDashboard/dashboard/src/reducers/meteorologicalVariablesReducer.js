export const met_10m_u_component_of_wind_Reducer = (state = -11, action) => {

    switch(action.type){
        case 'SET_10m_COMPONENT_OF_WIND':
            return action.payload;
        default:
            return state;
    }

};

export const otherThing = (state = 12, action) => {

    switch(action.type){
        case 'SET_OTHER':
            return state;
        default:
            return state;
    }

};

export default met_10m_u_component_of_wind_Reducer;