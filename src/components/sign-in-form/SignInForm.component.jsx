import React, { useState } from "react";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import Button from "../../components/button/Button.component";
import FormInput from "../../components/form-input/FormInput.component";

import "./sign-in.styles.scss";

const userDefaultInputs = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(userDefaultInputs);

  const { email, password } = formFields;

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormFields({ ...formFields, [id]: value });
  };

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const handleLoginForm = async (e) => {
    e.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
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
      <form id="register-form" onSubmit={handleLoginForm}>
        <FormInput
          label="Email"
          type="email"
          id="email"
          onChange={handleChange}
          value={email}
          required
        />

        <FormInput
          label="Password"
          type="password"
          id="password"
          onChange={handleChange}
          value={password}
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
