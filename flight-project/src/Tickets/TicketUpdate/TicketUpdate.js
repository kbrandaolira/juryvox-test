import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { properties } from '../../properties';
import $ from 'jquery';
import PassengerSelect from '../../Passengers/PassengerSelect/PassengerSelect';
import FlightSelect from '../../Flights/FlightSelect/FlightSelect';

class TicketUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
        <Button color="success new-btn" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>New Ticket</ModalHeader>
          <form id="passenger-form">
            <ModalBody>
                <PassengerSelect></PassengerSelect>
                <FlightSelect></FlightSelect>
                <div class="form-group">
                  <label htmlFor="seat">Seat</label>
                  <input name="seat" maxLength="10" type="text" class="form-control" id="seat"/>
                </div>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={this.handleSubmit.bind(this)}>Save</Button>{' '}
              <Button id="close-btn" color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    );
  }

  handleSubmit(){
    var callBack = this.props.callBack;
    fetch(properties.api_url + "tickets/", {
      method: "POST",
      body: JSON.stringify({"passenger_id":$("#passengers").val(),"flight_id":$("#flights").val(),"seat":$("#seat").val()}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(
        (result) => {
            console.log(result);
            $("#close-btn").click();
            callBack();
        },
        (error) => {
            console.log(error);
            alert("Sorry. We had a problem when tried to save data.")
        }
    )
  }
}

export default TicketUpdate;