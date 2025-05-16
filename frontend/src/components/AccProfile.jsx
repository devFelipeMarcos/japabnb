import React from "react";
import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const AccProfile = () => {
  const { user, setUser } = useUserContext();
  const [redirect, setRedirect] = useState(false);

  const loggout = async () => {
    try {
      const { data } = await axios.post("/users/loggout");
      setUser(null);
      console.log(data);
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (redirect) return <Navigate to="/" />;
  return (
    <div className="flex flex-col gap-4">
      <p>
        Logado como {user?.name} ({user?.email})
      </p>

      <button
        onClick={loggout}
        className="bg-primary-400 min-w-44 cursor-pointer rounded-full px-4 py-2 text-white"
      >
        Loggout
      </button>
    </div>
  );
};

export default AccProfile;
