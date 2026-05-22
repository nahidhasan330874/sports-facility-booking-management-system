"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Avatar, Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Facilities", path: "/facilities" },
    { name: "My Bookings", path: "/bookings" },
    { name: "Add Facility", path: "/add-facility" },
    { name: "Manage My Facilities", path: "/manage-facilities" },
  ];

  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user);

  const handleSignOut = async () => {
    await authClient.signOut();
  };
  return (
    <nav className="sticky top-0 z-50  bg-white backdrop-blur-md shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-1">
          <div className="flex items-center justify-center">
            <Image
              src={"/logo.png"}
              alt="logo"
              loading="eager"
              width={40}
              height={40}
              className="object-cover h-auto w-auto  "
            />
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Sport<span className="text-[#00FF9D]">Nest</span>
            </h1>
          </div>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.path}
                className="text-sm font-medium text-gray-700 transition hover:text-[#00FF9D]"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {user ? (
          <>
            <div className="hidden items-center gap-3 lg:flex">
              <div className="flex gap-2 items-center">
                <p className="">{user?.name}</p>
                <Avatar size="sm">
                  <Avatar.Image
                    alt="John Doe"
                    src={user?.image}
                    referrerPolicy="no-referrer"
                  />
                  <Avatar.Fallback>{user?.name.charAt(0)}</Avatar.Fallback>
                </Avatar>
              </div>
              <Button
                onClick={handleSignOut}
                variant="danger-soft"
                className="rounded-xl font-bold"
              >
                Logout
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="hidden items-center gap-3 lg:flex">
              <div className="flex gap-2 items-center">
                <p className="">{user?.name}</p>
                <Avatar size="sm">
                  <Avatar.Image
                    alt="John Doe"
                    src={user?.image}
                    referrerPolicy="no-referrer"
                  />
                  <Avatar.Fallback>{user?.name.charAt(0)}</Avatar.Fallback>
                </Avatar>
              </div>

              <Link
                href="/signin"
                className="rounded-xl border border-[#00FF9D] px-5 py-2 text-sm font-semibold text-[#00FF9D] transition hover:bg-[#00FF9D] hover:text-black"
              >
                Log In
              </Link>
            </div>
          </>
        )}

        <button
          onClick={() => setOpen(!open)}
          className="text-gray-700 lg:hidden"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-gray-800 bg-[#111827] lg:hidden">
          <ul className="flex flex-col gap-5 px-6 py-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.path}
                  onClick={() => setOpen(false)}
                  className="block text-gray-300 transition hover:text-[#00FF9D]"
                >
                  {link.name}
                </Link>
              </li>
            ))}

            <div className="flex flex-col gap-3 pt-4">
              <Link
                href="/signin"
                className="rounded-xl border border-[#00FF9D] px-5 py-2 text-center font-semibold text-[#00FF9D]"
              >
                Log In
              </Link>
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
}
