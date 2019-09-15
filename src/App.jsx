import React from 'react';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom'
import routes from './config/routes'
import BasicLayout from './components/basic-layout/index'
import Login from "./containers/Login";

export default class App extends React.Component{
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/login' component={Login}>
                    </Route>
                    <BasicLayout>
                        <Switch>
                            {
                                routes.map((route,index)=>{
                                    return <Route {...route} key={index}/>
                                })
                            }
                        </Switch>
                    </BasicLayout>
                </Switch>



            </Router>
        );
    }

}