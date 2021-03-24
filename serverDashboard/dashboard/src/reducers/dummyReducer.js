const dummyReducer = (state = -1, action) => {

    switch(action.type){
        case 'SET':
            return state;
        default:
            return state;
    }

};

export default dummyReducer;