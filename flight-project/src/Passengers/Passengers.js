import React, {Component}  from 'react';

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

        fetch("http://localhost:3000/passengers")
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
                                    <th>National ID</th>
                                    <th>Name</th>
                                    <th>Gender</th>
                                    <th>Is Suspect?</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {passengers.map(passenger => (
                                    <tr>
                                        <td>{passenger.national_id}</td>
                                        <td>{passenger.name}</td>
                                        <td>{passenger.gender}</td>
                                        <td><input type="checkbox" disabled/></td>
                                        <td><a href="#">Edit</a> / <a href="#">Delete</a></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <input className="btn btn-success new-btn" value="New Passenger" type="button"/>
                    </div>
                    
        }
    }
}

export default Passengers;