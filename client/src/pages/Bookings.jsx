import { useEffect, useState } from "react";
import ProfileNav from "../components/ProfileNav";
import { axiosInstance } from "../config/axios";

import BookingDates from "../components/BookingDates";
import { Link, useParams } from "react-router-dom";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    async function getBookings() {
      const { data } = await axiosInstance.get("/user/bookings");
      setBookings(data);
    }
    getBookings();
  }, []);

  return (
    <>
      <main className="max-w-[33rem] mx-auto mt-5 p-5 ">
        <ProfileNav />
      </main>
      <div className="p-4 max-w-3xl mx-auto">
        {bookings?.map((booking) => (
          <Link to={`/profile/bookings/${booking._id}`} key={booking._id}>
            <div className="flex items-center mt-5 rounded-xl overflow-hidden bg-gray-100 ">
              <div className="w-44">
                <img
                  src={`http://localhost:8000/uploads/${booking?.placeId?.photos[0]}`}
                  alt="pic"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col px-3 justify-start ">
                <h2 className="text-lg">{booking?.placeId?.title}</h2>
                <BookingDates booking={booking} />
                <span className="font-medium mt-4 text-xl">
                  Total price: ${booking?.price}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
