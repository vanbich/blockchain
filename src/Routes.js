import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Detail from './pages/Detail';
import Mining from "./pages/Minning";
import NewTransaction from './pages/Transaction';
import Home from "./pages/Home";
// Views

export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route
                    exact
                    path="/"
                    component={Home}
                />
                <Route
                    exact
                    path="/:id/detail"
                    component={Detail}
                />
                <Route
                    exact
                    path="/:id/mining"
                    component={Mining}
                />
                <Route
                    exact
                    path="/:id/transaction"
                    component={NewTransaction}
                />

            </Switch>
        );
    }
}
