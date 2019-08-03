import axios from 'axios';
import { 
    LIST,
    LIST_FAIL,
    LIST_SUCCESS,
    LOAD_MORE
 } from '../values/types';

 import ENVIRONMENT from '../config/environtment';

 export const loadmore = (page) => {
    return (dispatch) => {
        dispatch({ type: LOAD_MORE });
        getList(dispatch,page)
    };
};

export const firstTime = (page) => {
    return (dispatch) => {
        dispatch({ type: LIST });    
        getList(dispatch,page)
    };
};

 export const getList = (page) => {
    return (dispatch) => {
        dispatch({ type: LIST });    
            axios.get(ENVIRONMENT.host, { headers:
                    {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    }
                }).then((response) => {
                    
                    var list = [];
                    for(var i = 0 ; i < response['data']['articles'].length; i++){

                        let data  = {
                            content : response['data']['articles'][i]['content'],
                            sourceID : response['data']['articles'][i]['source']['id'],
                            sourceName : response['data']['articles'][i]['source']['name'],
                            description : response['data']['articles'][i]['description'],
                            author: response['data']['articles'][i]['author'],
                            url: response['data']['articles'][i]['url'],
                            title: response['data']['articles'][i]['title'],
                            publishedAt: response['data']['articles'][i]['publishedAt'],
                            urlToImage: response['data']['articles'][i]['urlToImage'],
                          }
                        list.push(data)
                    
                    }
                    dispatch({type: LIST_SUCCESS, payload: list})
                })
                .catch(err => {
                   alert(JSON.stringify(err))
                      dispatch({type: LIST_FAIL, payload: error})
                }); 
            }

    };