import React from 'react';
import { properties } from '../../properties';

class FlightSelect extends React.Component {

    constructor(){
        super();
        this.state = {
            error: null,
            isLoaded: false,
            flights: []
        }
    }

    componentDidMount() {
        fetch(properties.api_url + "flights")
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
        return (
            <div class="form-group">
                <label htmlFor="flights">Flight</label>
                <select name="flights" class="form-control" id="flights">
                    <option value="">Select</option>
                    {flights.map(flight => (
                        <option value={flight.id}>{flight.origin} to {flight.destination} ({flight.departure_time} {flight.arrival_time})</option>
                    ))}
                </select>
            </div>
        );
    }
  }

  export default FlightSelect;