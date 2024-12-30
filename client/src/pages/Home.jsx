import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Home() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    async function getAllPlaces() {
      try {
        const { data } = await axiosInstance.get("/api/v1/user/all-places");
        setPlaces(data);
      } catch (error) {
        toast.error("Could not fetch places");
      }
    }
    getAllPlaces();
  }, []);

  return (
    <>
      <main className="max-w-7xl mx-auto  grid md:grid-cols-3 lg:grid-cols-4 mt-10 grid-cols-1 gap-5 p-3">
        {places?.map((place) => (
          <Link
            to={`/place/${place._id}`}
            key={place._id}
            className="flex flex-col leading-5"
          >
            <img
              src={`https://airbnb-zrat.onrender.com/uploads/${place?.photos[0]}`}
              alt="img"
              className="rounded-lg w-80 aspect-square object-cover"
              loading="lazy"
            />
            <span className="font-medium mt-1">{place?.address}</span>
            <small className="text-gray-600 truncate ">{place?.title}</small>
            <p className="mt-2">
              <span className="font-medium">${place.price}</span> per night
            </p>
          </Link>
        ))}
      </main>
    </>
  );
}
