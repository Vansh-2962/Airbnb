import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../config/axios";
import { IoLocationOutline } from "react-icons/io5";
import PlaceGallery from "../components/PlaceGallery";
import BookingDates from "../components/BookingDates";

export default function Booking() {
  const { id } = useParams();

  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    async function getBookings() {
      const { data } = await axiosInstance.get("/user/bookings");

      const bookedPlace = data.find((booking) => booking._id === id);
      console.log(bookedPlace);
      setBookings(bookedPlace);
    }
    getBookings();
  }, []);

  return (
    <>
      <main className="max-w-6xl mx-auto px-5 my-5">
        <div>
          <h1 className="text-xl font-medium">{bookings?.placeId?.title}</h1>
          <span className="underline text-gray-600 flex items-center gap-1 mt-1">
            <IoLocationOutline />
            {bookings?.placeId?.address}
          </span>
        </div>

        <div className="my-5 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-between shadow-md ">
          <div className="p-3">
            <BookingDates booking={bookings} />
          </div>
          <div className="bg-[#ff385c]">
            <p className="text-white p-3 rounded-xl font-medium">
              Total Price: ${bookings?.price}
            </p>
          </div>
        </div>

        <PlaceGallery place={bookings?.placeId} />

        <div className="bg-gray-100 p-3 mt-8 flex flex-col rounded-xl">
          <h1 className="font-semibold text-2xl">Owned by</h1>
          <span>{bookings?.placeId?.owner?.name}</span>
          <small className="text-gray-600">
            {bookings?.placeId?.owner?.email}
          </small>
        </div>

        <div className="mt-5">
          <h1 className="font-semibold text-2xl">Description</h1>
          {bookings?.placeId?.description}
        </div>
        <div className="mt-5">
          <h1 className="font-semibold text-2xl">Extra Info</h1>
          {bookings?.placeId?.extraInfo}
        </div>
        <div className="mt-5">
          <h1 className="font-semibold text-2xl">Perks</h1>
          {bookings?.placeId?.perks?.map((perk, index) => (
            <span key={index} className="mr-2">
              {perk}
            </span>
          ))}
        </div>
      </main>
    </>
  );
}
