import React from "react";

import { Route, Routes } from "react-router-dom";

import Home from "./routes/home/Home.component";
import Navigation from "./routes/navigation/Navigation.component";
import SignIn from "./routes/sign-in/SignIn.component";

const Shop = () => {
  return <div>I am shop page</div>;
};

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="signin" element={<SignIn />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
