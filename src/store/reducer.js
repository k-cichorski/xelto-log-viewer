export const initialState = {
    searchResults: null,
    selectedResult: null,
    loadingData: false
};

export const fillResults = 'fillResults';
export const selectResult = 'selectResult';
export const toggleLoadingAnimation = 'toggleLoadingAnimation';

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

        case toggleLoadingAnimation:
            return {
                ...state,
                loadingData: !state.loadingData
            }

        default:
            return state;
    }
}

export default reducer;
