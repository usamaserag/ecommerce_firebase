import React, { useState } from "react";
import firebase from "../firebase";
import { Button, Form, Input } from "antd";
import { useNavigate, Link } from "react-router-dom";
import signupImage from "../assets/images/sign_up_image.svg";

const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    span: 24,
    offset: 0,
  },
};

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailIsUse, setEmailIsUse] = useState("");
  const auth = firebase.auth();
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (emailIsUse && value !== "") {
      setEmailIsUse("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const [form] = Form.useForm();

  const onFinish = () => {
    if (email === "") {
      setEmailIsUse("Please input your E-mail!");
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((Credentials) => {
        console.log(Credentials);
        navigate("/");
      })
      .catch((error) => {
        const errorMsg = error.message.split(":")[1].split(".")[0].trim();
        setEmailIsUse(errorMsg);
      });
  };

  return (
    <div className="signup-form-container">
      <div className="signup-image-container">
        <img className="signup-image" src={signupImage} alt="logo_image" />
      </div>
      <div className="signup-form-side">
        <h2>Join To Serag Store Now!</h2>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          className="signup-form"
          onFinish={onFinish}
          style={{
            maxWidth: "100%",
          }}
          scrollToFirstError
        >
          <Form.Item
            onChange={handleEmailChange}
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not a valid E-mail!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value) {
                    setEmailIsUse("Please input your E-mail!");
                    return Promise.reject(new Error(emailIsUse));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
            hasFeedback
            validateStatus={emailIsUse ? "error" : ""}
            help={emailIsUse}
          >
            <Input />
          </Form.Item>

          <Form.Item
            onChange={handlePasswordChange}
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
          <Link to="/login">
            <Button className="signin-form-button">Sign in</Button>
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
