import React, { useReducer, useState } from "react";
import firebase from "../firebase";
import { useNavigate } from "react-router-dom";
import ErrorText from "../components/ErrorText";
import { FaEye } from "react-icons/fa";

const LoginPage = () => {
  const auth = firebase.auth();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [inputType, setInputType] = useState("password");
  const initialState = {
    mail: "",
    password: "",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "login":
        return { ...state, [action.field]: action.value };
      case "reset":
        return initialState;
      case "wrong_password":
        return { ...state, password: "" };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const handleChange = (e) => {
    dispatch({
      type: "login",
      field: e.target.name,
      value: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.mail !== "" && state.password !== "") {
      auth
        .signInWithEmailAndPassword(state.mail, state.password)
        .then((userCredential) => {
          // Login successful
          var user = userCredential.user;
          console.log("Logged in user:", user);
          navigate("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/user-not-found") {
            setErrorMsg("User does not exist or email is not registered");
          } else if (
            errorCode === "auth/wrong-password" ||
            errorCode === "auth/too-many-requests"
          ) {
            // Incorrect password
            dispatch({ type: "wrong_password" });
            setErrorMsg("Incorrect password");
          }
        });
    }
  };
  const startTogglePasswordInput = () => {
    setInputType(false);
  };
  const endTogglePasswordInput = () => {
    setInputType(true);
  };

  return (
    <div>
      <form className="login_form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label className="label" htmlFor="mail">
            E-mail
          </label>
          <input
            className="login_input"
            id="mail"
            name="mail"
            type="email"
            value={state.mail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <label className="label" htmlFor="password">
            Password
          </label>
          <div className="input_password_box">
            <input
              className="login_input"
              id="password"
              name="password"
              type={inputType ? "password" : "text"}
              value={state.password}
              onChange={handleChange}
              required
            />
            {state.password.length > 0 && (
              <FaEye
                className="icon_password"
                onMouseDown={startTogglePasswordInput}
                onMouseUp={endTogglePasswordInput}
              />
            )}
          </div>
        </div>
        <ErrorText text={errorMsg} />
        <input type="submit" />
      </form>
    </div>
  );
};

export default LoginPage;
