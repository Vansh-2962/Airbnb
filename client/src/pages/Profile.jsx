import { useContext, useEffect, useState } from "react";
import { userContext } from "../context/userContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../config/axios";
import { toast } from "react-hot-toast";
import { FiPlus } from "react-icons/fi";
import ProfileNav from "../components/ProfileNav";

export default function Profile() {
  const { user, setUser } = useContext(userContext);
  const [subpageBgColor, setSubpageBgColor] = useState("profile");
  const navigate = useNavigate();
  let { subpage } = useParams();
  const [placeData, setPlaceData] = useState([]);

  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logoutHandler() {
    try {
      const response = await axiosInstance.get("/user/logout");
      setUser(null);
      navigate("/login");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    async function getPlaces() {
      const { data } = await axiosInstance.get("/user/places");
      setPlaceData(data);
    }
    getPlaces();
  }, []);

  return (
    <>
      <main className="max-w-[33rem] mx-auto mt-5 p-5 ">
        <ProfileNav subpage={subpage} />
        {subpage === "profile" && (
          <section className="max-w-3xl mx-auto text-center mt-10">
            <div className="flex flex-col">
              <p className="font-medium">
                <span className="font-bold text-3xl text-[#ff385d6d] italic">
                  Hello,{" "}
                </span>{" "}
                {user?.name} ({user?.email})
              </p>
              <button
                className="mt-10 bg-[#ff385d] text-white py-2 rounded-full"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </div>
          </section>
        )}

        {subpage === "bookings" && (
          <section className="max-w-3xl mx-auto text-center mt-10">
            Bookings Page
          </section>
        )}

        {subpage === "accomodations" && (
          <>
            <section className="max-w-3xl mx-auto mt-10 flex justify-center">
              <Link
                to={"/profile/accomodations/new"}
                className="btn px-8 flex items-center"
              >
                <FiPlus size={20} className="mr-2" />
                Add new place
              </Link>
            </section>
          </>
        )}
      </main>
      {subpage === "accomodations" && (
        <div className="max-w-4xl mx-auto ">
          {placeData.length > 0 ? (
            placeData.map((place) => (
              <Link
                to={`/profile/accomodations/${place._id}`}
                className="cursor-pointer flex items-center gap-5 p-3 my-8 shadow-lg rounded-lg hover:scale-105 transition-all duration-200"
              >
                <img
                  src={`https://airbnb-zrat.onrender.com/uploads/${place.photos[0]}`}
                  alt="img"
                  className="w-52 h-40  object-cover rounded-lg"
                />
                <div className="flex flex-col justify-start py-2 px-2 gap-4  w-full  h-44">
                  <h1 className="font-medium">{place.title}</h1>
                  <small className="">{place.description}</small>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center mt-10">You have no accomodations</p>
          )}
        </div>
      )}
    </>
  );
}
