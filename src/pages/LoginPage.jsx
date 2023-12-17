import React, { useReducer, useState } from "react";
import firebase from "../firebase";
import { useNavigate } from "react-router-dom";
import ErrorText from "../components/ErrorText";
import { FaEye } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

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
  const handleForgetPassword = () => {
    navigate("/forgetpassword");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="w-full flex flex-col gap-2 p-5 pt-14 md:w-1/2 shadow-xl rounded-xl m-5 bg-slate-50 relative">
        <div className="w-24 h-24 flex items-center justify-center rounded-full bg-slate-50 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="shadow-currentShadow flex items-center justify-center w-20 h-20 rounded-full bg-gray-200">
            <FaLock className="text-xl text-primary" />
          </div>
        </div>
        <div className="navbar_logo text-3xl font-bold tracking-wider text-orange-500 text-center">Serag</div>
        <h3 className="text-center text-xl font-medium">
          Login To Serag Store
        </h3>
        <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm" htmlFor="mail">
              E-mail
            </label>
            <input
              className="border border-gray-300 focus:outline-none focus:border-primary rounded-3xl bg-white py-1.5 px-2 mt-1 text-gray-900 placeholder:text-xs placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
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
            <label className="text-gray-600 text-sm" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="border border-gray-300 focus:outline-none focus:border-primary rounded-3xl bg-white py-1.5 px-2 mt-1 text-gray-900 placeholder:text-xs placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
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
                  className="text-gray-400 cursor-pointer transition-all duration-200 hover:text-gray-600 absolute right-2 inset-y-2/4 -translate-y-2/4"
                  onMouseDown={startTogglePasswordInput}
                  onMouseUp={endTogglePasswordInput}
                />
              )}
            </div>
          </div>
          <ErrorText text={errorMsg} />
          <input
            className="rounded-3xl bg-primary p-2 text-white cursor-pointer transition-all duration-200 hover:bg-primaryHover"
            type="submit"
            value="Login"
          />
        </form>
        <div className="flex items-center justify-between py-4">
          <button
            onClick={handleRegister}
            className="text-primary text-sm text-center cursor-pointer hover:underline"
          >
            Don't have an account?
          </button>
          <p
            onClick={handleForgetPassword}
            className="text-primary text-sm text-center cursor-pointer hover:underline"
          >
            Forget password?
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
