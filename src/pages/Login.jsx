import React, { useState } from "react";
import firebase from "../firebase";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { Link } from "react-router-dom";

const Login = () => {
  const auth = firebase.auth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const onFinish = () => {
    if (email !== "" && password !== "") {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Login successful
          var user = userCredential.user;
          console.log("Logged in user:", user);
          setTimeout(() => {
            navigate("/");
          }, 3000);
        })
        .catch((error) => {
          // Login failed
          var errorMessage = error.message;
          console.error("Login error:", errorMessage);
        });
    }
  };
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
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
      <Form.Item
        onChange={handlePasswordChange}
        value={password}
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <Link to="/signup">register now!</Link>
      </Form.Item>
    </Form>
  );
};
export default Login;
