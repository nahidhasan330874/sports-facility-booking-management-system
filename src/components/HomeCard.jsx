 import { Card } from "@heroui/react";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import BookNowButton from "@/components/BookNowButton";

async function getFacilities() {
  try {
    const res = await fetch(
      "http://localhost:5000/facilities?limit=6",
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed");

    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function HomeCard() {
  const facilities = await getFacilities();

  return (
    <section className="max-w-7xl mx-auto py-10 px-4 my-10">
      <h1 className="text-3xl font-bold mb-8">Featured Facilities</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
        {facilities.map((facility) => (
          <Card
            key={facility._id}
            className="group bg-white border border-gray-200 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-3xl overflow-hidden"
          >
            <div className="overflow-hidden relative">
              <Image
                src={facility.imageUrl}
                alt={facility.facilityName}
                width={600}
                height={400}
                className="w-full h-45 object-cover group-hover:scale-110 transition-transform duration-500"
              />

              <div className="absolute top-4 right-4 bg-[#00FF9D] text-black text-sm font-bold px-4 py-1 rounded-full shadow">
                Available
              </div>
            </div>

            <div className="p-2 space-y-3">
              <h2 className="text-2xl font-bold text-gray-900">
                {facility.facilityName}
              </h2>

              <p className="text-sm text-gray-500">
                Premium Sports Facility
              </p>

              <div className="flex items-center gap-2 text-gray-600">
                <FaLocationDot className="text-[#00FF9D] text-lg" />
                <p className="text-sm font-medium">{facility.location}</p>
              </div>

              <div className="border-t my-4 border-gray-200"></div>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <h3 className="text-xl font-extrabold text-gray-900">
                    ${facility.price}
                  </h3>
                  <span className="text-sm text-gray-500">per hour</span>
                </div>
 
                <BookNowButton id={facility._id} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
