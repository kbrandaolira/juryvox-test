import React, {Component}  from 'react';
import { properties } from '../properties';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Tickets extends React.Component {
    constructor(){
        super();
        this.state = {
            error: null,
            isLoaded: false,
            tickets: []
        }
    }

    componentDidMount() {
        document.getElementById("li-flights").classList.remove("active");
        document.getElementById("li-tickets").classList.add("active");
        document.getElementById("li-passengers").classList.remove("active");

        fetch(properties.base_url + "tickets")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    tickets: result
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
        const { error, isLoaded, tickets } = this.state;

        if(error){
            return <div>Error: {error.message}</div>
        } else if(!isLoaded){
            return <div>Loading...</div>
        } else {
            return <div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Passenger ID</th>
                                    <th>Flight ID</th>
                                    <th>Seat</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.map(ticket => (
                                    <tr>
                                        <td>{ticket.passenger_id}</td>
                                        <td>{ticket.flight_id}</td>
                                        <td>{ticket.seat}</td>
                                        <td>
                                            <button title="Edit"><FontAwesomeIcon icon="edit"/></button> &nbsp;
                                            <button title="Delete" onClick={(e)=>this.remove(ticket)}><FontAwesomeIcon icon="trash-alt"/></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <input className="btn btn-success new-btn" value="New Ticket" type="button"/>
                    </div>
        }
    }

    remove(ticket){
        fetch(properties.base_url + "tickets/" + ticket.id, {
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

export default Tickets;