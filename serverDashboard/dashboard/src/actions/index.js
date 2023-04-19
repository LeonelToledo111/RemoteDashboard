export const setValue = (value) => {
    return {
        type: 'SET',
        payload: value
    };
};

export const setMinLon = (value) =>{

    return {
        type: 'SET_MIN_LON',
        payload: value
    };
   
};

export const setMaxLon = (value) =>{

    return {
        type: 'SET_MAX_LON',
        payload: value
    };
   
};

export const setMinLat = (value) =>{

    return {
        type: 'SET_MIN_LAT',
        payload: value
    };
   
};

export const setMaxLat = (value) =>{

    return {
        type: 'SET_MAX_LAT',
        payload: value
    };
   
};

export const setCountryID = (value) =>{

    return {
        type: 'SET_COUNTRY_ID',
        payload: value
    };
   
};

export const set_met_10m_u_component_of_wind = (value) =>{

    return {
        type: 'SET_10m_COMPONENT_OF_WIND',
        payload: value
    };
   
};

export const set_other = (value) =>{

    return {
        type: 'SET_OTHER',
        payload: value
    };
   
};




