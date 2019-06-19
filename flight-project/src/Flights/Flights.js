import React, {Component}  from 'react';

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
        fetch("http://localhost:3000/flights")
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
            return <table class="table table-striped">
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
                                <td>{flight.number}</td>
                                <td>{flight.origin}</td>
                                <td>{flight.destination}</td>
                                <td>{flight.departure_time}</td>
                                <td>{flight.arrival_time}</td>
                                <td><a href="#">Edit</a> / <a href="#">Delete</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        }
    }
}

export default Flights;