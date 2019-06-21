import React, {Component}  from 'react';
import { properties } from '../properties';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
                                        <td><input type="checkbox" disabled/></td>
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