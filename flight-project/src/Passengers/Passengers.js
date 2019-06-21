import React, {Component}  from 'react';
import { properties } from '../properties';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../utils.js';

class Passengers extends React.Component {
    constructor(){
        super();
        this.state = {
            error: null,
            isLoaded: false,
            flights: []
        }
    }

    componentDidMount() {
        document.getElementById("li-flights").classList.remove("active");
        document.getElementById("li-tickets").classList.remove("active");
        document.getElementById("li-passengers").classList.add("active");

        fetch(properties.base_url + "passengers")
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

        if(error){
            return <div>Error: {error.message}</div>
        } else if(!isLoaded){
            return <div>Loading...</div>
        } else {
            return <div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Gender</th>
                                    <th>Is Suspect?</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {passengers.map(passenger => (
                                    <tr>
                                        <td>{passenger.id}</td>
                                        <td>{passenger.name}</td>
                                        <td>{passenger.gender}</td>
                                        <td>
                                            {
                                                this.isSuspect(passenger) ? 
                                                <input checked disabled type='checkbox'/> : 
                                                <input disabled type='checkbox'/>
                                            }
                                        </td>
                                        <td>
                                            <button title="Edit"><FontAwesomeIcon icon="edit"/></button> &nbsp;
                                            <button title="Delete" onClick={(e)=>this.remove(passenger)}><FontAwesomeIcon icon="trash-alt"/></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <input className="btn btn-success new-btn" value="New Passenger" type="button"/>
                    </div>
                    
        }
    }

    isSuspect(passenger){
        fetch(properties.base_url + "tickets?passenger_id=" + passenger.id)
        .then(res => res.json())
        .then(
            (tickets) => {
                let flights = new Array();
                let i;

                for( i=0; i<tickets.length; i++ ){
                    fetch(properties.base_url + "flights/" + tickets[i].flight_id)
                    .then(res2 => res2.json())
                    .then(
                        (flight) => {
                            let fields = flight.departure_time.split(" ");
                            let date = fields[0].split("/");
                            let time = fields[1].split(":");

                            let result = new Date(date[2], (date[1]-1), date[0], time[0], time[1])
                            let now = new Date();

                            let timeDiff = Math.abs(now.getTime() - result.getTime());
                            let dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
                            
                            if( dayDifference <= 30 ){
                                flight.departure_time = result;
                                flights.push(flight);
                            }
                        }
                    )
                }
                setTimeout(function(){ 
                    if(flights.length>=3){
                        return true;
                    } else {
                        return false;
                    }
                }, 100);
            }
        )
    }

    remove(passenger){
        
        fetch(properties.base_url + "tickets?passenger_id=" + passenger.id)
        .then(res => res.json())
        .then(
            (tickets) => {
                if(Object.keys(tickets).length > 0){
                    alert("There are tickets with this passenger. You can't remove.")
                } else {
                    fetch(properties.base_url + "passengers/" + passenger.id, {
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

export default Passengers;