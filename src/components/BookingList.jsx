"use client";

import { Button, Card } from "@heroui/react";
import { FaCalendarAlt, FaClock, FaMoneyBillWave } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function BookingList({ bookings }) {
  const router = useRouter();
  const cancelBooking = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to cancel this booking?",
    );

    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/bookings/${id}`, {
        method: "DELETE",
      });

      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  if (!bookings?.length) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">No Booking Found</h2>

        <p className="text-gray-500 mt-2">Book your first facility</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {bookings.map((item) => (
        <Card
          key={item._id}
          className="
          rounded-3xl
          shadow-lg
          hover:shadow-2xl
          transition
          duration-300
          "
        >
          <Card className="p-4">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <h2
                    className="
                  text-3xl
                  font-bold
                  text-gray-900
                  "
                  >
                    {item.facilityName}
                  </h2>

                  <span
                    className="
                    inline-flex
                    px-2
                  
                    rounded-full
                   
                    text-yellow-700
                    text-sm
                    font-semibold
                    "
                  >
                    {item.status}
                  </span>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaCalendarAlt />

                    <p>{item.bookingDate}</p>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700">
                    <FaClock />

                    <p>{item.timeSlot}</p>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700">
                    <FaMoneyBillWave />

                    <p className="font-bold">${item.totalPrice}</p>
                  </div>
                </div>
              </div>

              <div
                className="
                flex
                text-sm
                items-center
                
                "
              >
                <Button
                  className="
                 bg-red-600
                 text-white
                 hover:bg-red-700
                 "
                  radius="full"
                  size="md"
                  onPress={() => cancelBooking(item._id)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </Card>
      ))}
    </div>
  );
}
