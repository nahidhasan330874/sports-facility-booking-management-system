"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, LayoutDashboard, Settings, LogOut } from "lucide-react";
import Image from "next/image";
import { Avatar, Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { CgAdd } from "react-icons/cg";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);
  const pathname = usePathname();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const isActive = (path) => pathname === path;

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  // PUBLIC LINKS (everyone)
  const publicLinks = [
    { name: "Home", path: "/" },
    { name: "All Facilities", path: "/facilities" },
  ];

  // PRIVATE LINKS (only logged in users)
  const privateLinks = [
    { name: "My Bookings", path: "/bookings" },
    { name: "Add Facility", path: "/add-facility" },
    { name: "Manage My Facilities", path: "/manage-facilities" },
  ];

  const navLinks = user ? [...publicLinks, ...privateLinks] : publicLinks;

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          <h1 className="text-xl font-bold">
            Sport<span className="text-[#00FF9D]">Nest</span>
          </h1>
        </Link>

        {/* DESKTOP NAV */}
        <ul className="hidden lg:flex gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.path}
                className={`font-medium transition ${
                  isActive(link.path)
                    ? "text-[#00FF9D] font-bold"
                    : "text-gray-700 hover:text-[#00FF9D]"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* USER */}
        <div className="hidden lg:flex items-center">
          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 rounded-full px-3 py-2 hover:bg-gray-100"
              >
                <Avatar size="sm">
                  <Avatar.Image
                    alt="user"
                    src={user?.image}
                    referrerPolicy="no-referrer"
                  />
                  <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
                </Avatar>

                <div className="text-left">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-500">Student</p>
                </div>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-[280px] overflow-hidden rounded-3xl border bg-white shadow-2xl">
                  <div className="border-b p-6">
                    <h3 className="text-2xl font-bold">Welcome back!</h3>
                    <p className="text-gray-500">{user.email}</p>
                  </div>

                  <div className="p-3">
                    <Link
                      href="/bookings"
                      className="flex items-center gap-3 rounded-xl p-3 hover:bg-gray-100"
                    >
                      <LayoutDashboard size={20} />
                      My Booking
                    </Link>

                    <Link
                      href="/add-facility"
                      className="flex items-center gap-3 rounded-xl p-3 hover:bg-gray-100"
                    >
                      <CgAdd size={20} />
                      Add Facility
                    </Link>

                    <Link
                      href="/manage-facilities"
                      className="flex items-center gap-3 rounded-xl p-3 hover:bg-gray-100"
                    >
                      <Settings size={20} />
                      Manage My Facilities
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-3 rounded-xl p-3 text-red-500 hover:bg-red-50"
                    >
                      <LogOut size={20} />
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/signin">
              <Button className="bg-[#00FF9D] text-black">Log In</Button>
            </Link>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button onClick={() => setOpen(!open)} className="lg:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="border-t bg-white lg:hidden">
          {/* USER INFO */}
          <div className="px-6 py-5 border-b">
            {user ? (
              <div className="flex items-center gap-3">
                <Avatar size="md" src={user?.image} />
                <div>
                  <h3 className="font-semibold">{user?.name}</h3>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  href="/signin"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-xl border border-[#00FF9D] py-2 text-center font-semibold text-[#00FF9D]"
                >
                  Log In
                </Link>

                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-xl bg-[#00FF9D] py-2 text-center font-semibold text-black"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* LINKS */}
          <div className="flex flex-col px-6 py-5 gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setOpen(false)}
                className={`font-medium transition ${
                  isActive(link.path)
                    ? "text-[#00FF9D] font-bold"
                    : "text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {user && (
              <button
                onClick={async () => {
                  await handleSignOut();
                  setOpen(false);
                }}
                className="rounded-xl bg-red-50 py-3 font-semibold text-red-500"
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}