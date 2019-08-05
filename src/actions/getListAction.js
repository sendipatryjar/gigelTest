import axios from 'axios';
import {Alert} from 'react-native';
import {
    LIST,
    LIST_FAIL,
    LIST_SUCCESS,
    LOAD_MORE
} from '../values/types';
import { Actions } from 'react-native-router-flux';
import ENVIRONMENT from '../config/environtment';

export const loadmore = (page) => {
    return (dispatch) => {
        dispatch({ type: LIST });
        axios.get(ENVIRONMENT.host, {
            headers:
            {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        }).then((response) => {
            
            if (page >= 50) {
                var list = [];
                for (var i = 0; i < 8; i++) {
                    let data = {
                        content: response['data']['articles'][i]['content'],
                        sourceID: response['data']['articles'][i]['source']['id'],
                        sourceName: response['data']['articles'][i]['source']['name'],
                        description: response['data']['articles'][i]['description'],
                        author: response['data']['articles'][i]['author'],
                        url: response['data']['articles'][i]['url'],
                        title: page+" ."+response['data']['articles'][i]['title'],
                        publishedAt: response['data']['articles'][i]['publishedAt'],
                        urlToImage: response['data']['articles'][i]['urlToImage'],
                    }
                    list.push(data)   
                }
                dispatch({ type: LIST_SUCCESS, payload: list })
                
            } else {
                var list = [];
                for (var i = page; i < page + 8; i++) {
                    let data = {
                        content: response['data']['articles'][i]['content'],
                        sourceID: response['data']['articles'][i]['source']['id'],
                        sourceName: response['data']['articles'][i]['source']['name'],
                        description: response['data']['articles'][i]['description'],
                        author: response['data']['articles'][i]['author'],
                        url: response['data']['articles'][i]['url'],
                        title: page+" ."+response['data']['articles'][i]['title'],
                        publishedAt: response['data']['articles'][i]['publishedAt'],
                        urlToImage: response['data']['articles'][i]['urlToImage'],
                    }
                    list.push(data)
                }
                dispatch({ type: LIST_SUCCESS, payload: list })
            }
        })
            .catch(err => {
                Alert.alert(
                    'INFO',
                    'CHECK CONNECTION',
                    [
                        { text: 'OK', onPress: () => Actions.home()},
                    dispatch({ type: LIST_FAIL, payload: err })
                    ],
                   
                );
            });
    };
};

export const getList = () => {

    return (dispatch) => {
        dispatch({ type: LIST });
        axios.get(ENVIRONMENT.host, {
            headers:
            {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        }).then((response) => {

            var list = [];

            for (var i = 0; i < 2; i++) {

                let data = {
                    content: response['data']['articles'][i]['content'],
                    sourceID: response['data']['articles'][i]['source']['id'],
                    sourceName: response['data']['articles'][i]['source']['name'],
                    description: response['data']['articles'][i]['description'],
                    author: response['data']['articles'][i]['author'],
                    url: response['data']['articles'][i]['url'],
                    title: response['data']['articles'][i]['title'],
                    publishedAt: response['data']['articles'][i]['publishedAt'],
                    urlToImage: response['data']['articles'][i]['urlToImage'],
                }
                list.push(data)

            }
            dispatch({ type: LIST_SUCCESS, payload: list })
        })
            .catch(err => {
                Alert.alert(
                    'INFO',
                    'CHECK CONNECTION',
                    [
                        { text: 'OK', onPress: () => Actions.home()},
                    dispatch({ type: LIST_FAIL, payload: err })
                    ],
                   
                );
               
            });
    }

};