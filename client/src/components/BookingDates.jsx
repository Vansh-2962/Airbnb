import { differenceInCalendarDays, format } from "date-fns";
import { CiCalendarDate } from "react-icons/ci";
import { MdOutlineModeNight } from "react-icons/md";

export default function BookingDates({ booking }) {
  const checkInDate = booking?.checkIn ? new Date(booking.checkIn) : null;
  const checkOutDate = booking?.checkOut ? new Date(booking.checkOut) : null;

  return (
    <>
      <div className="flex gap-4 text-gray-600">
        <h3 className="flex items-center gap-1">
          <MdOutlineModeNight size={15} />
          {checkInDate && checkOutDate
            ? `${differenceInCalendarDays(checkOutDate, checkInDate)} nights`
            : "Invalid dates"}
        </h3>
        <div className="flex items-center gap-1  text-sm">
          <CiCalendarDate size={18} />
          {checkInDate ? format(checkInDate, "dd/MM/yyyy") : "Invalid date"}
        </div>
        &rarr;
        <div className="flex items-center gap-1 text-sm ">
          <CiCalendarDate size={18} />
          {checkOutDate ? format(checkOutDate, "dd/MM/yyyy") : "Invalid date"}
        </div>
      </div>
    </>
  );
}
