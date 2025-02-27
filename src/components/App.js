import React, { Component } from 'react';
/* import LinkList from './LinkList'; */
import CreateLink from './CreateLink';
import Header from './Header';
import LinkList from './LinkList';
import Login from './Login';
import Search from './Search';
import { Switch, Route } from 'react-router-dom';

export default class App extends Component {
    render() {
        return (
            <div className="center w85">
                <Header></Header>
                <div className="ph3 pv1 background-gray">
                    <Switch>
                        <Route exact path="/" component={LinkList}></Route>
                        <Route
                            exact
                            path="/create"
                            component={CreateLink}
                        ></Route>
                        <Route exact path="/login" component={Login}></Route>
                        <Route exact path="/search" component={Search}></Route>
                    </Switch>
                </div>
            </div>
        );
    }
}
