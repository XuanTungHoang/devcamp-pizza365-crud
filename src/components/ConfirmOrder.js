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
      <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Thong tin san pham</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">Form confirm here</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ConfirmOrder;
