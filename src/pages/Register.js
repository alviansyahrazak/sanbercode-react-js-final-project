import React, { useContext, useState } from "react";
import { Input, Button, message } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const Register = () => {
  const { setLoginStatus } = useContext(UserContext);

  let history = useHistory();

  const [input, setInput] = useState({ name: "", email: "", password: "" });

  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(input);
    axios
      .post("https://backendexample.sanbersy.com/api/register", {
        name: input.name,
        email: input.email,
        password: input.password,
      })
      .then(() => {
        history.push("/login");
        setLoginStatus(true);
        setTimeout(() => {
          message.success("Register Success");
        }, 500);
      })
      .catch(() => {
        setTimeout(() => {
          message.error("Register Failed");
        }, 500);
      });
  };

  const handleChangeName = (event) => {
    let valueName = event.target.value;
    let name = event.target.name;

    if (!valueName) {
      setErrorName("Please input your Name!");
    } else {
      setErrorName("");
    }

    setInput({ ...input, [name]: valueName });
  };

  const handleChangeEmail = (event) => {
    let valueEMail = event.target.value;
    let name = event.target.name;

    if (!valueEMail) {
      setErrorEmail("Please input your Email!");
    } else {
      setErrorEmail("");
    }

    setInput({ ...input, [name]: valueEMail });
  };

  const handleChangePassword = (event) => {
    let valuePassword = event.target.value;
    let name = event.target.name;

    if (!valuePassword) {
      setErrorPassword("Please input your Password");
    } else {
      setErrorPassword("");
    }

    setInput({ ...input, [name]: valuePassword });
  };

  return (
    <>
      <div className="register-container">
        <h1 className="h1-register">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="label-register-form">
            <label>
              <span className="span-register-form">*</span>Name
            </label>
          </div>
          <Input
            className="register-input"
            onChange={handleChangeName}
            prefix={<UserOutlined />}
            placeholder="Enter your Name"
            value={input.name}
            name="name"
          />
          {errorName && <p className="text-danger-login-form">{errorName}</p>}

          <div className="label-register-form">
            <label>
              <span className="span-register-form">*</span>Email
            </label>
          </div>
          <Input
            className="register-input"
            onChange={handleChangeEmail}
            prefix={<MailOutlined />}
            placeholder="Enter your Email"
            value={input.email}
            name="email"
          />
          {errorEmail && <p className="text-danger-login-form">{errorEmail}</p>}

          <div className="label-register-form">
            <label>
              <span className="span-register-form">*</span>Password
            </label>
          </div>
          <Input
            className="register-input"
            onChange={handleChangePassword}
            prefix={<LockOutlined />}
            type="password"
            placeholder="Enter your Password"
            value={input.password}
            name="password"
          />
          {errorPassword && (
            <p className="text-danger-login-form">{errorPassword}</p>
          )}

          <div>
            <Button className="register-form-btn" htmlType="submit">
              Register
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
