import React, { useState } from "react";
import httpClient from "../utility/httpClient"
import { Button } from 'semantic-ui-react'
import { Navigate } from "react-router-dom";

import './RegisterPage.css'

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const registerUser = async () => {
    try {
      const resp = await httpClient.post("//localhost:5000/register", {
        email,
        password,
      });

      window.location.href = "/";
      <Navigate to='/' ></Navigate>

    } catch (error: any) {
      if (error.response.status === 401) {
        alert("Invalid credentials");
      }
    }
  };

  return (
    <div className="container_signup">
      <div className="P_signup"> Create an account </div>
      <form>
        <div className="P_signup">
          <label className='P_signup'> Email: </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id=""
          />
        </div>
        <div className="P_signup">
          <label className='P_signup'> Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id=""
          />
        </div>

        <div className="P_signup">
          <Button type="button" primary
                  onClick={() => registerUser()}
          > Submit </Button>
        </div>

      </form>
    </div>
  );
};

export default RegisterPage;