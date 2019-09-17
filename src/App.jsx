import React,{ Suspense } from 'react';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom'
import routes from './config/routes'
import BasicLayout from './components/basic-layout/index'
import Login from "./containers/Login";
import { Spin } from 'antd'
import Notmatch from './components/notmatch'



export default class App extends React.Component{
    render() {
        return (
            <Suspense fallback={<Spin size="large"  />}>
                <Router>
                    <Switch>
                        <Route path='/login' component={Login} />
                        <BasicLayout>
                            <Switch>
                                {
                                    routes.map((route,index)=>{
                                        return <Route {...route} key={index}/>
                                    })
                                }
                                <Route component={Notmatch}/>
                            </Switch>
                        </BasicLayout>
                    </Switch>
                </Router>
            </Suspense>

        );
    }

}