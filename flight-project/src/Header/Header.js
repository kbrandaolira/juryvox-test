import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Flights from '../Flights/Flights';
import Passengers from '../Passengers/Passengers';
import Tickets from '../Tickets/Tickets';

const header = () => {
    return   <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-success">
                    <a className="navbar-brand" href="#"><img src="../../airplane.svg"/>NYK Airlines</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li id="li-flights" className="nav-item active">
                                <a className="nav-link" href="/">Flights</a>
                            </li>
                            <li id="li-passengers" class="nav-item">
                                <a className="nav-link" href="/passengers">Passengers</a>
                            </li>
                            <li id="li-tickets" class="nav-item">
                                <a className="nav-link" href="/tickets">Tickets</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
  
};

export default header;