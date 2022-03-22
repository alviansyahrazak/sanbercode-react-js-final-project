import React, { useState } from "react";
import { Input, Button, message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

const ChangePassword = () => {
  const [input, setInput] = useState({
    current_password: "",
    new_password: "",
    new_confirm_password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        `https://backendexample.sanbersy.com/api/change-password`,
        {
          current_password: input.current_password,
          new_password: input.new_password,
          new_confirm_password: input.new_confirm_password,
        },
        {
          headers: { Authorization: "Bearer " + Cookies.get("token") },
        }
      )
      .then(() => {
        // console.log(res);
        setTimeout(() => {
          message.success("Change Password Success");
        }, 500);
      })
      .catch(() => {
        setTimeout(() => {
          message.error("Wrong Old Password or Confirm Password");
        }, 500);
      });
  };

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setInput({ ...input, [name]: value });
  };

  return (
    <>
      <div className="change-password-container">
        <h1 className="h1-change-password">Change Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="label-change-password-form">
            <label>
              <span className="span-change-password-form">*</span>Old Password
            </label>
          </div>
          <Input
            className="change-password-input"
            onChange={handleChange}
            type="password"
            minLength={6}
            placeholder="Enter Old Password"
            value={input.current_password}
            name="current_password"
          />

          <div className="label-change-password-form">
            <label>
              <span className="span-change-password-form">*</span>New Password
            </label>
          </div>
          <Input
            className="change-password-input"
            onChange={handleChange}
            type="password"
            minLength={6}
            placeholder="Enter New Password"
            value={input.new_password}
            name="new_password"
          />

          <div className="label-change-password-form">
            <label>
              <span className="span-change-password-form">*</span>Confirm New
              Password
            </label>
          </div>
          <Input
            className="change-password-input"
            onChange={handleChange}
            type="password"
            minLength={6}
            placeholder="Confirm New Password"
            value={input.new_confirm_password}
            name="new_confirm_password"
          />

          <Button
            type="primary"
            htmlType="submit"
            className="change-password-form-btn"
          >
            Change Password
          </Button>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
