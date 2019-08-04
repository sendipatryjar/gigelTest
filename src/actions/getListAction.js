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
        dispatch({ type: LIST });    
            axios.get(ENVIRONMENT.host, { headers:
                    {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    }
                }).then((response) => {
                    var list = [];
                    if(page >= 49){
                        var data = page
                        for(var i = data ; i == data ; i++){
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
                        dispatch({type: LIST_SUCCESS, payload: list})
                        }

                    }else{
                       
                      
                            for(var i = page ; i < page+7 ; i++){
    
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
                        }
                })
                .catch(err => {
                   alert("CHECK CONNECTION")
                      dispatch({type: LIST_FAIL, payload: err})
                }); 
            
        // dispatch({ type: LOAD_MORE });
        // getList(dispatch, page)
    };
};

 export const getList = () => {

    return (dispatch) => {
        dispatch({ type: LIST });    
            axios.get(ENVIRONMENT.host, { headers:
                    {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    }
                }).then((response) => {
                    
                        var list = [];
                      
                            for(var i = 0 ; i < 7 ; i++){
    
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
                   alert("CHECK CONNECTION")
                      dispatch({type: LIST_FAIL, payload: error})
                }); 
            }

    };