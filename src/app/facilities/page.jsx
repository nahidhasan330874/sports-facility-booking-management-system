import { Button, Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { FaLocationDot, FaPlus } from "react-icons/fa6";

const facilities = async () => {
  const res = await fetch("http://localhost:5000/add-facility");
  const facility = await res.json();
  return (
    <div className="mx-auto container">
      <div className="font-bold text-3xl my-5">All Facilities</div>
      <div className="flex justify-end items-center gap-1">
        <Link href="/add-facility">
          <Button
            type="submit"
            variant="outline"
            className=" rounded bg-[#00FF9D]"
          >
            <FaPlus />
            <span className="font-bold"> Add</span>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 mb-20">
        {facility.map((facility) => (
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
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {facility.facilityName}
                </h2>

                <p className="text-sm text-gray-500 ">
                  Premium Sports Facility
                </p>
              </div>

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

                <Link href={`/facility/${facility._id}`}>
                  <Button
                    radius="full"
                    className="bg-[#00FF9D] hover:bg-[#00e68a] text-black font-semibold px-6 py-2 shadow-lg"
                  >
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default facilities;
