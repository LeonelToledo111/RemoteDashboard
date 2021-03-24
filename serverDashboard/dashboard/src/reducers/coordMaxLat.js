const coordMaxLat = (state =-9, action) => {

    switch(action.type){
        case 'SET_MAX_LAT':
            return action.payload;

        default:
            return state;
    }

};

export default coordMaxLat;