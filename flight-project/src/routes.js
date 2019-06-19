import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';


import Flights from './Flights/Flights';
import Passengers from './Passengers/Passengers';
import Tickets from './Tickets/Tickets';

const Routes = () => (
    <BrowserRouter >
        <Switch>
            <Route exact path="/" component={Flights}/>
            <Route path="/passengers" component={Passengers}/>
            <Route path="/tickets" component={Tickets}/>
        </Switch>
    </BrowserRouter>
);
   
export default Routes;