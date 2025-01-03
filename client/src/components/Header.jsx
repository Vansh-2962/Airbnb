import airbnb from "../assets/airbnb.jfif";
import { Link } from "react-router-dom";
export default function Header({ user }) {
  return (
    <>
      <nav className="flex items-center justify-between px-5">
        {/* logo */}
        <Link to={"/"}>
          <img src={airbnb} alt="airbnb" width={120} />
        </Link>

        {/* navlinks */}
        <div className="flex font-medium items-center border shadow-lg rounded-full px-3 py-2">
          <div className="border-r px-3">
            <Link>Anywhere</Link>
          </div>
          <div className="border-r px-3">
            <Link>Any week</Link>
          </div>
          <div className="flex  gap-3 px-3">
            <Link className="text-gray-400 font-normal">Add guests</Link>
          </div>
          <button className="bg-[#ff385c] text-white rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>

        {/* profile/login */}
        <div className="px-3 py-2 flex font-medium items-center border shadow-lg rounded-full gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <Link to={user ? "/profile" : "/login"} className="flex items-center gap-1 ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-8"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                clipRule="evenodd"
              />
            </svg>
            {user?.name}
          </Link>
        </div>
      </nav>
    </>
  );
}
