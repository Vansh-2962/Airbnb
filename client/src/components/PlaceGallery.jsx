import { useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";

export default function PlaceGallery({ place }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <>
        <div className="w-full min-h-[85vh] bg-black/90 absolute top-0 z-10 p-5">
          <button
            className="fixed bg-gray-200 py-1 px-3 rounded-lg flex items-center gap-1 top-4 right-4"
            onClick={() => setShowAllPhotos(false)}
          >
            <RxCross2 /> Close all photos
          </button>
          <h1 className="text-white">All Photos</h1>
          {place?.photos?.map((photo) => (
            <div className="  flex items-center justify-center gap-5">
              <img
                src={`http://localhost:8000/uploads/${photo}`}
                alt="pics"
                className="mt-4 rounded-xl"
              />
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="grid grid-cols-[2fr_1fr] mt-10 rounded-lg overflow-hidden gap-2 ">
        <div className="">
          <img
            src={`http://localhost:8000/uploads/${place?.photos[0]}`}
            alt="photo1"
            loading="lazy"
          />
        </div>
        <div className="grid grid-rows-2 relative">
          <img
            src={`http://localhost:8000/uploads/${place?.photos[1]}`}
            alt="photo2"
            loading="lazy"
          />
          <img
            src={`http://localhost:8000/uploads/${place?.photos[2]}`}
            alt="photo3"
            loading="lazy"
          />
          <button
            className="bg-gray-100 absolute bottom-2 right-2 py-1 px-3 rounded-xl shadow shadow-gray-500 flex items-center gap-2"
            onClick={() => setShowAllPhotos(true)}
          >
            <CgMenuGridO /> Show more photos
          </button>
        </div>
      </div>
    </>
  );
}
