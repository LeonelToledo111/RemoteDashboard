const coordMinLon = (state =-8, action) => {

    switch(action.type){
        case 'SET_MIN_LON':
            return action.payload;

        default:
            return state;
    }

};

export default coordMinLon;