"use client";

import { Button, Input, Label } from "@heroui/react";

const UpdateModal = ({ isOpen, setIsOpen, facility, setFacility }) => {
  if (!isOpen || !facility) return null;

  const handleUpdate = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:5000/add-facility/${facility._id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(facility),
    });

    setIsOpen(false);
    location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 w-[400px] rounded-xl">
        <h2 className="text-lg font-bold mb-3">Update Facility</h2>

        <form onSubmit={handleUpdate} className="space-y-3">
          <div className="flex flex-col gap1">
            <Label>Name</Label>
            <Input
              label="Name"
              className="rounded-2xl"
              value={facility.facilityName}
              onChange={(e) =>
                setFacility({ ...facility, facilityName: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label>Location</Label>
            <Input
              label="Location"
              className="rounded-2xl"
              value={facility.location}
              onChange={(e) =>
                setFacility({ ...facility, location: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Price</Label>
            <Input
              label="Price"
              type="number"
              className="rounded-2xl"
              value={facility.price}
              onChange={(e) =>
                setFacility({ ...facility, price: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="bordered"
              onPress={() => setIsOpen(false)}
            >
              Cancel
            </Button>

            <Button color="primary" type="submit">
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;