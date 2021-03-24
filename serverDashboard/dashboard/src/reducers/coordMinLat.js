const coordMinLat = (state =-7, action) => {

    switch(action.type){
        case 'SET_MIN_LAT':
            return action.payload;

        default:
            return state;
    }

};

export default coordMinLat;