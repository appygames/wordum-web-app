"use client";
import Link from "next/link";
import "../styles/home.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="main-content">
      <Header />
      <div className="home">
        <div className="menu-buttons">
          <Link href="/game">
            <button>PLAY GAME</button>
          </Link>
          <Link href="/game/create">
            <button>CREATE</button>
          </Link>
          <Link href="/game/join">
            <button>ENTER CODE</button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
