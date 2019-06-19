import React from 'react';

const flights = () => {
    return  <table class="table table-striped">
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
                    <tr>
                        <td>0001</td>
                        <td>Rio de Janeiro</td>
                        <td>São Paulo</td>
                        <td>18/06/2019 8:00</td>
                        <td>18/06/2019 8:45</td>
                        <td><a href="#">Edit</a> / <a href="#">Remove</a></td>
                    </tr>
                </tbody>
            </table>
  
};

export default flights;