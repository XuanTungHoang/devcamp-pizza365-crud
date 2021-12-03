import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

class ConfirmOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // onSubmit = event => {
  //   event.preventDefault();
  //   this.props.onSubmit(this.state);
  //   this.onCloseForm();
  // };

  // onCloseForm = () => {
  //   this.props.onCloseForm();
  // };

  render() {
    //  var { order } = this.props;

    return (
      <Modal show={true} onHide={false} style={{ opacity: 1 }}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ConfirmOrder;
