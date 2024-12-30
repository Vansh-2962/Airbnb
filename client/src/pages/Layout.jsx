import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useContext } from "react";
import { userContext } from "../context/userContext";
export default function Layout() {
  const { user } = useContext(userContext);
  return (
    <>
      <Header user={user} />
      <Outlet />
    </>
  );
}
