import React from 'react';
import {Switch, Route} from 'react-router-dom';
import ToDo from './components/ToDo'
// import Task from './components/Task'
import Details from './components/Details'




export default (
    <Switch>
        <Route exact path="/" component={ ToDo }/>
        {/* <Route path="/task/:id" component={ Task }/> */}
        <Route path="/details/:id" component={ Details}/>
    </Switch>
)