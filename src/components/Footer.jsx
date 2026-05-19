import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa6";
import { ImInstagram } from "react-icons/im";
import { GrGithub } from "react-icons/gr";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-gray-300 bg-white text-gray-500">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-2 lg:grid-cols-4">
        
        {/* Logo & About */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <div className="flex  items-center justify-center ">
               <Image
                              src={"/image.png"}
                              alt="logo"
                              loading="eager"
                              width={60}
                              height={80}
                              className="object-cover h-auto w-auto  "
                            />
            </div>

            <h1 className="text-2xl font-bold text-black">
              Sport<span className="text-[#00FF9D]">Nest</span>
            </h1>
          </div>

          <p className="text-sm leading-6 text-gray-600">
            SportNest helps users book sports facilities easily and manage
            sports venues with a modern experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-black">
            Quick Links
          </h2>

          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/" className="hover:text-[#00FF9D]">
                Home
              </Link>
            </li>

            <li>
              <Link href="/facilities" className="hover:text-[#00FF9D]">
                All Facilities
              </Link>
            </li>

            <li>
              <Link href="/bookings" className="hover:text-[#00FF9D]">
                My Bookings
              </Link>
            </li>

            <li>
              <Link href="/add-facility" className="hover:text-[#00FF9D]">
                Add Facility
              </Link>
            </li>
          </ul>
        </div>

     
        <div>
          <h2 className="mb-4 text-lg font-semibold text-black">
            Contact
          </h2>

          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-[#00FF9D]" />
              <p>Dhaka, Bangladesh</p>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} className="text-[#00FF9D]" />
              <p>+880 01992-330874</p>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={18} className="text-[#00FF9D]" />
              <p>nahidhasan1005004@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Social */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-black">
            Follow Us
          </h2>

          <div className="flex gap-4">
            <Link
              href="https://www.facebook.com/profile.php?id=61565755898282"
              className="rounded-full bg-gray-200 p-3 transition hover:bg-[#00FF9D] hover:text-black"
            >
              <FaFacebook></FaFacebook>
            </Link>

            <Link
              href="https://www.linkedin.com/in/nahid-hasan-a84589394/"
              className="rounded-full bg-gray-200 p-3 transition hover:bg-[#00FF9D] hover:text-black"
            >
               <FaLinkedinIn></FaLinkedinIn>
            </Link>

            <Link
              href="https://github.com/nahidhasan330874"
              className="rounded-full bg-gray-200 p-3 transition hover:bg-[#00FF9D] hover:text-black"
            >
             <GrGithub></GrGithub>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 py-5 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} SportNest. All Rights Reserved.
      </div>
    </footer>
  );
}