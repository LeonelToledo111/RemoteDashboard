const countryReducer = (state =-10, action) => {

    switch(action.type){
        case 'SET_COUNTRY_ID':
            return action.payload;
        default:
            return state;
    }

};

export default countryReducer;