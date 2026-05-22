 "use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function BookNowButton({ id }) {
  const router = useRouter();
  
  const handleClick = async () => {
    const session = await authClient.getSession();
    console.log(session);
    try {

      if (!session?.data.user) {
        router.push("/signin");
      } else {
        router.push(`/facility/${id}`);
      }
    } catch (error) {
      router.push("/signin");
    }
  };

  return (
    <Button
      onClick={handleClick}
      radius="full"
      className="bg-[#00FF9D] hover:bg-[#00e68a] text-black font-semibold px-6 py-2 shadow-lg"
    >
      Book Now
    </Button>
  );
}