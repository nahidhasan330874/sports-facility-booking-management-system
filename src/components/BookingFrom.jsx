"use client";

import { useState } from "react";
import {
  Button,
  FieldError,
  Input,
  Label,
  Textarea,
  TextField,
} from "@heroui/react";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";

export function BookingForm({ facility }) {
  const [loading, setLoading] = useState(false);
  const [hours, setHours] = useState(1);

  const totalPrice = Number(hours) * Number(facility.price);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const booking = {
      facilityId: facility._id,
      facilityName: facility.facilityName,
      bookingDate: form.bookingDate.value,
      timeSlot: form.timeSlot.value,
      hours: Number(form.hours.value),
      totalPrice,
    };

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });

      const data = await res.json();

      if (data.insertedId) {
        alert("Booking Successful!");
        form.reset();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-10">
      <div className="bg-white border border-gray-200 shadow-xl rounded-3xl overflow-hidden">
        <div className="relative overflow-hidden">
          <Image
            src={facility.imageUrl}
            alt={facility.facilityName}
            width={800}
            height={500}
            className="w-full h-72 object-cover hover:scale-105 transition duration-500"
          />

           
        </div>

        <div className="p-5 space-y-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {facility.facilityName}
            </h1>

            <p className="text-gray-500 mt-1">{facility.facilityType}</p>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <FaLocationDot className="text-[#00FF9D]" />

            <p>{facility.location}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 rounded-2xl p-2">
              <p className="text-sm text-gray-500">Price Per Hour</p>

              <h3 className="text-2xl font-bold mt-1">${facility.price}</h3>
            </div>

            <div className="bg-gray-100 rounded-2xl p-2">
              <p className="text-sm text-gray-500">Capacity</p>

              <h3 className="text-2xl font-bold mt-1">{facility.capacity}</h3>
            </div>
          </div>

          <div className="bg-gray-100 rounded-2xl p-2">
            <p className="text-sm text-gray-500 mb-2">Available Time Slots</p>

            <div className="flex flex-wrap gap-2">
              {facility.availableTimeSlots?.map((slot, index) => (
                <span
                  key={index}
                  className="bg-[#00FF9D]/20 text-black px-3 py-1 rounded-full text-sm font-medium"
                >
                  {slot}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gray-100 rounded-2xl p-2">
            <p className="text-sm text-gray-500 mb-1">Description</p>

            <p className="text-gray-700 leading-relaxed">
              {facility.description}
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 shadow-xl rounded-3xl p-8 space-y-5"
      >
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Book Facility</h2>

          <p className="text-gray-500 mt-1">Complete your booking details</p>
        </div>

        <TextField name="facilityName" isRequired>
          <Label> Name</Label>
          <Input
            label="Facility Name"
            name="facilityName"
            placeholder={facility.facilityName}
            className="rounded-2xl"
          />
          <FieldError />
        </TextField>

        <TextField name="facilityName" isRequired>
          <Label>Booking Data</Label>
          <Input
            label="Booking Date"
            name="bookingDate"
            type="date"
            required
            variant="bordered"
            className="rounded-2xl"
          />
          <FieldError />
        </TextField>

        <TextField name="facilityName" isRequired>
          <Label>Time Slot</Label>

          <Input
            label="Time Slot"
            name="timeSlot"
            placeholder="10AM - 12PM"
            required
            variant="bordered"
            className="rounded-2xl"
          />
          <FieldError />
        </TextField>

        <TextField name="facilityName" isRequired>
          <Label>Hours</Label>
          <Input
            label="Hours"
            name="hours"
            type="number"
            min={1}
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="Enter booking hours"
            required
            variant="bordered"
            className="rounded-2xl"
          />
          <FieldError />
        </TextField>

        {/* TOTAL PRICE */}
        <div className="bg-[#00FF9D]/10 border border-[#00FF9D] rounded-2xl p-5">
          <h3 className="text-lg font-semibold text-gray-700">Total Price</h3>

          <p className="text-4xl font-extrabold text-black mt-2">
            ${totalPrice}
          </p>
        </div>

        <Button
          type="submit"
          isLoading={loading}
          className="w-full bg-[#00FF9D] hover:bg-[#00e68a] text-black font-bold py-3 rounded-2xl text-lg"
        >
          Confirm Booking
        </Button>
      </form>
    </div>
  );
}
