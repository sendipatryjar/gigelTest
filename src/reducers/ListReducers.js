import { 
    LIST,
    LIST_FAIL,
    LIST_SUCCESS,
    LOAD_MORE
 } from '../values/types';


 const INITIAL_STATE = { 
    listNews: [],
    error: '',
    loading: false,
    loadingLoadmore: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LIST_SUCCESS:
            return { ...state, error: '', listNews: action.payload, loading: false, loadingLoadmore: false };
        case LIST_FAIL:
            return { ...state, error: action.payload, listNews: [], loading: false, loadingLoadmore: false };
        case LIST:
            return { ...state, loading: true,  error: '' };
        case LOAD_MORE:
            return { ...state, loading: false, loadingLoadmore: true,  error: ''  };
        default:
            return state;
    }
};