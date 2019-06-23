import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { properties } from '../../properties';
import $ from 'jquery';

class PassengerUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      passenger: null
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    fetch(properties.api_url + "passengers/" + this.props.passengerId)
    .then(res => res.json())
    .then(
        (result) => {
            this.setState({
                isLoaded: true,
                passenger: result
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

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    const { error, isLoaded, passenger } = this.state;
    return (
      <div className="actions-btn">
        {
            this.props.passengerId != null ? 
            <button title="Edit" onClick={this.toggle}>{this.props.buttonLabel}</button> : 
            <Button color="success new-btn" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        }
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>New Passenger</ModalHeader>
          <form id="passenger-form">
            <ModalBody>
                <input value={passenger != null ? passenger.id : ""} type="hidden" name="id" id="id"/>
                <div class="form-group">
                  <label htmlFor="name">Name</label>
                  <input defaultValue={passenger != null ? passenger.name : ""} name="name" maxLength="100" type="text" class="form-control" id="name"/>
                </div>
                <div class="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select defaultValue={passenger != null ? passenger.gender : ""} name="gender" class="form-control" id="gender">
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
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
    var method = "POST";

    if($("#id").val() != ""){
      method = "PATCH";
    }

    fetch(properties.api_url + "passengers/" + $("#id").val(), {
      method: method,
      body: JSON.stringify({"name":$("#name").val(),"gender":$("#gender").val()}),
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

export default PassengerUpdate;