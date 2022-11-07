import React, { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/FormInput.component";
import Button from "../../components/button/Button.component";

import "./sign-up.styles.scss";

const userDefaultInputs = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(userDefaultInputs);

  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormFields({ ...formFields, [id]: value });
  };

  const handleSignUpForm = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });

      setFormFields(userDefaultInputs);
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("Cannot Create User. Email already in use. Try another email");
      }
      console.log(err);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form id="register-form" onSubmit={handleSignUpForm}>
        <FormInput
          label="Display Name"
          type="text"
          id="displayName"
          onChange={handleChange}
          value={displayName}
          required
        />

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

        <FormInput
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          onChange={handleChange}
          value={confirmPassword}
          required
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
