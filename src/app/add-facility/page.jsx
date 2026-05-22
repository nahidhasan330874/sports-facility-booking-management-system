 "use client";

import React, { useEffect } from "react";
import {
  Button,
  FieldError,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AddFacility = () => {
  const router = useRouter();

  // 🔥 CHECK SESSION ON LOAD
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/session", {
          credentials: "include",
        });

        const session = await res.json();

        if (!session?.user) {
          toast.error("Please sign in first");
          router.push("/signin");
        }
      } catch (error) {
        console.error(error);
        toast.error("Session check failed");
        router.push("/signin");
      }
    };

    checkSession();
  }, [router]);

  // 🔥 SUBMIT HANDLER
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const facility = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("http://localhost:5000/add-facility", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(facility),
        credentials: "include",
      });

      const data = await res.json();

      if (res.status === 401) {
        toast.error("Session expired. Please login again.");
        router.push("/signin");
        return;
      }

      if (!res.ok) {
        toast.error(data?.message || "Failed to add facility");
        return;
      }

      toast.success("Facility added successfully!");
      e.target.reset();
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    }
  };

  return (
    <div className="mx-auto container bg-base-300 shadow-2xl mb-16 rounded-2xl">
      <form onSubmit={onSubmit} className="p-10 space-y-8">
        <h2 className="text-2xl font-bold text-center">
          Add a Facility
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TextField name="facilityName" isRequired>
            <Label>Facility Name</Label>
            <Input placeholder="Name" />
          </TextField>

          <TextField name="facilityType" isRequired>
            <Label>Facility Type</Label>
            <Input placeholder="Type" />
          </TextField>

          <TextField name="location" isRequired>
            <Label>Location</Label>
            <Input placeholder="Location" />
          </TextField>

          <TextField name="price" type="number" isRequired>
            <Label>Price Per Hour</Label>
            <Input type="number" placeholder="999" />
          </TextField>

          <TextField name="availableTime" isRequired>
            <Label>Available Time</Label>
            <Input placeholder="8:00 PM - 9:00 AM" />
          </TextField>

          <TextField name="capacity" type="number" isRequired>
            <Label>Capacity</Label>
            <Input type="number" placeholder="99" />
          </TextField>

          <div className="md:col-span-2">
            <TextField name="imageUrl" isRequired>
              <Label>Image URL</Label>
              <Input type="url" placeholder="https://..." />
            </TextField>
          </div>

          <div className="md:col-span-2">
            <TextField name="description" isRequired>
              <Label>Description</Label>
              <TextArea placeholder="Describe..." />
            </TextField>
          </div>
        </div>

        <Button type="submit" className="bg-green-500 text-white w-full">
          Add Facility
        </Button>
      </form>
    </div>
  );
};

export default AddFacility;
