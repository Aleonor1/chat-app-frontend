import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import chowl from "../assets/owl-logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/routes";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      console.log("in validation", registerRoute);
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data === false) {
        toast.error(data.msg, toastOptions);
      } else if (data === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
      }
      navigate("/");
    }
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleChangeUsername = (event) => {
    setUsername({ ...username, [event.target.name]: event.target.value });
    event.preventDefault();
  };

  const handleChangeEmail = (event) => {
    setEmail({ ...email, [event.target.name]: event.target.value });
    event.preventDefault();
  };
  const handleChangePassword = (event) => {
    setPassword({ ...password, [event.target.name]: event.target.value });
    event.preventDefault();
  };
  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword({
      ...confirmPassword,
      [event.target.name]: event.target.value,
    });
    event.preventDefault();
  };

  const handleValidation = () => {
    if (username.length < 3) {
      toast.error("Username length should be grater than 3", {
        toastOptions,
      });
      return false;
    } else if (password.length < 8) {
      toast.error("Password length should be grater than 8", {
        toastOptions,
      });
      return false;
    } else if (email.length === 0) {
      toast.error("Email is required to finish to registration", {
        toastOptions,
      });
      return false;
    }
    return true;
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={chowl} alt="" />
            <h1>Chowl</h1>
          </div>

          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(event) => handleChangeUsername(event)}
          />

          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(event) => handleChangeEmail(event)}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(event) => handleChangePassword(event)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(event) => handleChangeConfirmPassword(event)}
          />

          <button type="submit">Create User</button>
          <span>
            Already have an account? <Link to="/login">Login</Link>{" "}
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Register;
