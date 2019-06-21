import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { properties } from '../../properties';
import $ from 'jquery';

class FlightUpdate extends React.Component {
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
          <ModalHeader toggle={this.toggle}>New Flight</ModalHeader>
          <form id="passenger-form">
            <ModalBody>
                <div class="form-group">
                  <label for="origin">Origin</label>
                  <input name="origin" maxLength="100" type="text" class="form-control" id="origin"/>
                </div>
                <div class="form-group">
                  <label for="destination">Destination</label>
                  <input name="destination" maxLength="100" type="text" class="form-control" id="destination"/>
                </div>
                <div class="form-group">
                  <label for="departure">Departure Time</label>
                  <input name="departure" maxLength="100" type="text" class="form-control" id="departure"/>
                </div>
                <div class="form-group">
                  <label for="arrival">Arrival Time</label>
                  <input name="arrival" maxLength="100" type="text" class="form-control" id="arrival"/>
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
    fetch(properties.api_url + "flights/", {
      method: "POST",
      body: JSON.stringify({"origin":$("#origin").val(),"destination":$("#destination").val(),"departure_time":$("#departure").val(),"arrival_time":$("#arrival").val()}),
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

export default FlightUpdate;