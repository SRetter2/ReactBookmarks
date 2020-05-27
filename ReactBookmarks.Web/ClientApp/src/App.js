import React, { Component } from 'react';
import { Route } from 'react-router';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import MyBookmarks from './Pages/MyBookmarks';
import { AuthContextComponent } from './AuthContext';
import PrivateRoute from './PrivateRoute';
import Layout from './Layout';

export default class App extends Component {
    displayName = App.name

    render() {
        return (
            <AuthContextComponent>
                <Layout>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/signup' component={Signup} />
                    <Route exact path='/login/' component={Login} />
                    <Route exact path='/logout' component={Logout} />
                    <PrivateRoute exact path='/mybookmarks' component={MyBookmarks} />
                </Layout>
            </AuthContextComponent>
        );
    }
}