const setModuleReducer = (state = -1, action) => {

    switch(action.type){
        case 'SET':
            return action.payload;

        default:
            return state;
    }

};

export default setModuleReducer;