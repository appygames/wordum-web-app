import Link from "next/link";
import "../styles/header.css";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";

export default function Header() {
  return (
    <header className="header">
      <img src="/Logo/Logo.svg" alt="Example Image" className="logo" />

      <nav className="nav">
        <Link className="nav-link" href="/">
          HOME
        </Link>
        <Link className="nav-link" href="/game-info">
          GAME INFO
        </Link>
        <Link className="nav-link" href="/about">
          ABOUT
        </Link>
      </nav>
      <nav className="mobile-nav">
        <FaRegUserCircle size={32} color="black" />
        <div>
          <IoSettingsOutline size={32} color="black" />
        </div>
      </nav>
    </header>
  );
}
