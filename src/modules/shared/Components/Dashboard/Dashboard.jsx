import React from "react";
import Header from "../Header/Header";
import headerImg from './../../../../assets/images/Group 48102648.png'

export default function Dashboard({loginData}) {
  return (
    <>
      <Header
        title={`Welcome ${loginData?.userName}` }
        description={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        
        }
        imag={headerImg}
      />
      <div>Dashboard</div>
    </>
  );
}
