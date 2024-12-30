import { useEffect, useState } from "react";
import { LiaDogSolid } from "react-icons/lia";
import { axiosInstance } from "../config/axios";
import { toast } from "react-hot-toast";
import { LuLoaderCircle } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

export default function Places() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [addedPhotos, setAddedPhotos] = useState([]);

  useEffect(() => {
    async function getPlace() {
      if (id) {
        const { data } = await axiosInstance.get(`/user/places/${id}`);
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
      }
    }
    getPlace();
  }, [id]);

  function handlePerks(e) {
    e.preventDefault();
    if (e.target.checked) {
      setPerks((perks) => [...perks, e.target.name]);
    } else {
      setPerks((perks) => [...perks.filter((p) => p !== e.target.name)]);
    }
  }

  async function handleFileChange(e) {
    e.preventDefault();
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    try {
      setLoading(true);
      const response = await axiosInstance.post("/user/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setAddedPhotos((addedPhotos) => [...addedPhotos, ...response.data]);
    } catch (error) {
      toast.error("Could not upload photos");
    } finally {
      setLoading(false);
    }
  }

  async function handleFileUploadByUrl(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axiosInstance.post("/user/upload-by-url", {
        photoUrl,
      });
      setPhotoUrl("");
      setAddedPhotos((addedPhotos) => [...addedPhotos, response.data.newName]);
    } catch (error) {
      toast.error("Could not upload photos");
    } finally {
      setLoading(false);
    }
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/user/places", {
        title,
        address,
        photoUrl,
        description,
        perks,
        price,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        addedPhotos,
      });
      navigate("/profile/accomodations");
    } catch (error) {
      toast.error("Could not add place");
    }
  }

  async function editPlace(e) {
    e.preventDefault();
    if (id != "new") {
      const response = await axiosInstance.put(`/user/places/${id}`, {
        title,
        address,
        photoUrl,
        price,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        addedPhotos,
      });
      navigate("/profile/accomodations");
    }
  }

  async function removePhoto(e, filename) {
    e.preventDefault();
    try {
      const response = await axiosInstance.delete(
        `/user/photo/${filename}/${id}`
      );
      setAddedPhotos((addedPhotos) =>
        addedPhotos.filter((photo) => photo !== filename)
      );
    } catch (error) {
      toast.error("Could not remove photo");
    }
  }

  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        className="mt-5 max-w-4xl mx-auto flex flex-col gap-8"
      >
        <div className="flex flex-col ">
          <label htmlFor="" className="text-2xl">
            Title
          </label>
          <small className="text-gray-500">
            Title should be short and catchy
          </small>
          <input
            type="text"
            className="border rounded-lg mt-2 p-1 px-3"
            placeholder="Add a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="" className="text-2xl">
            Address
          </label>
          <small className="text-gray-500">Address of this place</small>
          <input
            type="text"
            className="border rounded-lg mt-2 p-1 px-3"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* images */}
        <div className="flex flex-col items-start">
          <label htmlFor="" className="text-2xl">
            Photos
          </label>
          <small className="text-gray-500">Add photos of this place</small>
          <div className="flex gap-1 items-center mt-2 w-full">
            <input
              type="text"
              className="border rounded-lg  p-1 px-3 grow"
              placeholder="Add using a link......jpg"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
            <button
              className="text-xs bg-gray-200 px-4 py-2 rounded-lg font-medium"
              onClick={handleFileUploadByUrl}
            >
              {loading ? <LuLoaderCircle className="animate-spin" /> : "Add"}
            </button>
          </div>
          <div className="w-full items-center grid grid-cols-5 py-3 ">
            {addedPhotos.length > 0 &&
              addedPhotos.map((photo, index) => (
                <div key={index} className="p-1 w-full relative">
                  <img
                    src={`https://airbnb-zrat.onrender.com/uploads/${photo}`}
                    className="w-34 h-30 object-cover rounded-lg"
                  />
                  <button
                    className="absolute top-0 right-0 bg-gray-200 rounded-full p-1"
                    onClick={(e) => {
                      removePhoto(e, photo);
                    }}
                  >
                    <RxCross2 />
                  </button>
                </div>
              ))}
          </div>
          <label className="text-xs border mt-3 px-10 py-8 rounded-lg font-medium flex items-center gap-1 shadow-md">
            <input
              type="file"
              className="hidden"
              multiple
              onChange={(e) => handleFileChange(e)}
            />

            {loading ? (
              <LuLoaderCircle className="animate-spin" />
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  class="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                  />
                </svg>
                Upload
              </>
            )}
          </label>
        </div>

        <div className="flex flex-col ">
          <label htmlFor="" className="text-2xl">
            Description
          </label>
          <small className="text-gray-500">
            Add some description of this place
          </small>
          <textarea
            type="text"
            className="border rounded-lg mt-2 p-1 px-3"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex flex-col ">
          <label htmlFor="" className="text-2xl">
            Perks
          </label>
          <small className="text-gray-500">Add perks</small>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
            <label className="flex items-center gap-3 p-3 border rounded-lg mt-3">
              <input
                type="checkbox"
                name="wifi"
                checked={perks.includes("wifi")}
                onChange={(e) => handlePerks(e)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                class="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
                />
              </svg>
              <small className="-ml-2">Wifi</small>
            </label>

            <label className="flex items-center gap-3 p-3 border rounded-lg mt-3">
              <input
                type="checkbox"
                name="parking"
                checked={perks.includes("parking")}
                onChange={(e) => handlePerks(e)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                class="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>
              <small className="-ml-2">Free parking spot</small>
            </label>

            <label className="flex items-center gap-3 p-3 border rounded-lg mt-3">
              <input
                type="checkbox"
                name="tv"
                onChange={(e) => handlePerks(e)}
                checked={perks.includes("tv")}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                class="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>
              <small className="-ml-2">TV</small>
            </label>

            <label className="flex items-center gap-3 p-3 border rounded-lg mt-3">
              <input
                type="checkbox"
                name="radio"
                checked={perks.includes("radio")}
                onChange={(e) => handlePerks(e)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                class="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m3.75 7.5 16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 0 0 4.5 21h15a2.25 2.25 0 0 0 2.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0 0 12 6.75Zm-1.683 6.443-.005.005-.006-.005.006-.005.005.005Zm-.005 2.127-.005-.006.005-.005.005.005-.005.005Zm-2.116-.006-.005.006-.006-.006.005-.005.006.005Zm-.005-2.116-.006-.005.006-.005.005.005-.005.005ZM9.255 10.5v.008h-.008V10.5h.008Zm3.249 1.88-.007.004-.003-.007.006-.003.004.006Zm-1.38 5.126-.003-.006.006-.004.004.007-.006.003Zm.007-6.501-.003.006-.007-.003.004-.007.006.004Zm1.37 5.129-.007-.004.004-.006.006.003-.004.007Zm.504-1.877h-.008v-.007h.008v.007ZM9.255 18v.008h-.008V18h.008Zm-3.246-1.87-.007.004L6 16.127l.006-.003.004.006Zm1.366-5.119-.004-.006.006-.004.004.007-.006.003ZM7.38 17.5l-.003.006-.007-.003.004-.007.006.004Zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007Zm-.5 1.873h-.008v-.007h.008v.007ZM17.25 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 4.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                />
              </svg>

              <small className="-ml-2">Radio</small>
            </label>

            <label className="flex items-center gap-3 p-3 border rounded-lg mt-3">
              <input
                type="checkbox"
                name="pets"
                checked={perks.includes("pets")}
                onChange={(e) => handlePerks(e)}
              />
              <LiaDogSolid />
              <small className="-ml-2">Pets</small>
            </label>

            <label className="flex items-center gap-3 p-3 border rounded-lg mt-3">
              <input
                type="checkbox"
                name="entrance"
                onChange={(e) => handlePerks(e)}
                checked={perks.includes("entrance")}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                class="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                />
              </svg>

              <small className="-ml-2">Private entrance</small>
            </label>
          </div>
        </div>

        <div className="flex flex-col ">
          <label htmlFor="" className="text-2xl">
            Extra Info
          </label>
          <small className="text-gray-500">
            Add some extra information about your place
          </small>
          <textarea
            type="text"
            className="border rounded-lg mt-2 p-1 px-3"
            placeholder="Info"
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="" className="text-2xl">
            Check In&Out time
          </label>
          <small className="text-gray-500">
            Add check in and check out time
          </small>
          <div className="grid sm:grid-cols-4 gap-2 mt-4 ">
            <div className="flex flex-col">
              <label htmlFor="">Check In</label>
              <input
                type="text"
                placeholder="14"
                className="border rounded-lg mt-2 p-1 px-3"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Check Out</label>
              <input
                type="text"
                placeholder="11"
                className="border rounded-lg mt-2 p-1 px-3"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Max guests</label>
              <input
                type="number"
                placeholder="1"
                className="border rounded-lg mt-2 p-1 px-3"
                value={maxGuests}
                onChange={(e) => setMaxGuests(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Price</label>
              <input
                type="number"
                placeholder="1"
                className="border rounded-lg mt-2 p-1 px-3"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
        </div>

        {id !== "new" && (
          <button type="submit" className="btn mb-10" onClick={editPlace}>
            Update
          </button>
        )}
        {id === "new" && (
          <button type="submit" className="btn mb-10">
            Save
          </button>
        )}
      </form>
    </>
  );
}
