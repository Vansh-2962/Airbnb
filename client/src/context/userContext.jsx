import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "../config/axios";

export const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // writing this useEffect so that whenever the user refreshes the page, the user details are fetched
  useEffect(() => {
    async function getUser() {
      if (!user) {
        // if the user is logged out then we have the loggedout state as true
        const response = await axiosInstance.get("/api/v1/user/me");
        setUser(response.data);
      }
    }
    getUser();
  }, []);
  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};
