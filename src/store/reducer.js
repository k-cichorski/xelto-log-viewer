export const initialState = {
    searchResults: null,
    selectedResult: null
};

export const fillResults = 'fillResults';
export const selectResult = 'selectResult';

function reducer(state, action) {
    switch(action.type){
        case fillResults:
            return {
                ...state,
                searchResults: action.payload
            }

        case selectResult:
            let selected = state.searchResults?.find(element => element.Id === action.payload);
            return {
                ...state,
                selectedResult: selected
            }

        default:
            return state;
    }
}

export default reducer;
