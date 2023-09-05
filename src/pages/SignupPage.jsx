import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import firebase from "../firebase";

const SignupPage = () => {
  const navigate = useNavigate();
  const auth = firebase.auth();
  const [emailIsUse, setEmailIsUse] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset,
    clearErrors, // Add clearErrors from react-hook-form
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    const { email, password, userName } = data;

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;

      // Update user profile with userName
      await user.updateProfile({
        displayName: userName,
      });

      console.log("User created:", user);

      reset();
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        // Display the "Email address is already in use" error message
        setEmailIsUse("Email address is already in use. Please choose another.");
      } else {
        // Handle other authentication errors
        setEmailIsUse(""); // Clear the error message
        console.error(error);
      }
    }
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  // Function to clear the emailIsUse error when the email input becomes valid
  const clearEmailError = () => {
    clearErrors("email");
    setEmailIsUse("");
  };

  return (
    <div className="md:w-6/12 w-full my-0 mx-auto flex flex-col gap-2 p-3">
      <div className="navbar_logo text-center">Serag</div>
      <h3 className="text-xl text-center font-bold text-2xl">
        Sign Up To Serag Store
      </h3>
      <form
        className="w-full flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label className="text-gray-700" htmlFor="userName">
            User Name
          </label>
          <input
            id="userName"
            type="text"
            placeholder="Enter your user name ..."
            className="border-0 bg-white py-1.5 pl-1 mt-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            {...register("userName", {
              required: "User name is required",
              maxLength: {
                value: 20,
                message: "Maximum length is 20 characters",
              },
            })}
          />
          {errors.userName && (
            <small className="text-red-500">{errors.userName.message}</small>
          )}
        </div>
        <div className="flex flex-col">
        <label className="text-gray-700" htmlFor="email">
          E-mail
        </label>
        <input
          id="email"
          className="border-0 bg-white py-1.5 pl-1 mt-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          type="email"
          placeholder="Enter your email ..."
          {...register("email", {
            required: "Email Address is required",
            validate: (value) => {
              if (emailIsUse) {
                // If emailIsUse error is present, clear it when the input is valid
                clearEmailError();
                return true;
              }
              return true;
            },
          })}
        />
        {errors.email && (
          <small className="text-red-500">{errors.email.message}</small>
        )}
        {emailIsUse && (
          <small className="text-red-500">{emailIsUse}</small>
        )}
      </div>
        <div className="flex flex-col">
          <label>Password</label>
          <input
            type="password"
            placeholder="At least 6 characters"
            className="border-0 bg-white py-1.5 pl-1 mt-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <small className="text-red-500">{errors.password.message}</small>
          )}
        </div>

        <div className="flex flex-col">
          <label>Re-enter Password</label>
          <input
            type="password"
            placeholder="confirm your password"
            className="border-0 bg-white py-1.5 pl-1 mt-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <small className="text-red-500">
              {errors.confirmPassword.message}
            </small>
          )}
        </div>
        <input
          className="rounded-lg bg-primary px-2.5 py-1.5 text-white cursor-pointer transition-all duration-200 hover:bg-primaryHover"
          type="submit"
          value="Create account"
        />
      </form>
      <Button
        text="I already have account"
        handleClick={redirectToLogin}
        btn_class="w-full text-primary text-center rounded-lg border border-primary bg-white px-2.5 py-1.5 cursor-pointer"
      />
    </div>
  );
};

export default SignupPage;
