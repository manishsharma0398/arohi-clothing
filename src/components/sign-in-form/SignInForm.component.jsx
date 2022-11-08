import React, { useState } from "react";

import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import Button from "../../components/button/Button.component";
import FormInput from "../../components/form-input/FormInput.component";

import "./sign-in.styles.scss";

const userDefaultInputs = {
  loginEmail: "",
  loginPassword: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(userDefaultInputs);
  const { loginEmail, loginPassword } = formFields;

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormFields({ ...formFields, [id]: value });
  };

  const logGoogleUser = async () => {
    await signInWithGooglePopup();
  };

  const handleLoginForm = async (e) => {
    e.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(loginEmail, loginPassword);

      setFormFields(userDefaultInputs);
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          alert("Email not registered");
          break;
        case "auth/wrong-password":
          alert("Wrong login credentials entered");
          break;
        default:
          console.log(err);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account ?</h2>
      <span>Sign In with your email and password</span>
      <form className="register-form" onSubmit={handleLoginForm}>
        <FormInput
          label="Email"
          type="email"
          id="loginEmail"
          onChange={handleChange}
          value={loginEmail}
          required
        />

        <FormInput
          label="Password"
          type="password"
          id="loginPassword"
          onChange={handleChange}
          value={loginPassword}
          required
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={logGoogleUser}>
            Google Sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
