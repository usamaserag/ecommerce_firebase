import React, { useState } from "react";
import firebase from "../firebase";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import ErrorText from "../components/ErrorText";
import loginImage from "../assets/images/login_image.svg";

const Login = () => {
  const auth = firebase.auth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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
          setErrorMsg("");
          // Login failed
          // var errorMessage = error.message.split(":")[1].split(".")[0].trim();
          const errorCode = error.code;

          if (errorCode === "auth/user-not-found") {
            // User does not exist or email is not registered
            setErrorMsg("User does not exist or email is not registered");
          } else if (
            errorCode === "auth/wrong-password" ||
            errorCode === "auth/too-many-requests"
          ) {
            // Incorrect password
            setErrorMsg("Incorrect password");
          }
        });
    }
  };

  const handleForgetPassword = () => {
    navigate("/forgetpassword");
  };

  return (
    <div className="login-form-container">
      <div className="login-image-container">
        <img className="login-image" src={loginImage} alt="logo_image" />
      </div>
      <div className="login-form-side">
        <h2>Welcome To Serag Store</h2>
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
          <ErrorText text={errorMsg} />
          <p onClick={handleForgetPassword} className="forget_password_link">
            Forget password
          </p>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
          <Link to="/signup">
            <Button className="login-form-button">register now</Button>
          </Link>
        </Form>
      </div>
    </div>
  );
};
export default Login;
