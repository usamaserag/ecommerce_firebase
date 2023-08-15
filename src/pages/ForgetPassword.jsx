import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
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
    <>
      {!isEmailSent ? (
        <>
          <h3 className="forget_password_title">
            Enter your email address to reset your password.
          </h3>
          <Form
            name="normal_login"
            className="login-form forget_password_form"
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
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Send
              </Button>
            </Form.Item>
            <Link to="/login">
              <Button className="login-form-button">Cancel</Button>
            </Link>
          </Form>
        </>
      ) : (
        <p>Password reset email sent. Please check your email inbox.</p>
      )}
    </>
  );
};

export default ForgetPassword;
