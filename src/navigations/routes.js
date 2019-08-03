import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import Home from '../pages/home';
import Detail from '../pages/detailNews'

const RouterComponent = () => {
    return (
            <Router>       
                 <Scene key="root" hideNavBar={true}>
                 <Scene key="home" component={Home} title="Home"/>
                 <Scene key="detail" component={Detail} title="Detail"/>
                </Scene>

            </Router>
    );
};


export default RouterComponent;