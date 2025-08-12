import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import OtpModal from "./OtpModal";

const AuthModal = ({ show, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [otpModalShow, setOtpModalShow] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [username, setUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    setRegEmail("");
    setPhone("");
    setRegPassword("");
    setConfirmPassword("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/user/login", {
        email,
        password,
      });
      console.log("Login Success:", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userInfo", JSON.stringify(res.data.user));

      resetForm();
      onClose();
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (regPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post("http://localhost:3000/api/user/register", {
        username,
        email: regEmail,
        phone,
        password: regPassword,
      });
      console.log("Registration Success:", res.data);
      
      setRegisteredEmail(regEmail);
      setOtpModalShow(true);
      resetForm();
      onClose();
    } catch (error) {
      console.error("Registration Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  const handleOtpModalClose = () => {
    setOtpModalShow(false);
    setRegisteredEmail("");
  };

  const handleModalClose = () => {
    resetForm();
    setIsLogin(true);
    onClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isLogin ? "Sign In" : "Register"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLogin ? (
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <div className="text-end mb-3">
                <Button variant="link" className="p-0">
                  Forgot Password?
                </Button>
              </div>
              <Button type="submit" variant="warning" className="w-100 mb-3">
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
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
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
                Don't have an account?{" "}
                <Button
                  variant="link"
                  className="p-0"
                  onClick={() => setIsLogin(false)}
                >
                  Register
                </Button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Button
                  variant="link"
                  className="p-0"
                  onClick={() => setIsLogin(true)}
                >
                  Sign In
                </Button>
              </>
            )}
          </div>
        </Modal.Footer>
      </Modal>

      {/* OTP Modal */}
      <OtpModal
        show={otpModalShow}
        onClose={handleOtpModalClose}
        email={registeredEmail}
      />
    </>
  );
};

export default AuthModal;