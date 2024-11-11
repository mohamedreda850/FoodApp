import { useEffect } from "react";
import avatar from "./../../../../assets/images/avatar.png";
import Login from './../../../authentication/Components/Login/Login';
export default function Navbar({ loginData }) {
  useEffect(() => {console.log(loginData?.userName);
  },[])
  return (
    <div className="bg-white py-2 px-2 d-flex justify-content-end align-items-center">
      <img src={avatar} className="mx-2" alt="user image" />
      <span >{loginData?.userName}</span>
    </div>
  );
}
