"use client"
import {
  Button,
  FieldError,
  Input,
  Label,
  ListBox,
  TextArea,
  TextField,
  Select,
} from "@heroui/react";
import { object } from "framer-motion/client";
import React from "react";

const AddFacility = () => {
   const onSubmit = async(e) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const facility = Object.fromEntries(formData.entries());
  
  const res = await fetch("http://localhost:5000/add-facility", {
    method: 'POST',
    headers:{
        'content-type' :'application/json',

    },
    body: JSON.stringify(facility)
 })

 const data = await res.json()
  
 
};
  return (
    <div className="mx-auto container bg-base-300 shadow-2xl mb-16 rounded-2xl">
      <form
      onSubmit={onSubmit}
      className="p-10 space-y-8">

        <h2 className="flex justify-center items-center text-2xl font-bold">
          Add a Facility
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <TextField name="facilityName" isRequired>
              <Label>Facility Name</Label>
              <Input placeholder="Name" className="rounded-2xl" />
              <FieldError />
            </TextField>
          </div>

          <div>
            <TextField name="facilityType" isRequired>
              <Label>Facility Type</Label>
              <Input placeholder="Type" className="rounded-2xl" />
              <FieldError />
            </TextField>
          </div>

          <TextField name="location" isRequired>
            <Label>Location</Label>
            <Input placeholder="Location" className="rounded-2xl" />
            <FieldError />
          </TextField>  

          <TextField name="price" type="number" isRequired>
            <Label>Price Per Hour (USD $)</Label>
            <Input type="number" placeholder="999$" className="rounded-2xl focus:border-green-600" />
            <FieldError />
          </TextField>

      
          <TextField name="availableTime" isRequired>
            <Label>Available Time Slots</Label>
            <Input placeholder="8:00 PM - 9:00 AM" className="rounded-2xl" />
            <FieldError />
          </TextField>

            <TextField name="capacity" type="number" isRequired>
            <Label>Capacity</Label>
            <Input type="number" placeholder="99" className="rounded-2xl" />
            <FieldError />
          </TextField>

         
          <div className="md:col-span-2">
            <TextField name="imageUrl" isRequired>
              <Label>Image URL</Label>
              <Input
                type="url"
                placeholder="https://example.com/bali-paradise.jpg"
                className="rounded-2xl"
              />
              <FieldError />
            </TextField>
          </div>
          <div className="md:col-span-2">
            <TextField name="description" isRequired>
              <Label>Description</Label>
              <TextArea
                placeholder="Describe the travel experience..."
                className="rounded-3xl"
              />
              <FieldError />
            </TextField>
          </div>
        </div>

        <Button
          type="submit"
          variant="outline"
          className=" rounded bg-green-500 text-white"
        >
          Add Facility
        </Button>
      </form>
    </div>
  );
};

export default AddFacility;
