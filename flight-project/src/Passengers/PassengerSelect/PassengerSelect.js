import React from 'react';
import { properties } from '../../properties';

class PassengerSelect extends React.Component {

    constructor(){
        super();
        this.state = {
            error: null,
            isLoaded: false,
            passengers: []
        }
    }

    componentDidMount() {
        fetch(properties.api_url + "passengers")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    passengers: result
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
        const { error, isLoaded, passengers } = this.state;
        return (
            <div class="form-group">
                <label htmlFor="passengers">Passenger</label>
                <select name="passengers" class="form-control" id="passengers">
                    <option value="">Select</option>
                    {passengers.map(passenger => (
                        <option value={passenger.id}>{passenger.name}</option>
                    ))}
                </select>
            </div>
        );
    }
  }

  export default PassengerSelect;