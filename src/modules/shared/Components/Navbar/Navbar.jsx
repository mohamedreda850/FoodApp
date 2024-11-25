import { useContext, useEffect } from "react";
import avatar from "./../../../../assets/images/avatar.png";

import { AuthContext } from "../../../../context/AuthContext";

export default function Navbar() {
  const {loginData} = useContext(AuthContext)
  useEffect(() => {console.log(loginData?.userName);
  },[])
  return (
    <div className="bg-white py-2 px-2 d-flex justify-content-end align-items-center">
      <img src={avatar} className="mx-2" alt="user image" />
      <span >{loginData?.userName}</span>
    </div>
  );
}
