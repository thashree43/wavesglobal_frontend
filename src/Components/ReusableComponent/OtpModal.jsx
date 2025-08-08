import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const OtpModal = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Verify OTP</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Enter OTP</Form.Label>
            <Form.Control type="text" placeholder="Enter 6-digit OTP" />
          </Form.Group>
          <Button variant="primary" className="mt-3 w-100">
            Verify
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default OtpModal;
