import React, { useState } from "react";
import { Form, Input } from "antd";
import { Link } from "react-router-dom";
import firebase from "../firebase";
import { FaUserLock } from "react-icons/fa";

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
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="w-full flex flex-col gap-2 p-5 pt-14 md:w-1/2 shadow-xl rounded-xl m-5 bg-slate-50 relative">
        {!isEmailSent ? (
          <>
            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-slate-50 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="shadow-currentShadow flex items-center justify-center w-20 h-20 rounded-full bg-gray-200">
                <FaUserLock className="text-xl text-primary" />
              </div>
            </div>
            <div className="navbar_logo text-3xl font-bold tracking-wider text-orange-500 text-center">Serag</div>
            <h2 className="text-center text-l font-medium">
              Enter your email address to reset your password.
            </h2>
            <Form
              name="normal_login"
              className="w-full flex flex-col gap-2"
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
                  placeholder="Enter your email"
                  className="border border-gray-300 focus:outline-none focus:border-primary rounded-3xl bg-white py-1.5 px-2 mt-1 text-gray-900 placeholder:text-xs placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </Form.Item>

              <button
                type="primary"
                htmlType="submit"
                className="rounded-3xl bg-primary p-2 text-white cursor-pointer transition-all duration-200 hover:bg-primaryHover"
              >
                Send
              </button>
              <p className="flex items-center justify-center gap-1">
                <span>Don't have an account</span>
                <Link
                  to="/signup"
                  className="text-primary cursor-pointer hover:underline hover:text-primary"
                >
                  Sign up
                </Link>
              </p>
            </Form>
          </>
        ) : (
          <p>Password reset email sent. Please check your email inbox.</p>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
