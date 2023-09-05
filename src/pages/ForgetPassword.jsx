import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import firebase from "../firebase";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSendEmail = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setIsEmailSent(true);
      })
      .catch((error) => {
        console.error("Error sending reset email:", error);
      });
  };
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };
  return (
    <div className="p-3">
      {!isEmailSent ? (
        <>
          <div className="navbar_logo text-center">Serag</div>
          <h2 className="text-xl text-center font-bold text-2xl">
            Enter your email address to reset your password.
          </h2>
          <Form
            name="normal_login"
            className="md:w-6/12 w-full my-0 mx-auto flex flex-col gap-2 p-3"
            initialValues={{
              remember: true,
            }}
            onFinish={handleSendEmail}
          >
            <Form.Item
              onChange={handleEmailChange}
              value={email}
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>
            <div className="d-flex flex-col gap-2">
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-primary mb-0 w-full"
                >
                  Send
                </Button>
              </Form.Item>
              <Link to="/login">
                <Button className="w-full">Cancel</Button>
              </Link>
            </div>
          </Form>
        </>
      ) : (
        <p>Password reset email sent. Please check your email inbox.</p>
      )}
    </div>
  );
};

export default ForgetPassword;
