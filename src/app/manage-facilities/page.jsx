import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ManageFacilityList from "@/components/ManageFacilityList";

const ManageFacility = async () => {
  const res = await fetch("http://localhost:5000/add-facility", {
    cache: "no-store",
  });

  const session = await auth.api.getSession({
    headers: new Headers(await headers()),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Manage Facilities</h1>

      <ManageFacilityList facilities={facilities} />
    </div>
  );
};

export default ManageFacility;
