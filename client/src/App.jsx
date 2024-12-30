import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Layout from "./pages/Layout";
import Profile from "./pages/Profile";
import Places from "./pages/Places";
import Home from "./pages/Home";
import Place from "./pages/Place";
import Bookings from "./pages/Bookings";
import Booking from "./pages/Booking";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/place/:id" element={<Place />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:subpage?" element={<Profile />} />
          <Route path="/profile/:subpage/:action" element={<Places />} />
          <Route path="/profile/accomodations/:id" element={<Places />} />
          <Route path="/profile/bookings" element={<Bookings />} />
          <Route path="/profile/bookings/:id" element={<Booking />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
