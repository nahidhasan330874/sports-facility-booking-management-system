import { BookingForm } from "@/components/BookingFrom";

 

async function getFacility(id) {
  const res = await fetch(`http://localhost:5000/facilities/${id}`, {
    cache: "no-store",
  });

  return res.json();
}

export default async function FacilityDetails({ params }) {
  const { id } = await params;

  const facility = await getFacility(id);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-10">
        <h1 className="text-3xl font-bold">
          {facility.facilityName}
        </h1>

        <p className="text-gray-500 mt-2">
          {facility.location}
        </p>

        <p className="mt-4 text-lg font-semibold">
          Price: ${facility.price} / hour
        </p>
      </div>

      <BookingForm facility={facility} />
    </div>
  );
}