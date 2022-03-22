import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const CreateBy = () => {
  return (
    <>
      <div>
        <Footer
          style={{
            textAlign: "center",
            backgroundColor: "#fff",
            border: "1px solid #e5eef5",
            color: "#7f98ae",
          }}
        >
          Alvix Play ©2022 Created by Alviansyah Razak
        </Footer>
      </div>
    </>
  );
};

export default CreateBy;
