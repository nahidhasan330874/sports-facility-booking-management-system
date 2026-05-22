 "use client";

import { useEffect, useState } from "react";
import { Button, Card, Input } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { FaLocationDot, FaPlus } from "react-icons/fa6";

const Facilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useState(""); // actual search trigger

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5000/add-facility");
      const data = await res.json();
      setFacilities(data);
    };

    fetchData();
  }, []);

  // filter only when search button clicked
  const filteredFacilities = facilities.filter((item) =>
    item.facilityName.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = () => {
    setQuery(searchText);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setQuery(searchText);
    }
  };

  return (
    <div className="mx-auto container">
      <div className="font-bold text-3xl my-5">All Facilities</div>

     
 
        <div className="flex justify-end gap-2 w-full">
          <Input
            placeholder="Search facility name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
            
          />

          <Button
            onClick={handleSearch}
            className="bg-[#00FF9D] font-bold"
          >
            Search
          </Button>
        </div>

     

   
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 mb-20">
        {filteredFacilities.length > 0 ? (
          filteredFacilities.map((facility) => (
            <Card
              key={facility._id}
              className="group bg-white border shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-3xl overflow-hidden"
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

              <div className="p-3 space-y-3">
                <h2 className="text-2xl font-bold">
                  {facility.facilityName}
                </h2>

                <div className="flex items-center gap-2 text-gray-600">
                  <FaLocationDot className="text-[#00FF9D]" />
                  <p className="text-sm">{facility.location}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">
                      ${facility.price}
                    </h3>
                    <span className="text-sm text-gray-500">
                      per hour
                    </span>
                  </div>

                  <Link href={`/facility/${facility._id}`}>
                    <Button className="bg-[#00FF9D] text-black font-semibold">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-xl mt-10">
            😕 No facility found with this name
          </div>
        )}
      </div>
    </div>
  );
};

export default Facilities;