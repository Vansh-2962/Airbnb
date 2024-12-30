import { useParams } from "react-router-dom";
import { axiosInstance } from "../config/axios";
import { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { CgMenuGridO } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import Booking from "../components/Booking";
import PlaceGallery from "../components/PlaceGallery";

export default function Place() {
  const { id } = useParams();
  const [place, setPlace] = useState();

  useEffect(() => {
    async function getPlace() {
      const { data } = await axiosInstance.get(`/api/v1/user/places/${id}`);
      setPlace(data);
    }
    getPlace();
  }, []);

  return (
    <>
      <main className="max-w-6xl mx-auto mt-4 p-2 px-4 ">
        <div>
          <h1 className="text-xl font-medium">{place?.title}</h1>
          <span className="underline text-gray-600 flex items-center gap-1 mt-1">
            <IoLocationOutline />
            {place?.address}
          </span>
        </div>

        <PlaceGallery place={place} />

        <div className="mt-4">
          <h2 className="font-semibold text-2xl">Description</h2>
          <p className="leading-4 mt-2">{place?.description}</p>
        </div>

        <div className="grid grid-cols-[2fr_1fr] mt-10 bg-gray-100 rounded-xl p-5 gap-5 text-sm">
          <div className="py-3">
            <div className="">
              <p className="font-medium">
                Check-In: <span className="font-normal">{place?.checkIn}</span>
              </p>
            </div>
            <div className="">
              <p className="font-medium">
                Check-Out:{" "}
                <span className="font-normal">{place?.checkOut}</span>
              </p>
            </div>
            <div className="">
              <p className="font-medium">
                Max guests:{" "}
                <span className="font-normal">{place?.maxGuests}</span>
              </p>
            </div>

            <div className="mt-5">
              <h2 className="font-semibold text-2xl">Extra info</h2>
              <p className="text-xs mt-3 text-gray-700">{place?.extraInfo}</p>
            </div>
          </div>

          <Booking place={place} />
        </div>

        <div className="mt-5">
          <h1 className="font-semibold text-2xl">Perks</h1>
          {place?.perks?.map((perk, index) => (
            <span key={index} className="mr-2">
              {perk}
            </span>
          ))}
        </div>
      </main>
    </>
  );
}
