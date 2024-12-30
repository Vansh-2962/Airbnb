import { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { axiosInstance } from "../config/axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Booking({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState();
  const navigate = useNavigate();

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookPlace() {
    try {
      const { data } = await axiosInstance.post("/user/booking", {
        placeId: place._id,
        checkIn,
        checkOut,
        maxGuests,
        name,
        email,
        contact,
        price: place.price * numberOfNights,
      });
      const bookingId = data.booking._id;
      navigate(`/profile/bookings/${bookingId}`);
      toast.success(data.message);
    } catch (error) {
      toast.error("Could not book place");
    }
  }

  return (
    <div className="bg-white px-4 py-3 rounded-xl">
      <h1 className="font-medium text-center text-lg">
        Price: ${place?.price} per night
      </h1>
      <div className="rounded-lg border flex flex-col items-center mt-4">
        <div className="flex items-center justify-between w-full ">
          <div className="flex flex-col border-b border-r p-2 rounded-l-lg w-1/2">
            <label htmlFor="checkIn" className="font-medium">
              Check In
            </label>
            <input
              type="date"
              id="checkIn"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="flex flex-col border-b p-2 rounded-r-lg w-1/2">
            <label htmlFor="checkOut" className="font-medium">
              Check Out
            </label>
            <input
              type="date"
              id="checkOut"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col items-center mt-2 w-full my-3">
          <label htmlFor="" className="font-medium">
            Max Guests
          </label>
          <input
            type="text"
            className="border rounded-lg px-2 w-3/4"
            placeholder="1"
            value={maxGuests}
            onChange={(e) => setMaxGuests(e.target.value)}
          />
        </div>
        {numberOfNights > 0 && (
          <>
            <div className="flex flex-col items-center mt-1 w-full my-3">
              <label htmlFor="" className="font-medium">
                Your full name
              </label>
              <input
                type="text"
                className="border rounded-lg px-2 w-3/4"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-center mt-1 w-full my-3">
              <label htmlFor="" className="font-medium">
                Your Email
              </label>
              <input
                type="email"
                className="border rounded-lg px-2 w-3/4"
                placeholder="johnDoe@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-center mt-1 w-full my-3">
              <label htmlFor="" className="font-medium">
                Your Contact number
              </label>
              <input
                type="number"
                className="border rounded-lg px-2 w-3/4"
                placeholder="+916816238234"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
          </>
        )}
      </div>

      <button className="btn w-full mt-3 " onClick={bookPlace}>
        Reserve this place
        {numberOfNights > 0 ? (
          <span className="ml-1 font-medium">
            ${numberOfNights * place?.price}
          </span>
        ) : (
          ""
        )}
      </button>
    </div>
  );
}
