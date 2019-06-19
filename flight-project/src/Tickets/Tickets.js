import React, {Component}  from 'react';

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

        fetch("http://localhost:3000/tickets")
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
                                    <th>National ID</th>
                                    <th>Flight Number</th>
                                    <th>Seat</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.map(ticket => (
                                    <tr>
                                        <td>{ticket.national_id}</td>
                                        <td>{ticket.flight_number}</td>
                                        <td>{ticket.seat}</td>
                                        <td><a href="#">Edit</a> / <a href="#">Delete</a></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <input className="btn btn-success new-btn" value="New Ticket" type="button"/>
                    </div>
        }
    }
}

export default Tickets;