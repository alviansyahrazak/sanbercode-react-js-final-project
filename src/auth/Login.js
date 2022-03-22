import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Input, Button, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const { setLoginStatus } = useContext(UserContext);

  let history = useHistory();

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  //handleSubmit Login
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://backendexample.sanbersy.com/api/user-login", {
        email: input.email,
        password: input.password,
      })
      .then((res) => {
        // console.log(res);
        let token = res.data.token;
        let user = res.data.user;

        Cookies.set("token", token, { expires: 1 });
        Cookies.set("name", user.name, { expires: 1 });
        Cookies.set("email", user.email, { expires: 1 });
        history.push("/");
        setLoginStatus(true);
        setTimeout(() => {
          message.success("Login Success");
        }, 500);
      })
      .catch(() => {
        setTimeout(() => {
          message.error("Wrong Email or Password");
        }, 500);
      });
  };

  // onChange input Email
  const handleChangeEmail = (event) => {
    let typeOfEmail = event.target.value;
    let name = event.target.name;

    if (!typeOfEmail) {
      setErrorEmail("Please input your Password!");
    } else {
      setErrorEmail("");
    }

    setInput({ ...input, [name]: typeOfEmail });
  };

  // onChange input Password
  const handleChangePassword = (event) => {
    let typeOfPassword = event.target.value;
    let name = event.target.name;

    if (!typeOfPassword) {
      setErrorPassword("Please input your Password!");
    } else {
      setErrorPassword("");
    }

    setInput({ ...input, [name]: typeOfPassword });
  };

  return (
    <>
      <div className="login-form-container">
        <h1 className="h1-login-form">Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-login-form">
            <div className="input-label-login-form">
              <label>
                <span className="input-label-span-login-form">*</span> Email
              </label>
            </div>
            <Input
              onChange={handleChangeEmail}
              prefix={<MailOutlined />}
              placeholder="Enter your Email"
              value={input.email}
              name="email"
              required
            />
            {errorEmail && (
              <p className="text-danger-login-form">{errorEmail}</p>
            )}
          </div>

          <div className="input-login-form">
            <div className="input-label-login-form">
              <label>
                <span className="input-label-span-login-form">*</span> Password
              </label>
            </div>

            <Input
              onChange={handleChangePassword}
              prefix={<LockOutlined />}
              placeholder="Enter your Password"
              type="password"
              minLength={6}
              value={input.password}
              name="password"
            />
            {errorPassword && (
              <p className="text-danger-login-form">{errorPassword}</p>
            )}
          </div>

          <Button className="login-form-btn" htmlType="submit">
            Sign in
          </Button>

          <div className="or-register">
            Or<Link to={"/register"}> Register Now!</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
