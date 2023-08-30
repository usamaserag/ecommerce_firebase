import React, { useReducer, useState } from "react";
import firebase from "../firebase";
import { useNavigate } from "react-router-dom";
import ErrorText from "../components/ErrorText";
import { FaEye } from "react-icons/fa";
import Button from "../components/Button";

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
      case "LOGIN":
        return { ...state, [action.field]: action.value };
      case "RESET":
        return initialState;
      case "WRONG_PASSWORD":
        return { ...state, password: "" };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const handleChange = (e) => {
    dispatch({
      type: "LOGIN",
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
            dispatch({ type: "WRONG_PASSWORD" });
            setErrorMsg("Incorrect password");
          }
        });
    }
  };
  const handleRegister = () => {
    navigate("/signup");
  };
  const startTogglePasswordInput = () => {
    setInputType(false);
  };
  const endTogglePasswordInput = () => {
    setInputType(true);
  };

  return (
    <div className="md:w-6/12 w-full my-0 mx-auto flex flex-col gap-4 p-3">
      <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="navbar_logo text-center">Serag</div>
        <h3 className="text-xl text-center font-bold text-2xl">
          Login To Serag Store
        </h3>
        <div className="flex flex-col">
          <label className="text-gray-700" htmlFor="mail">
            E-mail
          </label>
          <input
            className="border-0 bg-white py-1.5 pl-1 mt-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            id="mail"
            name="mail"
            type="email"
            placeholder="Enter your email..."
            value={state.mail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              className="border-0 bg-white py-1.5 pl-1 mt-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              id="password"
              name="password"
              type={inputType ? "password" : "text"}
              value={state.password}
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
            {state.password.length > 0 && (
              <FaEye
                className="text-gray-400 cursor-pointer transition-all duration-200 hover:text-gray-600 absolute right-1 inset-y-2/4 -translate-y-2/4"
                onMouseDown={startTogglePasswordInput}
                onMouseUp={endTogglePasswordInput}
              />
            )}
          </div>
        </div>
        <ErrorText text={errorMsg} />
        <input
          className="rounded-lg bg-primary px-2.5 py-1.5 text-white cursor-pointer transition-all duration-200 hover:bg-primaryHover"
          type="submit"
        />
      </form>
      <Button
        text="register now"
        handleClick={handleRegister}
        btn_class="w-full text-primary text-center rounded-lg border border-primary bg-white px-2.5 py-1.5 cursor-pointer"
      />
    </div>
  );
};

export default LoginPage;
