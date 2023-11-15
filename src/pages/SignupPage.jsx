import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loading from "../components/Loading";
import firebase from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { imageDb } from "../firebase";
import { FaUserPlus } from "react-icons/fa";

const SignupPage = () => {
  const navigate = useNavigate();
  const auth = firebase.auth();
  const [emailIsUse, setEmailIsUse] = useState("");
  const [image, setImage] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset,
    clearErrors,
  } = useForm();

  const password = watch("password");

  const handleUpload = async () => {
    if (image) {
      try {
        // Generate a unique name for the image file
        const imageName = `${Date.now()}_${image.name}`;

        // Create a reference to the Firebase Storage bucket and the image file
        const storageRef = ref(imageDb, `images/${imageName}`);

        // Upload the image to Firebase Storage
        await uploadBytes(storageRef, image);

        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(storageRef);

        return downloadURL;
      } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
      }
    }
    return null;
  };

  const onSubmit = async (data) => {
    setIsSignUp(true);
    const { email, password, userName } = data;
    try {
      // Upload the image and get the download URL
      const photoURL = await handleUpload();

      // Create the user in Firebase Authentication
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        // Update user profile with userName and photoURL
        await user.updateProfile({
          displayName: userName,
          photoURL: photoURL,
        });
        setIsSignUp(false);
      }

      reset();
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        // Display the "Email address is already in use" error message
        setEmailIsUse(
          "Email address is already in use. Please choose another."
        );
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

  return isSignUp ? (
    <Loading />
  ) : (
    <div className="flex items-center justify-center h-screen bg-emerald-100">
      <div className="w-full flex flex-col gap-2 p-5 pt-14 md:w-1/2 shadow-xl rounded-xl m-5 bg-slate-50 relative">
      <div className="w-24 h-24 flex items-center justify-center rounded-full bg-slate-50 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="shadow-currentShadow flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100">
            <FaUserPlus className="text-xl text-primary" />
          </div>
        </div>
        <div className="navbar_logo text-center">Serag</div>
        <h3 className="text-center text-xl font-medium">
          Sign Up To Serag Store
        </h3>
        <form
          className="w-full flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm" htmlFor="userName">
              User Name
            </label>
            <input
              id="userName"
              type="text"
              placeholder="Enter your user name ..."
              className="border border-gray-300 focus:outline-none focus:border-primary rounded-3xl bg-white py-1.5 px-2 mt-1 text-gray-900 placeholder:text-xs placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
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
            <label className="text-gray-600 text-sm" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              className="border border-gray-300 focus:outline-none focus:border-primary rounded-3xl bg-white py-1.5 px-2 mt-1 text-gray-900 placeholder:text-xs placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
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
            {emailIsUse && <small className="text-red-500">{emailIsUse}</small>}
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm">Password</label>
            <input
              type="password"
              placeholder="At least 6 characters"
              className="border border-gray-300 focus:outline-none focus:border-primary rounded-3xl bg-white py-1.5 px-2 mt-1 text-gray-900 placeholder:text-xs placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
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
            <label className="text-gray-600 text-sm">Re-enter Password</label>
            <input
              type="password"
              placeholder="confirm your password"
              className="border border-gray-300 focus:outline-none focus:border-primary rounded-3xl bg-white py-1.5 px-2 mt-1 text-gray-900 placeholder:text-xs placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
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
          {/* input to upload image it is optional */}

          {/* <div className="flex flex-col">
            <label className="text-gray-600 text-sm">upload Your Image</label>
            <input
              type="file"
              className="file-input file-input-bordered file-input-sm w-full max-w-xs"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div> */}

          <input
            className="rounded-3xl mt-2 bg-primary p-2 text-white cursor-pointer transition-all duration-200 hover:bg-primaryHover"
            type="submit"
            value="Create account"
          />
        </form>
        <button
          onClick={redirectToLogin}
          className="text-primary text-sm text-center cursor-pointer hover:underline"
        >
          I already have account
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
