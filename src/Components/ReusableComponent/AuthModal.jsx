import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AuthModal = ({ show, onClose, onRegisterSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleRegister = (e) => {
    e.preventDefault();
    // Here you’ll handle register API and on success:
    onRegisterSuccess();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isLogin ? "Sign In" : "Register"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLogin ? (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <div className="text-end mb-3">
              <Button variant="link" className="p-0">
                Forgot Password?
              </Button>
            </div>
            <Button variant="warning" className="w-100 mb-3">
              Sign In
            </Button>
            <Button variant="outline-danger" className="w-100">
              Sign in with Google
            </Button>
          </Form>
        ) : (
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" placeholder="Enter phone" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" />
            </Form.Group>
            <Button variant="success" type="submit" className="w-100">
              Register
            </Button>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div className="w-100 text-center">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <Button variant="link" className="p-0" onClick={() => setIsLogin(false)}>
                Register
              </Button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Button variant="link" className="p-0" onClick={() => setIsLogin(true)}>
                Sign In
              </Button>
            </>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default AuthModal;
