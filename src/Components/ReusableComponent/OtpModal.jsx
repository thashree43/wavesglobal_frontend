import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const OtpModal = ({ show, onClose, email }) => {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (show) {
      setTimeLeft(60);
      setCanResend(false);
    }
  }, [show]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleVerify = async () => {
    try {
      await axios.post("http://localhost:3000/api/user/verify-otp", {
        email,
        otp
      }, { withCredentials: true });

      window.location.href = "/"; // redirect to homepage
    } catch (error) {
      alert(error.response?.data?.message || "OTP verification failed");
    }
  };

  const handleResend = async () => {
    try {
      await axios.post("http://localhost:3000/api/user/resend-otp", { email });
      setTimeLeft(60);
      setCanResend(false);
    } catch (error) {
      alert("Failed to resend OTP");
      console.error(error);
      
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Verify OTP</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Enter OTP</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </Form.Group>
          <div className="mt-2">
            Time left: {timeLeft}s
          </div>
          <Button
            variant="primary"
            className="mt-3 w-100"
            onClick={handleVerify}
            disabled={!otp}
          >
            Verify
          </Button>
          <Button
            variant="link"
            className="mt-2 w-100"
            onClick={handleResend}
            disabled={!canResend}
          >
            Resend OTP
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default OtpModal;
