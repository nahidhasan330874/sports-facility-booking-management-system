 "use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@heroui/react";
import { MdDelete, MdUpdate } from "react-icons/md";
import UpdateModal from "./UpdateModal";

const ManageFacilityList = ({ facilities }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
 
  const openModal = (facility) => {
    setSelectedFacility(facility);
    setIsOpen(true);
  };

 
  const handleDelete = async (id) => {
    const ok = confirm("Delete Facility?");
    if (!ok) return;

    await fetch(`http://localhost:5000/add-facility/${id}`, {
      method: "DELETE",
    });

    location.reload();
  };

  return (
    <div className="overflow-x-auto mt-8">
       <UpdateModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        facility={selectedFacility}
        setFacility={setSelectedFacility}
      />
      <table className="w-full border rounded-xl overflow-hidden">
        <thead className="bg-[#00FF9D] text-black">
          <tr>
            <th className="p-4 text-left">Image</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Location</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {facilities?.map((facility) => (
            <tr key={facility._id} className="border-b hover:bg-gray-50">
              <td className="p-4">
                <Image
                  src={facility.imageUrl}
                  width={80}
                  height={60}
                  alt={facility.facilityName}
                  className="rounded-lg object-cover"
                />
              </td>

              <td className="p-4 font-semibold">
                {facility.facilityName}
              </td>

              <td className="p-4">{facility.location}</td>

              <td className="p-4 font-bold">${facility.price}</td>

              <td className="p-4">
                <div className="flex gap-2 justify-center">
                  
                  <Button
                    className="bg-amber-500 hover:bg-amber-600 text-white"
                    size="sm"
                    onPress={() => openModal(facility)}
                  >
                    <MdUpdate />
                  </Button>
 
                  <Button
                    className="border border-red-500 text-black bg-white hover:text-white hover:bg-red-700"
                    size="sm"
                    onPress={() => handleDelete(facility._id)}
                  >
                    <MdDelete />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
     
    </div>
  );
};

export default ManageFacilityList;