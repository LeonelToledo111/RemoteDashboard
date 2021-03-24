const coordinateReducer = (state =-10, action) => {

    switch(action.type){
        case 'SET_MAX_LON':
            return action.payload;
        default:
            return state;
    }

};

export default coordinateReducer;