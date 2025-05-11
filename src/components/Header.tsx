import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";

export default function Header() {
  return (
    <header className="relative py-3 px-5 w-full h-28 flex items-center justify-between bg-[#75fdfd] md:bg-[#004c6b]">
      <img
        src="/Logo/Logo.svg"
        alt="Example Image"
        className="hidden md:inline absolute top-6 left-7 h-16 w-auto"
      />

      <nav className="hidden md:flex max-w-2xl m-auto gap-12 text-white">
        <Link className="text-xl font-bold hover:underline" href="/">
          HOME
        </Link>
        <Link className="text-xl font-bold hover:underline" href="/game-info">
          GAME INFO
        </Link>
        <Link className="text-xl font-bold hover:underline" href="/about">
          ABOUT
        </Link>
      </nav>
      <nav className="flex w-full items-center justify-between md:hidden bg-[#7df9ff]">
        <FaRegUserCircle size={32} color="black" />
        <IoSettingsOutline size={32} color="black" />
      </nav>
    </header>
  );
}
