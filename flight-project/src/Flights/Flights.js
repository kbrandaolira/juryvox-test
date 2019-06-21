import React, {Component}  from 'react';
import '../App.css';
import { properties } from '../properties';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FlightUpdate from './FlightUpdate/FlightUpdate';

class Flights extends React.Component {
    constructor(){
        super();
        this.state = {
            error: null,
            isLoaded: false,
            flights: []
        }
    }

    componentDidMount() {
        document.getElementById("li-flights").classList.add("active");
        document.getElementById("li-tickets").classList.remove("active");
        document.getElementById("li-passengers").classList.remove("active");

        fetch( properties.api_url + "flights" )
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    flights: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error: error
                });
            }
        )
    }

    render() {
        const { error, isLoaded, flights } = this.state;

        if(error){
            return <div>Error: {error.message}</div>
        } else if(!isLoaded){
            return <div>Loading...</div>
        } else {
            return  <div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Number</th>
                                    <th>Origin</th>
                                    <th>Destination</th>
                                    <th>Departure Time</th>
                                    <th>Arrival Time</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {flights.map(flight => (
                                    <tr>
                                        <td>{flight.id}</td>
                                        <td>{flight.origin}</td>
                                        <td>{flight.destination}</td>
                                        <td>{flight.departure_time}</td>
                                        <td>{flight.arrival_time}</td>
                                        <td>
                                            <div class="row">
                                                <div class="col-md-3">
                                                <FlightUpdate flightId={flight.id} buttonLabel={<FontAwesomeIcon icon="edit"/>} callBack={this.componentDidMount.bind(this)}/> &nbsp;
                                                </div>
                                                <div class="col-md-3">
                                                <button title="Delete" onClick={(e)=>this.remove(flight)}><FontAwesomeIcon icon="trash-alt"/></button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <FlightUpdate buttonLabel="New Flight" callBack={this.componentDidMount.bind(this)}/>
                </div>
        }
    }

    //<button title="Edit"><FontAwesomeIcon icon="edit"/></button> &nbsp;

    remove(flight){
        
        fetch(properties.api_url + "tickets?flight_id=" + flight.id)
        .then(res => res.json())
        .then(
            (tickets) => {
                if(Object.keys(tickets).length > 0){
                    alert("There are tickets with this flight. You can't remove.")
                } else {
                    fetch(properties.api_url + "flights/" + flight.id, {
                        method: "DELETE"
                    })
                    .then(res => res.json())
                    .then(
                        (result) => {
                            console.log(result);
                            this.componentDidMount();
                        },
                        (error) => {
                            console.log(error);
                            alert("Sorry. We had a problem when tried to remove data.")
                        }
                    )
                }
            }
        )

    }
}

export default Flights;